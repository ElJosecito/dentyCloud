import React from "react";
import * as LucideIcons from "lucide-react-native";
import { colors } from "../../constants/index";
import type { CustomIconProps } from "./types";

const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  color = colors.text?.primary ?? '#000',
  size = 24,
  style,
  strokeWidth,
}) => {
  const LucideIcon = (LucideIcons as any)[name] as React.ComponentType<any> | undefined;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react-native.`);
    return null;
  }

  return (
    <LucideIcon
      color={color}
      size={size}
      style={style}
      strokeWidth={strokeWidth}
    />
  );
};

export default CustomIcon;
