import * as LucideIcons from "lucide-react-native";
import type { StyleProp, ViewStyle } from "react-native";

export type IconName = keyof typeof LucideIcons;

export type CustomIconProps = {
  name: IconName;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  strokeWidth?: number;
};