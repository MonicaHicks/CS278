// components/Reactions.tsx
import { useState } from "react";
import { View, Text, Pressable, Modal, TextInput, Button, StyleSheet } from "react-native";
import type { ClubEvent } from "@/types";
import ReactionModal from "./ReactionModal";

export default function Reactions({ event }: { event: ClubEvent }) {
  const [modalVisible, setModalVisible] = useState<null | "like" | "comment" | "rsvp" | "repost">(null);
  const open = (type: typeof modalVisible) => setModalVisible(type);

  return (
    <View style={styles.container}>
      <View style={styles.reactions}>
        <Pressable onPress={() => open("like")}><Text>👍 {event.reactions?.likes ?? 0}</Text></Pressable>
        <Pressable onPress={() => open("comment")}><Text>💬 {event.reactions?.comments ?? 0}</Text></Pressable>
        <Pressable onPress={() => open("rsvp")}><Text>📌 {event.reactions?.rsvps ?? 0}</Text></Pressable>
        <Pressable onPress={() => open("repost")}><Text>🔁 {event.reactions?.reposts ?? 0}</Text></Pressable>
      </View>

      {modalVisible && (
        <ReactionModal
          type={modalVisible}
          onClose={() => setModalVisible(null)}
          eventTitle={event.eventTitle}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  reactions: { flexDirection: "row", justifyContent: "space-around", gap: 10 },
});
