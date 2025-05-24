import { auth } from '@/firebaseConfig';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import EventCreationModal from './EventCreationModal'; // Import the modal

// type EventCreationButtonProps = {
//   userId: string; // User ID of the host
// };

export default function EventCreationButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const userId = auth.currentUser?.uid ? auth.currentUser?.uid : '';

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <Button title="Create Event" onPress={openModal} />
      <EventCreationModal userId={userId} visible={modalVisible} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});
