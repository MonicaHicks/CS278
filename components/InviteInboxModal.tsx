import theme from '@/assets/theme';
import { getEvent } from '@/database/eventHooks';
import { handleRSVP } from '@/database/rsvpHooks';
import { getUser } from '@/database/userHooks';
import { db } from '@/firebaseConfig';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InviteInboxModal({
  invites,
  onClose,
  userId,
  onRespond,
}: {
  invites: any[];
  onClose: () => void;
  userId: string;
  onRespond?: () => void;
}) {
  const handleAccept = async (invite: any) => {
    const inviteRef = doc(db, 'invites', invite.id);
    await updateDoc(inviteRef, { status: 'accepted' });

    const eventRef = doc(db, 'events', invite.eventId);
    await updateDoc(eventRef, {
      attendees: arrayUnion(userId),
    });
    await handleRSVP(userId, invite.eventId);

    if (onRespond) onRespond();
  };

  return (
    <Modal animationType="slide" transparent visible>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>You're Invited!</Text>
          <View style={styles.scrollContainer}>
            <FlatList
              data={invites}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <InviteCard invite={item} onAccept={() => handleAccept(item)} />
              )}
              contentContainerStyle={{ alignItems: 'center' }}
            />
          </View>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function InviteCard({ invite, onAccept }: { invite: any; onAccept: () => void }) {
  const [event, setEvent] = React.useState<any>(null);
  const [inviter, setInviter] = React.useState<any>(null);

  React.useEffect(() => {
    getEvent(invite.eventId).then(setEvent);
    console.log(invite);
    if (invite.senderId) {
      console.log(invite.senderId);
      getUser(invite.senderId).then(setInviter);
    }
  }, []);

  if (!event) return null;

  const formattedDate = (() => {
    const rawDate = event.dateTime?.seconds
      ? new Date(event.dateTime.seconds * 1000)
      : new Date(event.dateTime);
    return rawDate.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  })();

  return (
    <View style={styles.card}>
      {inviter && (
        <View style={styles.inviterContainer}>
          {inviter.photoUrl && <Image source={{ uri: inviter.photoUrl }} style={styles.avatar} />}
          <Text style={styles.inviterText}>{inviter.name} invited you</Text>
        </View>
      )}
      <Text style={styles.eventTitle}>{event.eventTitle}</Text>
      <Text style={styles.info}>📍 {event.location}</Text>
      <Text style={styles.info}>🗓 {formattedDate}</Text>
      <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
        <Text style={styles.acceptText}>RSVP & Accept</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '85%',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 12,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    marginBottom: 2,
  },
  acceptBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  acceptText: {
    color: 'white',
    fontWeight: '600',
  },
  inviterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  inviterText: {
    fontWeight: '500',
    marginLeft: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  scrollContainer: {
    maxHeight: 300,
    width: '100%',
    marginBottom: 16,
  },
  close: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    width: '40%',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
