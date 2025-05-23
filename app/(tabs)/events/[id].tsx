// app/(tabs)/events/[id].tsx
import { mockEvents } from '@/assets/data/mockEvents';
import EventPage from '@/components/EventPage';
import { useLocalSearchParams } from 'expo-router';
import { Text, View, ActivityIndicator } from 'react-native';
import { getEvent } from '@/database/eventHooks';
import { useEffect, useState } from 'react';
import { EventType } from '@/components/types';

export const options = {
  href: null,
};

export default function EventPageRoute() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEvent(id as string)
      .then((result) => {
        setEvent(result);
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
        setEvent(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading event...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Event not found</Text>
      </View>
    );
  }

  return <EventPage item={event} />;
}
