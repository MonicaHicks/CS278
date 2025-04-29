// components/EventModal.tsx
import React from "react";
import {
  GestureResponderEvent,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../assets/theme";
import { ThemedText } from "./ThemedText";

type EventItem = {
  id: string;
  hostName: string;
  hostImage?: string;
  eventTitle: string;
  hostFlyer?: string;
  attendees: string[];
  dateTime: Date;
  location: string;
};

export default function EventModal({
  visible,
  onClose,
  item,
}: {
  visible: boolean;
  onClose: (event?: GestureResponderEvent) => void;
  item: EventItem;
}) {
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={theme.eventModalOverlay}>
        <View style={theme.eventModalContent}>
          <ThemedText style={theme.typography.eventTitle}>
            {item.eventTitle}
          </ThemedText>
          <ThemedText style={theme.typography.subtitle}>
            Hosted by {item.hostName}
          </ThemedText>
          <ThemedText style={theme.typography.body}>
            {formattedDateTime}
          </ThemedText>
          <ThemedText style={theme.typography.body}>
            Location: {item.location}
          </ThemedText>
          <TouchableOpacity onPress={onClose}>
            <ThemedText
              style={[theme.typography.body, { marginTop: 20, color: "blue" }]}
            >
              Close
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
