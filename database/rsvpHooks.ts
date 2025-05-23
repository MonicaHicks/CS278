import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  DocumentReference,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { isDocumentReferenceInList } from './helpers';
import { EventType } from '@/components/types';

//isRSVPed
export async function isRSVPed(userId: string, eventId: string): Promise<boolean> {
  const userRef = doc(db, 'users', userId);
  const eventRef = doc(db, 'events', eventId);
  const eventDoc = await getDoc(eventRef);
  if (eventDoc.exists() && userRef) {
    const eventData = eventDoc.data();
    const attendees = eventData.attendees || [];
    return isDocumentReferenceInList(userRef, attendees);
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
  return true; // RSVP successful
}

// handleUnRSVP
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
  if (
    !isDocumentReferenceInList(userRef, attendees) ||
    !isDocumentReferenceInList(eventRef, events)
  ) {
    return false; // User is not RSVPed
  }

  // If everything looks good, update the event and user documents
  await updateDoc(eventRef, {
    attendees: arrayRemove(userRef),
  });

  await updateDoc(userRef, {
    events: arrayRemove(eventRef),
  });
  return true; // Un-RSVP successful
}

// getRsvps
// Return a list of reference IDs to a given user's RSVPed events
export async function getRsvps(userId: string): Promise<EventType[]> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const events = userData.events || [];
    // Convert to EventType and return
    const eventData = await Promise.all(
      events.map(async (docRef: DocumentReference) => {
        const eventDoc = await getDoc(docRef);

        // If the document exists, convert it to EventType
        if (eventDoc.exists()) {
          const eventData = eventDoc.data();
          return {
            id: eventDoc.id,
            hostName: eventData.displayName,
            hostImage: eventData.image,
            eventTitle: eventData.eventTitle,
            hostFlyer: eventData.hostFlyer,
            location: eventData.location,
            dateTime: eventData.dateTime.toDate(), // Firestore Timestamp -> JS Date
            hostId: eventData.hostId,
            attendees: eventData.attendees || [],
            comments: eventData.comments || [],
          };
        }
        return null; // Handle the case where the document does not exist
      }),
    );
    return eventData.filter((event) => event !== null) as EventType[];
  }
  console.log('User does not exist');
  return [];
}
