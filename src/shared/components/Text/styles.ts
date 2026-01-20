import { StyleSheet } from "react-native";

export const getStyles = (colors: any) =>
  StyleSheet.create({
    base: {
      color: colors.text?.primary ?? "#0F172A",
      fontSize: 16,
      lineHeight: 24,
    },
    // Headings
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: "700",
    },
    h2: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: "700",
    },
    h3: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "600",
    },
    h4: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: "600",
    },
    h5: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: "600",
    },
    h6: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "600",
    },
    // Body
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "400",
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "400",
    },
    // Captions
    caption1: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "500",
    },
    caption2: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "500",
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "400",
    },
    // Font weights
    bold: {
      fontWeight: "700",
    },
    semiBold: {
      fontWeight: "600",
    },
    light: {
      fontWeight: "300",
    },
    italic: {
      fontStyle: "italic",
    },
  });