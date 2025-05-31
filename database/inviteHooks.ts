import { db } from '@/firebaseConfig';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

export const sendInvite = async (eventId: string, senderId: string, recipientId: string) => {
  await addDoc(collection(db, 'invites'), {
    eventId,
    senderId,
    recipientId,
    status: 'pending',
    sentAt: new Date(),
  });
};

export const updateInvite = async (inviteId: string, status: string) => {
  await updateDoc(doc(db, 'invites', inviteId), { status: status });
};
