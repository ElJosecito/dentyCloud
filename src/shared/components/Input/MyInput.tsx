import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import MyText from "../Text/MyText";
import type { MyInputProps } from "./types";
import { getStyles } from "./styles";

const MyInput: React.FC<MyInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  LeftIcon,
  RightIcon,
  iconPosition = "inline",
  onRightIconPress,
  secureTextEntry = false,
  error = false,
  errorMessage = "",
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = "default",
  variant = "primary",
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  iconStyle,
}) => {
  const styles = getStyles();

  return (
    <View style={[styles.inputContainer, style]}>
      {label && (
        <MyText
          type='caption1'
          style={[
            styles.label,
            variant === "secondary" && styles.secondaryLabel,
            labelStyle,
          ]}
        >
          {label}
        </MyText>
      )}

      <View
        style={[
          styles.inputWrapper,
          variant === "primary"
            ? styles.primaryVariant
            : styles.secondaryVariant,
          error && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
      >
        {/* Icono izquierdo en posición edge */}
        {LeftIcon && iconPosition === "edge" && (
          <View style={[styles.leftEdgeIcon, iconStyle]}>{LeftIcon}</View>
        )}

        <View style={styles.contentWrapper}>
          {/* Icono izquierdo en posición inline */}
          {LeftIcon && iconPosition === "inline" && (
            <View style={[styles.leftInlineIcon, iconStyle]}>{LeftIcon}</View>
          )}

          <TextInput
            style={[
              styles.input,
              variant === "secondary" && styles.secondaryInput,
              multiline && styles.multilineInput,
              inputStyle,
            ]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            editable={!disabled}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholderTextColor={styles.placeholder.color}
            keyboardType={keyboardType}
          />

          {/* Icono derecho en posición inline */}
          {RightIcon && iconPosition === "inline" && (
            <TouchableOpacity
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
              style={[styles.rightInlineIcon, iconStyle]}
            >
              {RightIcon}
            </TouchableOpacity>
          )}
        </View>

        {/* Icono derecho en posición edge */}
        {RightIcon && iconPosition === "edge" && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={[styles.rightEdgeIcon, iconStyle]}
          >
            {RightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && errorMessage && (
        <MyText type='caption2' style={[styles.errorText, errorStyle]}>
          {errorMessage}
        </MyText>
      )}
    </View>
  );
};

export default MyInput;
