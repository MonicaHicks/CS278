import { db } from '@/firebaseConfig';
import { collection, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import EventComponent from './Event';
import { EventType } from './types';

type FeedProps = {
  filter: 'upcoming' | 'past';
  userId?: string;
};

export default function Feed({ filter, userId }: FeedProps) {
  const [events, setEvents] = useState<EventType[]>([]);
  const now = new Date();

  useEffect(() => {
    let q;

    if (userId) {
      // Only show events where this user is in attendees
      q = query(
        collection(db, 'events'),
        where('attendees', 'array-contains', userId),
        orderBy('dateTime', 'asc'),
      );
    } else {
      // Show all public events
      q = query(collection(db, 'events'), orderBy('dateTime', 'asc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            ...(data as Omit<EventType, 'id' | 'dateTime'>),
            id: doc.id,
            dateTime: (data.dateTime as Timestamp).toDate(),
          };
        })
        .filter((event) => (filter === 'upcoming' ? event.dateTime >= now : event.dateTime < now));

      setEvents(list as EventType[]);
    });

    return () => unsubscribe();
  }, [filter, userId]);

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
