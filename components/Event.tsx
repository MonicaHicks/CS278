import { deleteEvent } from '@/database/eventHooks';
import { auth } from '@/firebaseConfig';
import { useState } from 'react';
import { Alert, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import theme from '../assets/theme';
import EventCreationModal from './EventCreationModal';
import EventModal from './EventModal';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { EventType } from './types';
import { useRouter } from 'expo-router';

export default function EventComponent({ item }: { item: EventType }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const router = useRouter();

  const formattedDateTime = `${item.dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })} · ${item.dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })}`;

  const handleDelete = () => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvent(auth.currentUser?.uid || '', item.id!);
              alert('Event deleted successfully');
              setModalVisible(false);
            } catch (error) {
              alert('Failed to delete event.');
              console.error(error);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const isHost = auth.currentUser?.uid === item.hostId;

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <ThemedView style={theme.eventCard}>
          <View style={theme.profilePicNameContainer}>
            <Image
              source={
                item.hostImage
                  ? { uri: item.hostImage }
                  : require('../assets/images/Placeholder_Club.png')
              }
              style={theme.profilePic}
            />
            <ThemedText style={[theme.typography.subtitle, { marginTop: 12 }]}>
              {item.hostName}
            </ThemedText>
          </View>

          <View style={{ alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <ThemedText style={theme.typography.eventTitle}>{item.eventTitle}</ThemedText>
            <ThemedText style={theme.typography.body}>
              {formattedDateTime} · {item.location}
            </ThemedText>
          </View>
          {isHost && (
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                }}
                onPress={() => setEditVisible(true)}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#999', // or use theme.colors.secondary if you have one
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                }}
                onPress={handleDelete}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </ThemedView>
      </Pressable>

      <EventModal visible={modalVisible} onClose={() => setModalVisible(false)} item={item} />

      {isHost && (
        <EventCreationModal
          visible={editVisible}
          onClose={() => setEditVisible(false)}
          userId={auth.currentUser?.uid || ''}
          eventToEdit={item}
        />
      )}
    </>
  );
}
