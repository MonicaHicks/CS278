// components/Feed.tsx
import { fetchEvents } from '@/database/eventHooks';
import { getRsvps } from '@/database/rsvpHooks';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import EventComponent from './Event';
import { EventType } from './types';

type FeedProps = {
  filter: 'upcoming' | 'past';
  // If userId us provided, only render that user's events
  userId?: string;
};

export default function Feed({ filter, userId }: FeedProps) {
  const [events, setEvents] = useState<EventType[]>([]);
  const now = new Date();

  useEffect(() => {
    const load = async () => {
      // Should add props depending on if this is the user's feed or a public feed
      let allEvents = null;
      if (userId) {
        allEvents = await getRsvps(userId);
      } else {
        allEvents = await fetchEvents();
      }
      // const allEvents = await fetchEvents();
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
          <EventComponent item={item} key={item.id} />
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
