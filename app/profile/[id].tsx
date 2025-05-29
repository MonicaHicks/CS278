import theme from '@/assets/theme';
import Feed from '@/components/Feed';
import FollowButton from '@/components/FollowButton';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ProfileHeader from '@/components/ProfileHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getUser } from '@/database/userHooks';
import { getUserId } from '@/database/authHooks';
import { User } from '@/components/types';

const Separator = () => <View style={styles.separator} />;
// TODO: hide expo header on this page

export const options = {
  href: null,
};

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'upcomingEvents' | 'pastEvents'>('upcomingEvents');
  const [loading, setLoading] = useState(true);

  // Only render the follow button if the user is not viewing their own profile
  const userId = getUserId();
  const stringId = id as string;
  let isOwnProfile = false;
  if (userId == stringId) {
    isOwnProfile = true;
  }

  // Load user data from server
  useEffect(() => {
    setLoading(true);
    getUser(id as string)
      .then((result) => {
        setUser(result);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <ThemedText>Loading user...</ThemedText>
      </ThemedView>
    );
  }

  if (!user) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>User not found</ThemedText>
      </ThemedView>
    );
  }

  // Render diffrent text if the user is a club or a student
  // const userIsClub = user.isClub;
  // const eventsSummary =

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<GlobalHeaderImage />}
    >
      <ThemedView>
        <ProfileHeader {...user} />
      </ThemedView>
      {isOwnProfile ? null : <FollowButton pageUserId={id as string} />}
      <Separator />
      <ThemedView>
        <ThemedText
          style={[theme.typography.subtitle, { alignItems: 'center', gap: 8, marginBottom: 10 }]}
        >
          {isOwnProfile ? 'Your' : user.name + "'s"} activity
        </ThemedText>
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
            <Feed filter="upcoming" userId={id as string} />
          ) : (
            <Feed filter="past" userId={id as string} />
          )}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  feed: {
    width: '100%',
  },
});
