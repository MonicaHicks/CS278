import { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import Reactions from "./Reactions";
import theme from "@/assets/theme";

export default function Event({
  item,
  expandable = true,
}: {
  item: {
    id: string;
    hostName: string;
    hostImage?: string;
    eventTitle: string;
    hostFlyer?: string;
    attendees: string[];
    dateTime: Date;
    location: string;
    description?: string;
    reactions?: {
      rsvps: number;
      comments: number;
      likes: number;
      reposts: number;
    };
  };
  expandable?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const formattedDateTime = `${item.dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  })} · ${item.dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;

  return (
    <ThemedView style={theme.eventCard}>
      {/* Host header */}
      <View style={theme.profilePicNameContainer}>
        <Image
          source={
            item.hostImage
              ? { uri: item.hostImage }
              : require("../assets/images/placeholderClub.png")
          }
          style={theme.profilePic}
        />
        <ThemedText style={[theme.typography.subtitle, { marginTop: 12 }]}>
          {item.hostName}
        </ThemedText>
      </View>

      {/* Event Title + Date */}
      <Pressable onPress={() => expandable && setExpanded((e) => !e)}>
        <View style={{ alignItems: "center", gap: 8, marginBottom: 10 }}>
          <ThemedText style={theme.typography.eventTitle}>{item.eventTitle}</ThemedText>
          <ThemedText style={theme.typography.body}>
            {formattedDateTime} · {item.location}
          </ThemedText>
        </View>
        {expandable && (
          <Text style={styles.toggleText}>
            {expanded ? "Hide Details ▲" : "Show Details ▼"}
          </Text>
        )}
      </Pressable>

      {/* Expanded Info */}
      {expanded && (
        <View style={styles.expandedContainer}>
          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
          <Text style={styles.subHeading}>Attendees ({item.attendees.length})</Text>
          {item.attendees.length > 0 ? (
            item.attendees.map((attendee, idx) => (
              <Text key={idx}>• {attendee}</Text>
            ))
          ) : (
            <Text>No RSVPs yet.</Text>
          )}
          <Reactions event={item} />
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  expandedContainer: {
    marginTop: 10,
    gap: 10,
  },
  toggleText: {
    textAlign: "center",
    color: "#007AFF",
    fontWeight: "600",
  },
  subHeading: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    fontStyle: "italic",
    marginBottom: 8,
  },
});
