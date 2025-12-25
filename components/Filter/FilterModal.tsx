import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MOCK_ACTIVITIES } from "../../constants/mockData";
import { FilterModalProps, Filters } from "../../constants/types";

export default function FilterModal({
  visible,
  onClose,
  filters,
  onApply,
  colors,
}: FilterModalProps) {
  const [tempFilters, setTempFilters] = useState(filters);

  const courses = useMemo(() => {
    const uniqueCourses = [...new Set(MOCK_ACTIVITIES.map((a) => a.course))];
    return ["all", ...uniqueCourses];
  }, []);

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "online_class", label: "Online Classes" },
    { value: "assignment", label: "Assignments" },
    { value: "quiz", label: "Quizzes" },
    { value: "discussion", label: "Discussions" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "upcoming", label: "Upcoming" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "overdue", label: "Overdue" },
  ];

  const handleApply = () => {
    onApply(tempFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: Filters = { type: "all", status: "all", course: "all" };
    setTempFilters(resetFilters);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalContent, { backgroundColor: colors.background }]}
        >
          <View
            style={[styles.modalHeader, { borderBottomColor: colors.border }]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Filters
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                style={[{ color: colors.textSecondary }]}
                name="close"
                size={18}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* Type Filter */}
            <View style={styles.filterGroup}>
              <Text style={[styles.filterGroupTitle, { color: colors.text }]}>
                Activity Type
              </Text>
              {typeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                    tempFilters.type === option.value && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    setTempFilters({ ...tempFilters, type: option.value })
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      { color: colors.text },
                      tempFilters.type === option.value && { color: "white" },
                    ]}
                  >
                    {option.label}
                  </Text>
                  {tempFilters.type === option.value && (
                    <Ionicons
                      style={[{ color: "white" }]}
                      name="checkmark"
                      size={18}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Status Filter */}
            <View style={styles.filterGroup}>
              <Text style={[styles.filterGroupTitle, { color: colors.text }]}>
                Status
              </Text>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                    tempFilters.status === option.value && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    setTempFilters({ ...tempFilters, status: option.value })
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      { color: colors.text },
                      tempFilters.status === option.value && {
                        color: "white",
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                  {tempFilters.status === option.value && (
                    <Ionicons
                      style={[{ color: "white" }]}
                      name="checkmark"
                      size={18}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Course Filter */}
            <View style={styles.filterGroup}>
              <Text style={[styles.filterGroupTitle, { color: colors.text }]}>
                Course
              </Text>
              {courses.map((course) => (
                <TouchableOpacity
                  key={course}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                    tempFilters.course === course && {
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => setTempFilters({ ...tempFilters, course })}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      { color: colors.text },
                      tempFilters.course === course && { color: "white" },
                    ]}
                  >
                    {course === "all" ? "All Courses" : course}
                  </Text>
                  {tempFilters.course === course && (
                    <Ionicons
                      style={[{ color: "white" }]}
                      name="checkmark"
                      size={18}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.resetButton, { borderColor: colors.border }]}
              onPress={handleReset}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  closeButton: {
    fontSize: 28,
    fontWeight: "300",
  },
  modalBody: {
    padding: 20,
  },
  filterGroup: {
    marginBottom: 24,
  },
  filterGroupTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  filterOptionText: {
    fontSize: 15,
    fontWeight: "500",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
