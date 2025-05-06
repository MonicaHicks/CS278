import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

export type EventFormData = {
  eventTitle: string;
  location: string;
  date: string;
  time: string;
};

type Props = {
  onCreate: (data: EventFormData) => void;
};

export default function CreateEventForm({ onCreate }: Props) {
  const [form, setForm] = useState<EventFormData>({
    eventTitle: "",
    location: "",
    date: "",
    time: "",
  });

  const handleSubmit = () => {
    if (form.eventTitle && form.location && form.date && form.time) {
      onCreate(form);
      setForm({ eventTitle: "", location: "", date: "", time: "" });
    }
  };

  return (
    <ThemedView style={styles.formContainer}>
      <TextInput
        placeholder="Event Title"
        value={form.eventTitle}
        onChangeText={(t) => setForm({ ...form, eventTitle: t })}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={form.location}
        onChangeText={(t) => setForm({ ...form, location: t })}
        style={styles.input}
      />
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={form.date}
        onChangeText={(t) => setForm({ ...form, date: t })}
        style={styles.input}
      />
      <TextInput
        placeholder="Time (HH:MM)"
        value={form.time}
        onChangeText={(t) => setForm({ ...form, time: t })}
        style={styles.input}
      />
      <Button title="Create Event" onPress={handleSubmit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  formContainer: { gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 8,
  },
});
