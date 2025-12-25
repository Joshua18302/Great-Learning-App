import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import Index from "../index";

// Mock useColorScheme
jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  default: jest.fn(() => "light"),
}));

describe("Index Screen", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-12-25T12:00:00"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders header correctly", () => {
    const { getByText } = render(<Index />);

    expect(getByText("My Activities")).toBeTruthy();
    expect(getByText("6 activities")).toBeTruthy();
  });

  it("renders all activities initially", () => {
    const { getByText } = render(<Index />);

    expect(getByText("Introduction to Neural Networks")).toBeTruthy();
    expect(getByText("Build a CNN Image Classifier")).toBeTruthy();
    expect(getByText("AWS Services Overview")).toBeTruthy();
    expect(getByText("Ethics in AI Development")).toBeTruthy();
  });

  it("opens filter modal when filter bar is pressed", async () => {
    const { getByText } = render(<Index />);
    const filterBar = getByText("Filters").parent?.parent;
    if (filterBar) fireEvent.press(filterBar);

    await waitFor(() => {
      expect(getByText("Activity Type")).toBeTruthy();
    });
  });

  it("filters activities by type", async () => {
    const { getByText, queryByText } = render(<Index />);

    const filterBar = getByText("Filters").parent?.parent;
    if (filterBar) fireEvent.press(filterBar);

    await waitFor(() => {
      expect(getByText("Activity Type")).toBeTruthy();
    });

    fireEvent.press(getByText("Assignments"));
    fireEvent.press(getByText("Apply Filters"));

    await waitFor(() => {
      expect(getByText("Build a CNN Image Classifier")).toBeTruthy();
      expect(queryByText("Introduction to Neural Networks")).toBeNull();
    });
  });

  it("shows activity count after filtering", async () => {
    const { getByText } = render(<Index />);
    const filterBar = getByText("Filters").parent?.parent;
    if (filterBar) fireEvent.press(filterBar);

    await waitFor(() => {
      expect(getByText("Activity Type")).toBeTruthy();
    });

    fireEvent.press(getByText("Completed"));
    fireEvent.press(getByText("Apply Filters"));

    await waitFor(() => {
      expect(getByText("1 activity")).toBeTruthy();
    });
  });

  it("shows empty state when no activities match filters", async () => {
    const { getByText } = render(<Index />);

    const filterBar = getByText("Filters").parent?.parent;
    if (filterBar) {
      fireEvent.press(filterBar);
    }

    await waitFor(() => {
      expect(getByText("Activity Type")).toBeTruthy();
    });

    fireEvent.press(getByText("Quizzes"));
    fireEvent.press(getByText("Completed"));
    fireEvent.press(getByText("Apply Filters"));

    await waitFor(() => {
      expect(
        getByText("No activities found with current filters")
      ).toBeTruthy();
    });
  });

  it("shows alert when activity is pressed", () => {
    const alertSpy = jest.spyOn(global, "alert").mockImplementation();
    const { getByText } = render(<Index />);
    const startButtons = getByText("Start");

    fireEvent.press(startButtons);
    expect(alertSpy).toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it("updates active filter count badge", async () => {
    const { getByText, queryByText } = render(<Index />);
    expect(queryByText("1")).toBeNull();

    const filterBar = getByText("Filters").parent?.parent;
    if (filterBar) fireEvent.press(filterBar);

    await waitFor(() => {
      expect(getByText("Activity Type")).toBeTruthy();
    });

    fireEvent.press(getByText("Assignments"));
    fireEvent.press(getByText("Apply Filters"));

    await waitFor(() => {
      expect(getByText("1")).toBeTruthy();
    });
  });
});
