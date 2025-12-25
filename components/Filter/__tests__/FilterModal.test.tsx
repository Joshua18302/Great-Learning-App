import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { lightColors } from "../../../constants/colors";
import { Filters } from "../../../constants/types";
import FilterModal from "../FilterModal";

jest.mock("@react-native-vector-icons/ionicons", () => ({
  Icon: "Icon",
}));

const mockOnClose = jest.fn();
const mockOnApply = jest.fn();

const defaultFilters: Filters = {
  type: "all",
  status: "all",
  course: "all",
};

describe("FilterModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when visible", () => {
    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        filters={defaultFilters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    expect(getByText("Filters")).toBeTruthy();
    expect(getByText("Activity Type")).toBeTruthy();
    expect(getByText("Status")).toBeTruthy();
    expect(getByText("Course")).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const { queryByText } = render(
      <FilterModal
        visible={false}
        onClose={mockOnClose}
        filters={defaultFilters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    expect(queryByText("Filters")).toBeNull();
  });

  it("shows all type options", () => {
    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        filters={defaultFilters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    expect(getByText("All Types")).toBeTruthy();
    expect(getByText("Online Classes")).toBeTruthy();
    expect(getByText("Assignments")).toBeTruthy();
    expect(getByText("Quizzes")).toBeTruthy();
    expect(getByText("Discussions")).toBeTruthy();
  });

  it("shows all status options", () => {
    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        filters={defaultFilters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    expect(getByText("All Status")).toBeTruthy();
    expect(getByText("Upcoming")).toBeTruthy();
    expect(getByText("In Progress")).toBeTruthy();
    expect(getByText("Completed")).toBeTruthy();
    expect(getByText("Overdue")).toBeTruthy();
  });

  it("shows course options from mock data", () => {
    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        filters={defaultFilters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    expect(getByText("All Courses")).toBeTruthy();
    expect(getByText("Machine Learning")).toBeTruthy();
    expect(getByText("Cloud Computing")).toBeTruthy();
    expect(getByText("AI Fundamentals")).toBeTruthy();
  });

  it("calls onClose when close button is pressed", () => {
    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        filters={defaultFilters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    const closeButton = getByText("✕");
    fireEvent.press(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("applies filters when Apply button is pressed", async () => {
    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        filters={defaultFilters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    // Select a filter
    const assignmentsOption = getByText("Assignments");
    fireEvent.press(assignmentsOption);

    // Apply filters
    const applyButton = getByText("Apply Filters");
    fireEvent.press(applyButton);

    await waitFor(() => {
      expect(mockOnApply).toHaveBeenCalledTimes(1);
      expect(mockOnApply).toHaveBeenCalledWith({
        type: "assignment",
        status: "all",
        course: "all",
      });
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it("resets filters when Reset button is pressed", async () => {
    const activeFilters: Filters = {
      type: "assignment",
      status: "upcoming",
      course: "Machine Learning",
    };

    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        filters={activeFilters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    const resetButton = getByText("Reset");
    fireEvent.press(resetButton);

    // After reset, apply to see the reset filters
    const applyButton = getByText("Apply Filters");
    fireEvent.press(applyButton);

    await waitFor(() => {
      expect(mockOnApply).toHaveBeenCalledWith(defaultFilters);
    });
  });

  it("shows checkmark on selected type option", () => {
    const filters: Filters = {
      type: "quiz",
      status: "all",
      course: "all",
    };

    const { getAllByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        filters={filters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    // Should have at least one checkmark for the selected option
    const checkmarks = getAllByText("✓");
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it("updates filter selection when option is pressed", async () => {
    const { getByText } = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        filters={defaultFilters}
        onApply={mockOnApply}
        colors={lightColors}
      />
    );

    // Select type
    fireEvent.press(getByText("Online Classes"));

    // Select status
    fireEvent.press(getByText("Upcoming"));

    // Select course
    fireEvent.press(getByText("Machine Learning"));

    // Apply
    fireEvent.press(getByText("Apply Filters"));

    await waitFor(() => {
      expect(mockOnApply).toHaveBeenCalledWith({
        type: "online_class",
        status: "upcoming",
        course: "Machine Learning",
      });
    });
  });
});
