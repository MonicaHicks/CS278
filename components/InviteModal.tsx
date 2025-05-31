import { fetchFriends } from '@/database/friendHooks';
import { sendInvite } from '@/database/inviteHooks';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FriendInviteTile from './FriendInviteTile';

type Props = {
  visible: boolean;
  onClose: () => void;
  userId: string;
  eventId: string;
};

type Friend = {
  id: string;
  name: string;
  displayName: string;
  image?: string;
};

export default function InviteModal({ visible, onClose, userId, eventId }: Props) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [invited, setInvited] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (visible) {
      fetchFriends(userId).then(setFriends);
    }
  }, [visible]);

  const handleInvite = async (friendId: string) => {
    await sendInvite(eventId, userId, friendId);
    setInvited((prev) => new Set(prev).add(friendId));
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>Invite your friends</Text>
              <FlatList
                data={friends}
                numColumns={3}
                contentContainerStyle={{ paddingVertical: 12 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <FriendInviteTile
                    friend={item}
                    isInvited={invited.has(item.id)}
                    onInvite={() => handleInvite(item.id)}
                  />
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
