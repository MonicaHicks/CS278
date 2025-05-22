// lib/firestore.ts
import { EventType } from '@/components/types';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  DocumentReference,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

// Helper function for comparing document references
const isDocumentReferenceInList = (
  targetRef: DocumentReference,
  refList: DocumentReference[],
): boolean => {
  return refList.some((ref) => ref.path === targetRef.path);
};

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

//isRSVPed
export async function isRSVPed(userId: string, eventId: string): Promise<boolean> {
  const eventRef = doc(db, 'events', eventId);
  const eventDoc = await getDoc(eventRef);
  if (eventDoc.exists()) {
    const eventData = eventDoc.data();
    const attendees = eventData.attendees || [];
    return attendees.includes(userId);
  }
  return false;
}

// handleRSVP
// This function updates the event's attendee list and the user's event list
// when a user RSVPs to an event. If the user is alredy RSVPed, it does nothing.
// Returns true if the operation was successful, false otherwise.
export async function handleRSVP(userId: string, eventId: string): Promise<boolean> {
  // Validate the userId and eventId
  const eventRef = doc(db, 'events', eventId);
  const eventDoc = await getDoc(eventRef);
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!eventDoc.exists()) {
    console.log('Event does not exist');
    return false; // Event does not exist
  } else if (!userDoc.exists()) {
    console.log('User does not exist');
    return false; // User does not exist
  }

  // Validate that the user is not already in the attendee list
  const eventData = eventDoc.data();
  const attendees = eventData.attendees || [];
  const userData = userDoc.data();
  const events = userData.events || [];
  if (
    isDocumentReferenceInList(userRef, attendees) ||
    isDocumentReferenceInList(eventRef, events)
  ) {
    console.log('User already RSVPed');
    return false; // User is already RSVPed
  }

  // If everything looks good, update the event and user documents
  await updateDoc(eventRef, {
    attendees: arrayUnion(userRef),
  });

  await updateDoc(userRef, {
    events: arrayUnion(eventRef),
  });
  console.log('RSVP successful');
  return true; // RSVP successful
}

//handleUnRSVP
export async function handleUnRSVP(userId: string, eventId: string): Promise<boolean> {
  // Validate the userId and eventId
  const eventRef = doc(db, 'events', eventId);
  const eventDoc = await getDoc(eventRef);
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!eventDoc.exists()) {
    console.log('Event does not exist');
    return false; // Event does not exist
  } else if (!userDoc.exists()) {
    console.log('User does not exist');
    return false; // User does not exist
  }

  // Validate that the user is in the attendee list
  const eventData = eventDoc.data();
  const attendees = eventData.attendees || [];
  const userData = userDoc.data();
  const events = userData.events || [];
  console.log('Attendees:', attendees);
  console.log('Events:', events);
  if (
    !isDocumentReferenceInList(userRef, attendees) ||
    !isDocumentReferenceInList(eventRef, events)
  ) {
    console.log('User is not RSVPed');
    return false; // User is not RSVPed
  }

  // If everything looks good, update the event and user documents
  await updateDoc(eventRef, {
    attendees: arrayRemove(userRef),
  });

  await updateDoc(userRef, {
    events: arrayRemove(eventRef),
  });
  console.log('Un-RSVP successful');
  return true; // Un-RSVP successful
}
