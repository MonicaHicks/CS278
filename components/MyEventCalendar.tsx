import { useState } from "react";
import { Calendar } from "react-native-calendars";
import { View, Modal, StyleSheet, Text, ScrollView } from "react-native";
import { ThemedView } from "./ThemedView";
import Event from "./Event";
import type { ClubEvent } from "@/types";
import { Button as NativeButton } from "react-native";

export default function MyEventCalendar({ events }: { events: ClubEvent[] }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<ClubEvent[]>([]);

  const markedDates = events.reduce((acc, event) => {
    const dateStr = event.dateTime.toISOString().split("T")[0];
    acc[dateStr] = { marked: true };
    return acc;
  }, {} as Record<string, any>);

  const handleDatePress = (day: { dateString: string }) => {
    const dayEvents = events.filter(
      (e) => e.dateTime.toISOString().split("T")[0] === day.dateString
    );
    if (dayEvents.length > 0) {
      setSelectedEvents(dayEvents);
      setSelectedDate(day.dateString);
      setModalVisible(true);
    }
  };

  return (
    <ThemedView>
      <Calendar markedDates={markedDates} onDayPress={handleDatePress} />

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalHeader}>Events on {selectedDate}</Text>
            <ScrollView contentContainerStyle={{ gap: 12 }}>
              {selectedEvents.map((event) => (
                <View key={event.id} style={{ marginBottom: 10 }}>
                  <Event item={event} expandable />
                </View>
              ))}
            </ScrollView>
            <NativeButton title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  modalHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
});
