// components/ReactionModal.tsx
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

type Props = {
  type: "like" | "comment" | "rsvp" | "repost";
  eventTitle: string;
  onClose: () => void;
};

export default function ReactionModal({ type, eventTitle, onClose }: Props) {
  const [comment, setComment] = useState("");

  const submit = () => {
    // Eventually: call mutation or update local state
    console.log(`${type.toUpperCase()} submitted for ${eventTitle}:`, comment);
    setComment("");
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            {type === "comment" ? "Leave a Comment" : `Confirm ${type.toUpperCase()}`}
          </Text>
          {type === "comment" ? (
            <TextInput
              placeholder="Type your comment..."
              value={comment}
              onChangeText={setComment}
              style={styles.input}
            />
          ) : (
            <Text style={{ marginBottom: 12 }}>Tap confirm to {type} this event.</Text>
          )}
          <Button title="Submit" onPress={submit} />
          <Button title="Cancel" onPress={onClose} color="gray" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalView: {
    backgroundColor: "white", padding: 20,
    borderRadius: 12, width: "80%",
    alignItems: "center", gap: 12,
  },
  title: { fontWeight: "bold", fontSize: 18 },
  input: {
    width: "100%", padding: 10,
    borderWidth: 1, borderRadius: 8,
  },
});
