import { formatDate, formatTime } from "../dateFormatter";

describe("dateFormatters", () => {
  beforeEach(() => {
    jest.setSystemTime(new Date("2025-01-01T12:00:00"));
  });

  describe("formatDate", () => {
    it('should return "Today" for current date', () => {
      const today = "2025-01-01T15:00:00";
      expect(formatDate(today)).toBe("Today");
    });

    it('should return "Tomorrow" for next day', () => {
      const tomorrow = "2025-01-02T12:00:00";
      expect(formatDate(tomorrow)).toBe("Tomorrow");
    });

    it('should return "Yesterday" for previous day', () => {
      const yesterday = "2024-12-31T15:00:00";
      expect(formatDate(yesterday)).toBe("Yesterday");
    });

    it('should return "In X days" for dates within 7 days', () => {
      const threeDaysLater = "2025-01-07T15:00:00";
      expect(formatDate(threeDaysLater)).toBe("In 3 days");
    });

    it('should return "X days ago" for past dates', () => {
      const threeDaysAgo = "2024-12-21T15:00:00";
      expect(formatDate(threeDaysAgo)).toBe("3 days ago");
    });

    it("should return formatted date for dates beyond 7 days", () => {
      const futureDate = "2025-01-15T15:00:00";
      expect(formatDate(futureDate)).toBe("Jan 15, 2025");
    });
  });

  describe("formatTime", () => {
    it("should format time correctly in 12-hour format", () => {
      const time = "2025-12-24T09:30:00";
      expect(formatTime(time)).toBe("9:30 AM");
    });
  });
});
