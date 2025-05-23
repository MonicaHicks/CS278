import { EventType } from '@/components/types';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export async function fetchEvents(): Promise<EventType[]> {
  const querySnapshot = await getDocs(collection(db, 'events'));

  const events: EventType[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    console.log('Event id:', doc.id);
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

// getEvent
export async function getEvent(eventId: string): Promise<EventType | null> {
  const eventRef = doc(db, 'events', eventId);
  const eventDoc = await getDoc(eventRef);
  if (eventDoc.exists()) {
    const eventData = eventDoc.data();
    return {
      id: eventDoc.id,
      hostName: eventData.hostName,
      hostImage: eventData.hostImage,
      eventTitle: eventData.eventTitle,
      hostFlyer: eventData.hostFlyer,
      location: eventData.location,
      dateTime: eventData.dateTime.toDate(), // Firestore Timestamp -> JS Date
      attendees: eventData.attendees || [],
      comments: eventData.comments || [],
    };
  }
  return null; // Event does not exist
}
