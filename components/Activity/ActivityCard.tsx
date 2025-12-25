import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityCardProps } from "../../constants/types";
import { formatDate, formatTime } from "../../utils/dateFormatter";
import ActivityDetailRow from "./ActivityDetailRow";
export default function ActivityCard({
  activity,
  onPress,
  colors,
}: ActivityCardProps) {
  const getTypeLabel = () => {
    switch (activity.type) {
      case "online_class":
        return "Online Class";
      case "assignment":
        return "Assignment";
      case "quiz":
        return "Quiz";
      case "discussion":
        return "Discussion";
      default:
        return activity.type;
    }
  };

  const getStatusColor = () => {
    switch (activity.status) {
      case "upcoming":
        return colors.statusUpcoming;
      case "in_progress":
        return colors.statusInProgress;
      case "completed":
        return colors.statusCompleted;
      case "overdue":
        return colors.statusOverdue;
      default:
        return colors.text;
    }
  };

  const getActionButton = () => {
    if (activity.status === "completed") return "Review";
    if (activity.status === "in_progress") return "Continue";
    return "Start";
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.typeContainer}>
          <Text style={[styles.typeText, { color: colors.primary }]}>
            {getTypeLabel()}
          </Text>
          <View
            style={[styles.statusDot, { backgroundColor: getStatusColor() }]}
          />
        </View>
        <Text style={[styles.courseText, { color: colors.textSecondary }]}>
          {activity.course}
        </Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>
        {activity.title}
      </Text>

      <View style={styles.detailsContainer}>
        {activity.type === "online_class" && (
          <>
            <ActivityDetailRow
              icon="calendar-number"
              text={`${formatDate(activity.startTime!)} at ${formatTime(
                activity.startTime!
              )}`}
            />
            <ActivityDetailRow icon="person" text={activity.instructor!} />
            <ActivityDetailRow icon="timer" text={activity.duration!} />
          </>
        )}

        {(activity.type === "assignment" || activity.type === "quiz") && (
          <>
            <ActivityDetailRow
              icon="calendar-number"
              text={`Due: ${formatDate(activity.dueDate!)}`}
            />
            <ActivityDetailRow icon="star" text={`${activity.points} points`} />
            {activity.duration && (
              <ActivityDetailRow icon="timer" text={activity.duration} />
            )}
            <ActivityDetailRow
              icon="alert-circle"
              text={`${activity.submissionStatus?.replace("_", " ")}`}
            />
          </>
        )}

        {activity.type === "discussion" && (
          <>
            <ActivityDetailRow
              icon="calendar-number"
              text={`Due: ${formatDate(activity.dueDate!)}`}
            />
          </>
        )}
      </View>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: colors.primary }]}
        onPress={() => onPress(activity)}
        activeOpacity={0.7}
      >
        <Text style={styles.actionButtonText}>{getActionButton()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  courseText: {
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    lineHeight: 24,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
