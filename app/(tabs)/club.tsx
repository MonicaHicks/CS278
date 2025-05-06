// app/club.tsx
import { useState } from "react";
import { ScrollView, Text, StyleSheet, Pressable } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import MyEventCalendar from "@/components/MyEventCalendar";
import CreateEventForm, { EventFormData } from "@/components/CreateEventForm";
import type { ClubEvent } from "../../types";

export default function ClubPage() {
  const [view, setView] = useState<"my" | "create">("my");

  const [events, setEvents] = useState<ClubEvent[]>([
    {
      id: "1",
      hostName: "Stanford Chess Club",
      eventTitle: "Knight Night Tournament",
      dateTime: new Date("2025-05-10T18:00:00"),
      location: "Tresidder Oak Room",
      attendees: ["alice", "bob"],
      reactions: {
        likes: 14,
        comments: 3,
        rsvps: 6,
        reposts: 1,
      },
    },
    {
      id: "2",
      hostName: "Stanford Chess Club",
      eventTitle: "Coffee Strategy Session",
      dateTime: new Date("2025-05-12T11:00:00"),
      location: "CoHo Patio",
      attendees: ["Bichael Mernstein"],
      reactions: {
        likes: 6,
        comments: 1,
        rsvps: 2,
        reposts: 0,
      },
    },
  ]);

  const handleCreate = (form: EventFormData) => {
    const dateTime = new Date(`${form.date}T${form.time}`);
    const newEvent: ClubEvent = {
      id: Date.now().toString(),
      hostName: "Stanford Chess Club",
      eventTitle: form.eventTitle,
      location: form.location,
      dateTime,
      attendees: [],
      reactions: {
        likes: 0,
        comments: 0,
        rsvps: 0,
        reposts: 0,
      },
    };
    setEvents((prev) => [...prev, newEvent]);
    setView("my");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.tabRow}>
        <Pressable onPress={() => setView("my")} style={view === "my" ? styles.tabActive : styles.tab}>
          <Text>My Events</Text>
        </Pressable>
        <Pressable onPress={() => setView("create")} style={view === "create" ? styles.tabActive : styles.tab}>
          <Text>Create Event</Text>
        </Pressable>
      </ThemedView>

      {view === "my" ? (
        <MyEventCalendar events={events} />
      ) : (
        <CreateEventForm onCreate={handleCreate} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  tabRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  tabActive: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#8ecae6",
    borderRadius: 10,
  },
});
