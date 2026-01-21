import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { colors } from "../../constants/index";
import { ScreenWrapperProps } from "./types";
import { getStyles } from "./styles";



const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  withSafeArea = false,
  withTopSafeArea = false,
  withBottomSafeArea = true,
  withHorizontalPadding = true,
  withBottomPadding = true,
  scrollable = true,
  keyboardAvoiding = false,
}) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors);

  // Ajustes específicos para Android
  const androidBottomPadding =
    Platform.OS === "android" && withBottomPadding ? 20 : 0;

  // Calculamos los paddings
  const paddingTop = withSafeArea || withTopSafeArea ? insets.top : 0;
  const paddingBottom =
    withSafeArea && withBottomSafeArea
      ? insets.bottom + androidBottomPadding
      : androidBottomPadding;

  const contentStyles = [
    styles.content,
    withHorizontalPadding && styles.horizontalPadding,
    { paddingBottom },
    style,
  ];

  // Contenido base
  const content = <View style={contentStyles}>{children}</View>;

  // Contenido con scroll si está habilitado
  const scrollableContent = scrollable ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      {content}
    </ScrollView>
  ) : (
    content
  );

  // Configuración específica del teclado por plataforma:
  // iOS: behavior="padding" funciona bien con el paddingTop (safe area)
  // Android: behavior="height" funciona mejor con adjustResize + sin offset
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : "height";
  const keyboardOffset = Platform.OS === "ios" ? paddingTop : 0;

  // Contenido con KeyboardAvoidingView si está habilitado
  const keyboardAvoidingContent = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior={keyboardBehavior}
      keyboardVerticalOffset={keyboardOffset}
    >
      {scrollableContent}
    </KeyboardAvoidingView>
  ) : (
    scrollableContent
  );

  return (
    <View style={styles.container}>
      {/* Área superior con color de fondo */}
      {(withSafeArea || withTopSafeArea) && (
        <View style={[styles.topSafeArea, { height: insets.top }]} />
      )}

      {withSafeArea ? (
        <SafeAreaView
          style={styles.safeArea}
          edges={
            [
              ...(withTopSafeArea ? [] : (["top"] as const)),
              ...(withBottomSafeArea ? (["bottom"] as const) : []),
            ] as const
          }
        >
          {keyboardAvoidingContent}
        </SafeAreaView>
      ) : (
        keyboardAvoidingContent
      )}
    </View>
  );
};


export default ScreenWrapper;
