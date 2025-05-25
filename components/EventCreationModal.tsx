import theme from '@/assets/theme';
import { EventType } from '@/components/types';
import { createEvent } from '@/database/eventHooks';
import { auth } from '@/firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';

type EventCreationModalProps = {
  userId: string;
  visible: boolean;
  onClose: () => void;
};

const EventCreationModal: React.FC<EventCreationModalProps> = ({ userId, visible, onClose }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [flyerImage, setFlyerImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const user = auth.currentUser?.displayName || '';

  const pickImage = async () => {
    setShowTimePicker(false);
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

      const filename = `flyers/${uuid.v4()}.jpg`;
      const storageRef = ref(getStorage(), filename);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const combineDateTime = (date: Date, time: Date): Date => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined;
  };

  const handleCreateEvent = async () => {
    if (!eventTitle || !location || !selectedDate || !selectedTime) {
      setErrorMessage('Please fill in all the fields');
      return;
    }

    const eventDateTime = combineDateTime(selectedDate, selectedTime);

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
        dateTime: new Date(eventDateTime),
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
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={{ color: selectedDate ? '#000' : '#888' }}>
              {selectedDate ? selectedDate.toDateString() : 'Pick a Date'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={selectedDate || new Date()}
              onChange={(event, date) => {
                if (Platform.OS === 'android') setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
            />
          )}

          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
            <Text style={{ color: selectedTime ? '#000' : '#888' }}>
              {selectedTime
                ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Pick a Time'}
            </Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              mode="time"
              display="spinner"
              value={selectedTime || new Date()}
              onChange={(event, time) => {
                if (Platform.OS === 'android') setShowTimePicker(false);
                if (time) setSelectedTime(time);
              }}
              is24Hour={false}
            />
          )}

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>
              {flyerImage ? 'Change Flyer Image' : 'Pick a Flyer Image'}
            </Text>
          </TouchableOpacity>

          {flyerImage && <Image source={{ uri: flyerImage }} style={styles.flyerImage} />}

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
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  flyerImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginTop: 10,
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
    marginTop: 10,
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
