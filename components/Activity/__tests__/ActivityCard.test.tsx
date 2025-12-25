import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { lightColors } from "../../../constants/colors";
import { Activity } from "../../../constants/types";
import ActivityCard from "../ActivityCard";

const mockOnPress = jest.fn();

const mockOnlineClass: Activity = {
  id: "1",
  type: "online_class",
  title: "Introduction to Neural Networks",
  course: "Machine Learning",
  instructor: "Dr. Sarah Chen",
  startTime: "2025-12-24T10:00:00",
  duration: "90 min",
  status: "upcoming",
};

const mockAssignment: Activity = {
  id: "2",
  type: "assignment",
  title: "Build a CNN Classifier",
  course: "Machine Learning",
  dueDate: "2025-12-26T23:59:00",
  points: 100,
  submissionStatus: "not_started",
  status: "upcoming",
};

const mockCompletedActivity: Activity = {
  ...mockOnlineClass,
  status: "completed",
};

describe("ActivityCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-12-24T12:00:00"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders online class correctly", () => {
    const { getByText } = render(
      <ActivityCard
        activity={mockOnlineClass}
        onPress={mockOnPress}
        colors={lightColors}
      />
    );

    expect(getByText("ONLINE CLASS")).toBeTruthy();
    expect(getByText("Introduction to Neural Networks")).toBeTruthy();
    expect(getByText("Machine Learning")).toBeTruthy();
    expect(getByText(/Dr. Sarah Chen/)).toBeTruthy();
    expect(getByText(/90 min/)).toBeTruthy();
  });

  it("renders assignment correctly", () => {
    const { getByText } = render(
      <ActivityCard
        activity={mockAssignment}
        onPress={mockOnPress}
        colors={lightColors}
      />
    );

    expect(getByText("ASSIGNMENT")).toBeTruthy();
    expect(getByText("Build a CNN Classifier")).toBeTruthy();
    expect(getByText(/100 points/)).toBeTruthy();
    expect(getByText(/Status: not started/)).toBeTruthy();
  });

  it('shows "Start" button for upcoming activities', () => {
    const { getByText } = render(
      <ActivityCard
        activity={mockOnlineClass}
        onPress={mockOnPress}
        colors={lightColors}
      />
    );

    expect(getByText("Start")).toBeTruthy();
  });

  it('shows "Continue" button for in-progress activities', () => {
    const inProgressActivity = {
      ...mockOnlineClass,
      status: "in_progress" as const,
    };
    const { getByText } = render(
      <ActivityCard
        activity={inProgressActivity}
        onPress={mockOnPress}
        colors={lightColors}
      />
    );

    expect(getByText("Continue")).toBeTruthy();
  });

  it('shows "Review" button for completed activities', () => {
    const { getByText } = render(
      <ActivityCard
        activity={mockCompletedActivity}
        onPress={mockOnPress}
        colors={lightColors}
      />
    );

    expect(getByText("Review")).toBeTruthy();
  });

  it("calls onPress when action button is pressed", () => {
    const { getByText } = render(
      <ActivityCard
        activity={mockOnlineClass}
        onPress={mockOnPress}
        colors={lightColors}
      />
    );

    const startButton = getByText("Start");
    fireEvent.press(startButton);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(mockOnlineClass);
  });

  it("renders quiz with duration", () => {
    const quiz: Activity = {
      id: "3",
      type: "quiz",
      title: "AWS Overview",
      course: "Cloud Computing",
      dueDate: "2025-12-25T18:00:00",
      points: 50,
      duration: "30 min",
      submissionStatus: "not_started",
      status: "upcoming",
    };

    const { getByText } = render(
      <ActivityCard
        activity={quiz}
        onPress={mockOnPress}
        colors={lightColors}
      />
    );

    expect(getByText("QUIZ")).toBeTruthy();
    expect(getByText(/30 min/)).toBeTruthy();
  });

  it("renders discussion with post count", () => {
    const discussion: Activity = {
      id: "4",
      type: "discussion",
      title: "Ethics in AI",
      course: "AI Fundamentals",
      dueDate: "2025-12-27T23:59:00",
      posts: 12,
      requiredPosts: 2,
      submissionStatus: "in_progress",
      status: "in_progress",
    };

    const { getByText } = render(
      <ActivityCard
        activity={discussion}
        onPress={mockOnPress}
        colors={lightColors}
      />
    );

    expect(getByText("DISCUSSION")).toBeTruthy();
  });
});
