import type { StyleProp, TextStyle, ViewStyle, KeyboardTypeOptions } from "react-native";

export type InputVariant = "primary" | "secondary";
export type IconPosition = "inline" | "edge";

export type MyInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  iconPosition?: IconPosition;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  variant?: InputVariant;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
};
