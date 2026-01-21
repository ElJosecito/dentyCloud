import type { StyleProp, TextStyle } from "react-native";

export type TextType = 
  | "h1" 
  | "h2" 
  | "h3" 
  | "h4" 
  | "h5" 
  | "h6" 
  | "body" 
  | "body2" 
  | "caption1" 
  | "caption2" 
  | "small";

export type TextAlign = "left" | "center" | "right" | "justify";

export type EllipsizeMode = "head" | "middle" | "tail" | "clip";

export type MyTextProps = {
  type?: TextType;
  bold?: boolean;
  semiBold?: boolean;
  light?: boolean;
  italic?: boolean;
  color?: string;
  align?: TextAlign;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: EllipsizeMode;
};
