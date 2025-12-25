import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FilterBarProps } from "../../constants/types";
export default function FilterBar({
  filters,
  activeCount,
  onOpenFilters,
  colors,
}: FilterBarProps) {
  const getSelectedFilters = () => {
    const parts: string[] = [];
    if (filters.type !== "all") {
      parts.push(filters.type.replace("_", " "));
    }
    if (filters.status !== "all") {
      parts.push(filters.status.replace("_", " "));
    }
    if (filters.course !== "all") {
      parts.push(filters.course);
    }

    return parts.length > 0 ? parts.join(" - ") : "All Activities";
  };

  return (
    <TouchableOpacity
      style={[
        styles.FilterBar,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
      ]}
      onPress={onOpenFilters}
      activeOpacity={0.7}
    >
      <View style={styles.filterBarLeft}>
        <Ionicons
          name="filter"
          size={20}
          style={[styles.filterIcon, { color: colors.primary }]}
        />
        <View>
          <Text style={[styles.filterBarTitle, { color: colors.text }]}>
            Filters
          </Text>
          <Text
            style={[styles.filterBarSubtitle, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            {getSelectedFilters()}
          </Text>
        </View>
      </View>
      <View style={styles.filterBarRight}>
        {activeCount > 0 && (
          <View
            style={[styles.filterCount, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.filterCountNumber}>{activeCount}</Text>
          </View>
        )}
        <Text style={[styles.arrow, { color: colors.textSecondary }]}>
          &gt;
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  FilterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  filterBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  filterIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  filterBarTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  filterBarSubtitle: {
    textTransform: "capitalize",
    fontSize: 13,
  },
  filterBarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterCount: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  filterCountNumber: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  arrow: {
    fontSize: 24,
    fontWeight: "300",
  },
});
