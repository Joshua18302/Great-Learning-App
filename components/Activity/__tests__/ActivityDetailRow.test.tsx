import { Ionicons } from "@expo/vector-icons";
import { render } from "@testing-library/react-native";
import React from "react";
import ActivityDetailRow from "../ActivityDetailRow";

jest.mock("@react-native-vector-icons/ionicons", () => ({
  Icon: "Icon",
}));

describe("ActivityDetailRow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the provided text", () => {
    const { getByText } = render(
      <ActivityDetailRow
        icon="calendar-number-outline"
        text="Starts tomorrow"
      />
    );

    expect(getByText("Starts tomorrow")).toBeTruthy();
  });

  it("passes the correct icon name to Ionicons", () => {
    render(
      <ActivityDetailRow icon="calendar-number-outline" text="Test text" />
    );

    expect(Ionicons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "calendar-number-outline",
        size: 18,
      }),
      {}
    );
  });

  it("uses light theme color when color scheme is light", () => {
    render(
      <ActivityDetailRow icon="calendar-number-outline" text="Light mode" />
    );

    expect(Ionicons).toHaveBeenCalledWith(
      expect.objectContaining({
        color: "#666666",
      }),
      {}
    );
  });

  it("uses dark theme color when color scheme is dark", () => {
    render(
      <ActivityDetailRow icon="calendar-number-outline" text="Dark mode" />
    );

    expect(Ionicons).toHaveBeenCalledWith(
      expect.objectContaining({
        color: "#A0A0A0",
      }),
      {}
    );
  });
});
