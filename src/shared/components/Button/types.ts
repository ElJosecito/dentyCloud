import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export type ButtonType = "primary" | "secondary";
export type IconPosition = "inline" | "edge";

export type MyButtonProps = {
  title: string;
  onPress?: () => void;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  iconPosition?: IconPosition;
  type?: ButtonType;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
