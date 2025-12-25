export interface Activity {
  id: string;
  type: "online_class" | "assignment" | "quiz" | "discussion";
  title: string;
  course: string;
  status: "upcoming" | "in_progress" | "completed" | "overdue";
  instructor?: string;
  startTime?: string;
  duration?: string;
  meetingLink?: string;
  dueDate?: string;
  points?: number;
  submissionStatus?: string;
  posts?: number;
  requiredPosts?: number;
}

export interface ActivityCardProps {
  activity: Activity;
  onPress: (activity: Activity) => void;
  colors: ColorScheme;
}

export interface DetailRowTypes {
  icon: string;
  text: string;
}
export interface Filters {
  type: string;
  status: string;
  course: string;
}

export interface ColorScheme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  statusUpcoming: string;
  statusInProgress: string;
  statusCompleted: string;
  statusOverdue: string;
}

export interface FilterBarProps {
  filters: Filters;
  activeCount: number;
  onOpenFilters: () => void;
  colors: ColorScheme;
}

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: Filters;
  onApply: (filters: Filters) => void;
  colors: ColorScheme;
}
