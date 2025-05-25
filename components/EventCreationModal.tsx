import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import uuid from 'react-native-uuid';

import theme from '@/assets/theme';
import { EventType } from '@/components/types';
import { createEvent } from '@/database/eventHooks';
import { auth } from '@/firebaseConfig';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type EventCreationModalProps = {
  userId: string;
  visible: boolean;
  onClose: () => void;
};

const EventCreationModal: React.FC<EventCreationModalProps> = ({ userId, visible, onClose }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [flyerImage, setFlyerImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const user = auth.currentUser?.displayName || '';

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.uri) {
        setFlyerImage(asset.uri);
      } else {
        console.warn('No URI found in image asset');
      }
    }
  };

  const uploadImageAsync = async (uri: string): Promise<string> => {
    try {
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(new Error('Image fetch failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      console.log('Blob:', blob);
      console.log('Blob type:', blob?.type);
      const filename = `flyers/${uuid.v4()}.jpg`;
      const storageRef = ref(getStorage(), filename);
      console.log('1');
      const snapshot = await uploadBytes(storageRef, blob);
      console.log('2');
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('3');
      return downloadURL;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const handleCreateEvent = async () => {
    if (!eventTitle || !location || !dateTime) {
      setErrorMessage('Please fill in all the fields');
      return;
    }

    try {
      setLoading(true);
      let flyerUrl = '';

      if (flyerImage) {
        setUploading(true);
        flyerUrl = await uploadImageAsync(flyerImage);
        setUploading(false);
      }

      const newEvent: EventType = {
        hostName: user,
        hostImage: '',
        eventTitle,
        hostFlyer: flyerUrl,
        location,
        dateTime: new Date(dateTime),
        hostId: userId,
        attendees: [userId],
        comments: [],
      };

      await createEvent(userId, newEvent);
      alert('Event created successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Create New Event</Text>

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
            placeholder="Date & Time (YYYY-MM-DDTHH:MM)"
            value={dateTime}
            onChangeText={setDateTime}
          />

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>
              {flyerImage ? 'Change Flyer Image' : 'Pick a Flyer Image'}
            </Text>
          </TouchableOpacity>

          {flyerImage && (
            <Image
              source={{ uri: flyerImage }}
              style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }}
            />
          )}

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          {loading || uploading ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.primary}
              style={{ marginTop: 10 }}
            />
          ) : (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.primary]} onPress={handleCreateEvent}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  imagePicker: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  cancel: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default EventCreationModal;
