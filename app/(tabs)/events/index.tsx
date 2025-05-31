import theme from '@/assets/theme';
import Feed from '@/components/Feed';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';
import InviteInboxModal from '@/components/InviteInboxModal';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getUserId } from '@/database/authHooks';
import { getPendingInvites } from '@/database/inviteHooks';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function EventsScreen() {
  const userId = getUserId();
  if (!userId) {
    return <Redirect href="/login" />;
  }

  const [view, setView] = useState<'upcomingEvents' | 'pastEvents'>('upcomingEvents');
  const [pendingInvites, setPendingInvites] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userId) {
      getPendingInvites(userId).then((invites) => {
        setPendingInvites(invites);
      });
    }
  }, [userId]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<GlobalHeaderImage />}
    >
      <ThemedText type="title">My Events</ThemedText>
      {pendingInvites.length > 0 && (
        <TouchableOpacity style={styles.inviteBanner} onPress={() => setShowModal(true)}>
          <ThemedText style={styles.inviteText}>
            You have {pendingInvites.length} pending invite
            {pendingInvites.length > 1 ? 's' : ''}! Tap to view.
          </ThemedText>
        </TouchableOpacity>
      )}
      {showModal && (
        <InviteInboxModal
          invites={pendingInvites}
          userId={userId}
          onClose={() => setShowModal(false)}
          onRespond={() => {
            setShowModal(false);
            getPendingInvites(userId).then((invites) => {
              setPendingInvites(invites);
            });
          }}
        />
      )}
      <View style={theme.toggleContainer}>
        <TouchableOpacity
          style={[
            theme.toggleButton,
            view === 'upcomingEvents' ? theme.activeButton : theme.inactiveButton,
            { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
          ]}
          onPress={() => setView('upcomingEvents')}
        >
          <ThemedText
            style={
              view === 'upcomingEvents'
                ? theme.typography.activeText
                : theme.typography.inactiveText
            }
          >
            Upcoming Events
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            theme.toggleButton,
            view === 'pastEvents' ? theme.activeButton : theme.inactiveButton,
            { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
          ]}
          onPress={() => setView('pastEvents')}
        >
          <ThemedText
            style={
              view === 'pastEvents' ? theme.typography.activeText : theme.typography.inactiveText
            }
          >
            Past Events
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.feed}>
        {view === 'upcomingEvents' ? (
          <View>
            <Feed filter="upcoming" userId={userId} />
          </View>
        ) : (
          <View>
            <Feed filter="past" userId={userId} />
          </View>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  feed: {
    width: '100%',
  },
  inviteBanner: {
    backgroundColor: '#FEEFC3',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },

  inviteText: {
    fontWeight: '600',
    color: '#5C3700',
  },
});
