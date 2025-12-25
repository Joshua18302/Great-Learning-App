import React, { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import ActivityCard from "../components/Activity/ActivityCard";
import CompactFilterBar from "../components/Filter/FilterBar";
import FilterModal from "../components/Filter/FilterModal";
import { darkColors, lightColors } from "../constants/colors";
import { MOCK_ACTIVITIES } from "../constants/mockData";
import { Activity, Filters } from "../constants/types";

export default function Index() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? darkColors : lightColors;

  const [filters, setFilters] = useState<Filters>({
    //keeps track of the 3 filters
    type: "all",
    status: "all",
    course: "all",
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const activeFilterCount = useMemo(() => {
    //keeps track of filter count, updates when the filters change
    let count = 0;
    if (filters.type !== "all") count++;
    if (filters.status !== "all") count++;
    if (filters.course !== "all") count++;
    return count;
  }, [filters]);

  const filteredActivities = useMemo(() => {
    // keeps sorted filtered activities
    let filtered = MOCK_ACTIVITIES.filter((activity) => {
      if (filters.type !== "all" && activity.type !== filters.type)
        return false;
      if (filters.status !== "all" && activity.status !== filters.status)
        return false;
      if (filters.course !== "all" && activity.course !== filters.course)
        return false;
      return true;
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.startTime || a.dueDate || 0);
      const dateB = new Date(b.startTime || b.dueDate || 0);
      return dateA.getTime() - dateB.getTime();
    });

    return filtered;
  }, [filters]);

  const handleActivityPress = (activity: Activity) => {
    //shows an alert when the activity is pressed
    console.log("Activity pressed:", activity.title);
    const action =
      activity.status === "completed"
        ? "Reviewing"
        : activity.status === "in_progress"
        ? "Continuing"
        : "Starting";
    alert(`${action}: ${activity.title}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Great Learning
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {filteredActivities.length}{" "}
          {filteredActivities.length === 1 ? "activity" : "activities"}
        </Text>
      </View>

      <CompactFilterBar
        filters={filters}
        activeCount={activeFilterCount}
        onOpenFilters={() => setShowFilterModal(true)}
        colors={colors}
      />

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onApply={setFilters}
        colors={colors}
      />

      {/* Activities are mapped and displayed in a scroll view */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredActivities.length === 0 ? (
          <View style={styles.emptyState}>
            <Text
              style={[styles.emptyStateText, { color: colors.textSecondary }]}
            >
              No activities found with current filters
            </Text>
          </View>
        ) : (
          filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onPress={handleActivityPress}
              colors={colors}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
  },
});
