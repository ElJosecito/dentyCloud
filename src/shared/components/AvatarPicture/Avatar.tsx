import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../../constants/index";
import type { AvatarProps } from "./types";

const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  name,
  size = 48,
  backgroundColor,
  borderColor,
}) => {
  if (!imageUrl) {
    const initial = name ? name.charAt(0).toUpperCase() : "?";

    const bgColor = backgroundColor || colors.primary;
    const brdColor = borderColor || colors.gray[300];

    return (
      <View
        style={[
          styles.initialsContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bgColor,
            borderColor: brdColor,
          },
        ]}
      >
        <Text
          style={[
            styles.initialsText,
            {
              fontSize: size / 2,
              color: colors.text.light,
            },
          ]}
        >
          {initial}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUrl }}
      style={[
        styles.image,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: borderColor || colors.border,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  initialsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    borderWidth: 1,
  },
});

export default Avatar;
