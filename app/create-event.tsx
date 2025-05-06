import { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from "react-native";
import { router } from "expo-router";

export default function CreateEventPage() {
  const [event, setEvent] = useState({
    eventTitle: "",
    location: "",
    date: "",
    time: "",
    description: "",
  });

  const handleSubmit = () => {
    console.log("Created Event:", event);
    router.replace("/club");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create New Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={event.eventTitle}
        onChangeText={(t) => setEvent({ ...event, eventTitle: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={event.location}
        onChangeText={(t) => setEvent({ ...event, location: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={event.date}
        onChangeText={(t) => setEvent({ ...event, date: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={event.time}
        onChangeText={(t) => setEvent({ ...event, time: t })}
      />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Description"
        value={event.description}
        onChangeText={(t) => setEvent({ ...event, description: t })}
        multiline
        numberOfLines={4}
      />

      <Button title="Submit Event" color="#e63946" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
