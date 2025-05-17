// lib/firestore.ts
import { Event } from '@/components/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function fetchEvents(): Promise<Event[]> {
  const querySnapshot = await getDocs(collection(db, 'events'));

  const events: Event[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id, // Grab the Firestore-generated ID
      hostName: data.hostName,
      hostImage: data.hostImage,
      eventTitle: data.eventTitle,
      hostFlyer: data.hostFlyer,
      location: data.location,
      dateTime: data.dateTime.toDate(), // Firestore Timestamp -> JS Date
      hostId: data.hostId,
      attendees: data.attendees || [],
      comments: data.comments || [],
    };
  });

  return events;
}
