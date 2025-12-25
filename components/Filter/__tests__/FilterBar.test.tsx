import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { lightColors } from "../../../constants/colors";
import { Filters } from "../../../constants/types";
import FilterBar from "../FilterBar";

const mockOnOpenFilters = jest.fn();

const defaultFilters: Filters = {
  type: "all",
  status: "all",
  course: "all",
};

describe("FilterBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with no active filters", () => {
    const { getByText } = render(
      <FilterBar
        filters={defaultFilters}
        activeCount={0}
        onOpenFilters={mockOnOpenFilters}
        colors={lightColors}
      />
    );

    expect(getByText("Filters")).toBeTruthy();
    expect(getByText("All Activities")).toBeTruthy();
  });

  it("shows active filter count badge", () => {
    const { getByText } = render(
      <FilterBar
        filters={defaultFilters}
        activeCount={3}
        onOpenFilters={mockOnOpenFilters}
        colors={lightColors}
      />
    );

    expect(getByText("3")).toBeTruthy();
  });

  it("does not show badge when no active filters", () => {
    const { queryByText } = render(
      <FilterBar
        filters={defaultFilters}
        activeCount={0}
        onOpenFilters={mockOnOpenFilters}
        colors={lightColors}
      />
    );

    // Badge numbers would be visible if there were active filters
    expect(queryByText("1")).toBeNull();
    expect(queryByText("2")).toBeNull();
  });

  it("displays filter summary correctly with one filter", () => {
    const filters: Filters = {
      type: "assignment",
      status: "all",
      course: "all",
    };

    const { getByText } = render(
      <FilterBar
        filters={filters}
        activeCount={1}
        onOpenFilters={mockOnOpenFilters}
        colors={lightColors}
      />
    );

    expect(getByText("Assignments")).toBeTruthy();
  });

  it("displays filter summary correctly with multiple filters", () => {
    const filters: Filters = {
      type: "online_class",
      status: "upcoming",
      course: "Machine Learning",
    };

    const { getByText } = render(
      <FilterBar
        filters={filters}
        activeCount={3}
        onOpenFilters={mockOnOpenFilters}
        colors={lightColors}
      />
    );

    expect(getByText("Classes • upcoming • Machine Learning")).toBeTruthy();
  });

  it("calls onOpenFilters when pressed", () => {
    const { getByText } = render(
      <FilterBar
        filters={defaultFilters}
        activeCount={0}
        onOpenFilters={mockOnOpenFilters}
        colors={lightColors}
      />
    );

    const filterBar = getByText("Filters").parent?.parent;
    if (filterBar) {
      fireEvent.press(filterBar);
      expect(mockOnOpenFilters).toHaveBeenCalledTimes(1);
    }
  });

  it("formats status filter correctly", () => {
    const filters: Filters = {
      type: "all",
      status: "in_progress",
      course: "all",
    };

    const { getByText } = render(
      <FilterBar
        filters={filters}
        activeCount={1}
        onOpenFilters={mockOnOpenFilters}
        colors={lightColors}
      />
    );

    expect(getByText("in progress")).toBeTruthy();
  });
});
