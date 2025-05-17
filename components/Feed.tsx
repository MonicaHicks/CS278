// components/Feed.tsx
import { fetchEvents } from '@/firestore';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type FeedProps = {
  filter: 'upcoming' | 'past';
};

export default function Feed({ filter }: FeedProps) {
  const [events, setEvents] = useState<EventType[]>([]);
  const now = new Date();

  useEffect(() => {
    const load = async () => {
      const allEvents = await fetchEvents();
      const filtered = allEvents.filter((event) =>
        filter === 'upcoming' ? event.dateTime >= now : event.dateTime < now,
      );
      setEvents(filtered);
    };
    load();
  }, [filter]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {events.map((item) => (
          <EventType item={item} key={item.id} />
        ))}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
