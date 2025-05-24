import { EventType } from '@/components/types'; // Assuming EventType is defined here
import { createEvent } from '@/database/eventHooks';
import { auth } from '@/firebaseConfig';
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

type EventCreationModalProps = {
  userId: string; // User ID of the host
  visible: boolean; // Modal visibility
  onClose: () => void; // Function to close the modal
};

const EventCreationModal: React.FC<EventCreationModalProps> = ({ userId, visible, onClose }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const user = auth.currentUser?.displayName ? auth.currentUser?.displayName : '';

  const handleCreateEvent = async () => {
    if (!eventTitle || !location || !dateTime) {
      setErrorMessage('Please fill in all the fields');
      return;
    }

    const newEvent: EventType = {
      hostName: user, // You can get this dynamically if needed
      hostImage: '', // Optional: add dynamic user image
      eventTitle: eventTitle,
      hostFlyer: '', // Optional: add flyer
      location: location,
      dateTime: new Date(dateTime), // Convert string to Date
      hostId: userId,
      attendees: [userId], // Initially, the user is the first attendee
      comments: [], // No comments initially
    };

    try {
      // Call the createEvent function to upload the event
      await createEvent(userId, newEvent);
      setErrorMessage('');
      alert('Event created successfully!');
      onClose(); // Close the modal after event creation
    } catch (error) {
      setErrorMessage('Failed to create event. Please try again later.');
      console.error(error);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={eventTitle}
          onChangeText={setEventTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Date and Time (YYYY-MM-DDTHH:MM)"
          value={dateTime}
          onChangeText={setDateTime}
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <Button title="Create Event" onPress={handleCreateEvent} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default EventCreationModal;
