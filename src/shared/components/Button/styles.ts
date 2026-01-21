import { StyleSheet } from "react-native";

export const getStyles = (colors: any) =>
  StyleSheet.create({
    buttonBase: {
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
      minHeight: 48,
    },
    primary: {
      backgroundColor: colors.primary ?? "#2563EB",
      borderRadius:9999,
    },
    secondary: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.primary ?? "#2563EB",
    },
    disabled: {
      opacity: 0.5,
    },
    innerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    contentWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
    },
    textPrimary: {
      color: "#FFFFFF",
    },
    textSecondary: {
      color: colors.primary ?? "#2563EB",
    },
    leftEdgeIcon: {
      position: "absolute",
      left: 16,
    },
    rightEdgeIcon: {
      position: "absolute",
      right: 16,
    },
    leftInlineIcon: {
      marginRight: 8,
    },
    rightInlineIcon: {
      marginLeft: 8,
    },
  });
