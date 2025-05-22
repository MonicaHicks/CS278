// app/(tabs)/events/[id].tsx
import EventPage from '@/components/EventPage';
import { EventType } from '@/components/types';
import { fetchEvents } from '@/firestore';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export const options = {
  href: null,
};

export default function EventPageRoute() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<EventType | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const allEvents = await fetchEvents();
        const foundEvent = allEvents.find((event) => event.id === id);
        setEvent(foundEvent || null);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvent(null);
      }
    };

    load();
  }, [id]);
  // const event = fetchEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <View>
        <Text>Event not found</Text>
      </View>
    );
  }

  return <EventPage item={event} />;
}
