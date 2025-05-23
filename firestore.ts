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

// getFollowers - probably want to change the return type to a list of user objects
// Return a list of reference IDs to a given user's followers
export async function getFollowers(userId: string): Promise<string[]> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const followers = userData.followers || [];
    return followers.map((docRef: DocumentReference) => docRef.id);
  }
  console.log('User does not exist');
  return [];
}

// getFollowing
// Return a list of reference IDs to a given user's following
export async function getFollowing(userId: string): Promise<string[]> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    const following = userData.following || [];
    return following.map((docRef: DocumentReference) => docRef.id);
  }
  console.log('User does not exist');
  return [];
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

// getComments
// Get the list of comments under a given event
export async function getComments(eventId: string): Promise<string[]> {
  const eventRef = doc(db, 'events', eventId);
  const eventDoc = await getDoc(eventRef);
  if (eventDoc.exists()) {
    const eventData = eventDoc.data();
    const comments = eventData.comments || [];
    return comments.map((docRef: DocumentReference) => docRef.id);
  }
  console.log('Event does not exist');
  return [];
}
