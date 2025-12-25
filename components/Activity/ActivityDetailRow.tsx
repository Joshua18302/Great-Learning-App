import { DetailRowTypes } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

//displays icon and text
export default function ActivityDetailRow({ icon, text }: DetailRowTypes) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const color = isDark ? "#A0A0A0" : "#666666";

  return (
    <View style={styles.detailsContainer}>
      <Ionicons name={icon as any} size={18} color={color} />
      <Text style={[styles.detailText, { color: color }]}>&nbsp; {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  detailText: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
    textTransform: "capitalize",
  },
});
