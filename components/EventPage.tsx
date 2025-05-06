// components/EventPage.tsx
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import theme from "../assets/theme";
import ParallaxScrollView from "./ParallaxScrollView";
import RSVPButton from "./RSVPButton";
import { ThemedText } from "./ThemedText";
import { Event } from "./types";

export default function EventPage({ item }: { item: Event }) {
  const formattedDate = item.dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const formattedTime = item.dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FDF8F3", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={
            item.hostFlyer
              ? { uri: item.hostFlyer }
              : require("../assets/images/Sample_Flyer.png")
          }
          style={styles.flyer}
        />
      }
    >
      <View style={styles.content}>
        <View style={styles.hostInfo}>
          <Image
            source={
              item.hostImage
                ? { uri: item.hostImage }
                : require("../assets/images/Placeholder_Club.png")
            }
            style={theme.profilePic}
          />
          <ThemedText style={theme.typography.eventTitle}>
            {item.hostName}
          </ThemedText>
        </View>

        <ThemedText style={theme.typography.title}>
          {item.eventTitle}
        </ThemedText>

        <View style={styles.details}>
          <ThemedText style={theme.typography.subtitle}>
            {formattedTime}
          </ThemedText>
          <ThemedText style={theme.typography.subtitle}>
            {formattedDate}
          </ThemedText>
          <ThemedText style={theme.typography.subtitle}>
            Location: {item.location}
          </ThemedText>
        </View>

        <RSVPButton />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  flyer: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
    gap: 16,
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  details: {
    alignItems: "center",
    gap: 6,
  },
});
