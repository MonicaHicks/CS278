// components/EventModal.tsx
import React from "react";
import {
  GestureResponderEvent,
  Image,
  Modal,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import theme from "../assets/theme";
import RSVPButton from "./RSVPButton";
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
  const formattedDate = `${item.dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  })}`;
  const formattedTime = `${item.dateTime.toLocaleTimeString("en-US", {
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
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={theme.eventModalOverlay}>
          <View style={theme.eventModalContent}>
            <View
              style={[theme.profilePicNameContainer, { marginVertical: 8 }]}
            >
              <Image
                source={
                  item.hostImage
                    ? { uri: item.hostImage }
                    : require("../assets/images/Placeholder_Club.png")
                }
                style={theme.profilePic}
              />

              <ThemedText
                style={[theme.typography.eventTitle, { marginTop: 12 }]}
              >
                {item.hostName}
              </ThemedText>
            </View>
            <View style={{ alignItems: "center", gap: 8, margin: 10 }}>
              <ThemedText style={theme.typography.title}>
                {item.eventTitle}
              </ThemedText>
            </View>
            {/* make it so you can click on the flyer to englarge */}
            <Image
              source={
                item.hostFlyer
                  ? { uri: item.hostFlyer }
                  : require("../assets/images/Sample_Flyer.png")
              }
              style={[
                theme.flyerFull,
                {
                  width: "100%",
                  height: 200,
                  resizeMode: "cover",
                  borderRadius: 8,
                  marginBottom: 12,
                },
              ]}
            />
            <View style={{ alignItems: "center" as const, gap: 6 }}>
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
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
