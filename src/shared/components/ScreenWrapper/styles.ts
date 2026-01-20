import { StyleSheet } from "react-native";

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    topSafeArea: {
      backgroundColor: colors.background,
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 16,
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    horizontalPadding: {
      paddingHorizontal: 16,
    },
    keyboardAvoiding: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

export { getStyles };