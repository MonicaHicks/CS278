import React from "react";
import { StyleSheet, View } from "react-native";
import theme from "../assets/theme";
import { ThemedText } from "./ThemedText";

export default function RSVPButton() {
  return (
    <View>
      <ThemedText style={styles.text}>RSVP</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
