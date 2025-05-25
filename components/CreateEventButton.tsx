import theme from '@/assets/theme';
import { auth } from '@/firebaseConfig';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.buttonText}> Create Event </Text>
      </TouchableOpacity>
      <EventCreationModal userId={userId} visible={modalVisible} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  buttonText: {
    ...theme.typography.subtitle,
    color: 'white',
  },
});
