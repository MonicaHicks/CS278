import { mockEvents } from "@/assets/data/mockEvents";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Event from "./Event";

export default function Feed() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {mockEvents.map((item) => (
          <Event item={item} key={item.id} />
        ))}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 32,
  },
});
