import React from "react";
import { Text } from "react-native";
import { colors } from "../../constants/index";
import { getStyles } from "./styles";
import type { MyTextProps } from "./types";

const MyText: React.FC<MyTextProps> = ({
  type = "body",
  bold = false,
  semiBold = false,
  light = false,
  italic = false,
  color,
  align = "left",
  style,
  children,
  numberOfLines,
  ellipsizeMode,
}) => {
  const styles = getStyles(colors);

  const textStyles = [
    styles.base,
    styles[type],
    bold && styles.bold,
    semiBold && styles.semiBold,
    light && styles.light,
    italic && styles.italic,
    color && { color },
    { textAlign: align },
    style,
  ];

  return (
    <Text
      style={textStyles}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};

export default MyText;
