import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../assets/theme";
import { ThemedText } from "./ThemedText";

export default function RSVPButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("success!");
        }}
      >
        <View style={styles.button}>
          <ThemedText style={styles.text}>RSVP</ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
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
