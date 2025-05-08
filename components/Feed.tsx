// components/Feed.tsx
import { mockEvents } from '@/assets/data/mockEvents';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Event from './Event';

type FeedProps = {
  filter: 'upcoming' | 'past';
};

export default function Feed({ filter }: FeedProps) {
  const now = new Date();

  const filteredEvents = mockEvents.filter((event) =>
    filter === 'upcoming' ? event.dateTime >= now : event.dateTime < now,
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {filteredEvents.map((item) => (
          <Event item={item} key={item.id} />
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
