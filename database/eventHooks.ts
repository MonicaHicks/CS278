import { EventType } from '@/components/types';
import { db } from '@/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

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
      hostId: eventData.hostId,
      comments: eventData.comments || [],
    };
  }
  return null; // Event does not exist
}

export const createEvent = async (userId: string, event: EventType) => {
  try {
    const newEvent = {
      ...event,
      hostId: userId, // Store the userId as hostId
      attendees: [userId], // Initially, the user is the first attendee
      comments: [], // No comments yet
    };

    // Use addDoc to create a new event document in Firestore
    const docRef = await addDoc(collection(db, 'events'), newEvent);
    console.log('Event created with ID:', docRef.id);
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

const editEvent = async (userId: string, eventId: string, updatedEvent: EventType) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);

    if (!eventDoc.exists()) {
      throw 'Event not found';
    }

    // Check if the current user is the host
    if (eventDoc.data()?.hostId !== userId) {
      throw 'User is not the host';
    }

    // Update the event data
    await updateDoc(eventRef, {
      ...updatedEvent, // Only update fields in updatedEvent
    });

    console.log('Event updated');
  } catch (error) {
    console.error('Error editing event:', error);
  }
};

const deleteEvent = async (userId: string, eventId: string) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);

    if (!eventDoc.exists()) {
      throw 'Event not found';
    }

    // Check if the current user is the host
    if (eventDoc.data()?.hostId !== userId) {
      throw 'User is not the host';
    }

    // Delete the event
    await deleteDoc(eventRef);

    console.log('Event deleted');
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};
