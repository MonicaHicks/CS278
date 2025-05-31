import theme from '@/assets/theme';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import InviteModal from './InviteModal';

export default function InviteButton({ userId, eventId }: { userId: string; eventId: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>Invite your Friends!</Text>
      </TouchableOpacity>
      <InviteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        userId={userId}
        eventId={eventId}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
