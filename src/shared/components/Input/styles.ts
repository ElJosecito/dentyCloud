import { StyleSheet } from "react-native";
import { colors } from "../../constants/index";

export const getStyles = () =>
  StyleSheet.create({
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      marginBottom: 8,
      color: colors.text?.primary ?? "#000",
      fontWeight: "500",
    },
    secondaryLabel: {
      color: colors.text?.secondary ?? "#666",
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 8,
      overflow: "hidden",
    },
    primaryVariant: {
      borderWidth: 1,
      borderColor: colors.border ?? "#E2E8F0",
      backgroundColor: colors.card?.[300] ?? "#fff",
      borderRadius: 100,
    },
    secondaryVariant: {
      borderWidth: 1,
      borderColor: colors.border ?? "#E2E8F0",
      backgroundColor: colors.card ?? "#F1F5F9",
      borderRadius: 12,
    },
    inputError: {
      borderColor: colors.error ?? "#EF4444",
    },
    inputDisabled: {
      opacity: 0.6,
      backgroundColor: colors.gray?.[50] ?? "#F8FAFC",
    },
    contentWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      paddingVertical: 18,
      paddingHorizontal: 18,
      fontSize: 16,
      color: colors.text?.primary ?? "#000",
    },
    secondaryInput: {
      backgroundColor: "transparent",
    },
    multilineInput: {
      paddingVertical: 12,
      textAlignVertical: "top",
    },
    placeholder: {
      color: colors.text?.secondary ?? "#94A3B8",
    },
    leftEdgeIcon: {
      paddingLeft: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    rightEdgeIcon: {
      paddingRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    leftInlineIcon: {
      marginLeft: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    rightInlineIcon: {
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      marginTop: 4,
      color: colors.error ?? "#EF4444",
      fontSize: 12,
    },
  });
