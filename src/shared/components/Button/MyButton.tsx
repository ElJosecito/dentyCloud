import React from "react";
import { TouchableOpacity, View } from "react-native";
import MyText from "../Text/MyText";
import { colors } from "../../constants/index";
import { getStyles } from "./styles";
import type { MyButtonProps } from "./types";

const MyButton: React.FC<MyButtonProps> = ({
  title,
  onPress,
  LeftIcon,
  RightIcon,
  iconPosition = "inline",
  type = "primary",
  disabled = false,
  style,
  textStyle,
}) => {
  const styles = getStyles(colors);
  const isPrimary = type === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonBase,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      <View style={styles.innerContainer}>
        {/* Icono izquierdo */}
        {LeftIcon && iconPosition === "edge" && (
          <View style={styles.leftEdgeIcon}>{LeftIcon}</View>
        )}

        {/* Contenido central (texto + iconos inline) */}
        <View style={styles.contentWrapper}>
          {LeftIcon && iconPosition === "inline" && (
            <View style={styles.leftInlineIcon}>{LeftIcon}</View>
          )}

          <MyText
            type='body'
            bold
            style={[
              styles.buttonText,
              isPrimary ? styles.textPrimary : styles.textSecondary,
              textStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {title}
          </MyText>

          {RightIcon && iconPosition === "inline" && (
            <View style={styles.rightInlineIcon}>{RightIcon}</View>
          )}
        </View>

        {/* Icono derecho */}
        {RightIcon && iconPosition === "edge" && (
          <View style={styles.rightEdgeIcon}>{RightIcon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MyButton;
