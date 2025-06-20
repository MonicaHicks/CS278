import theme from '@/assets/theme';
import Feed from '@/components/Feed';
import FollowButton from '@/components/FollowButton';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ProfileHeader from '@/components/ProfileHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import {
  Share,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getUser } from '@/database/userHooks';
import { getUserId } from '@/database/authHooks';
import { User } from '@/components/types';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';
import ProfileAndSearchButtons from '@/components/ProfileAndSearchButtons';

const Separator = () => <View style={styles.separator} />;

export const options = {
  href: null,
};

// TODO: share and copy link functionality
// const shareLink = async () => {
//   const { id } = useLocalSearchParams();
//   const url = `https://yourdomain.com/events/${id}`;
//   try {
//     await Share.share({
//       message: `Check out this event: ${url}`,
//       url,
//     });
//   } catch (error) {
//     Alert.alert('Error', 'Could not share the event link.');
//   }
// };

// const copyLink = async () => {
//   const { id } = useLocalSearchParams();
//   const url = `https://yourdomain.com/events/${id}`;
//   await Clipboard.setStringAsync(url);
//   Alert.alert('Copied!', 'Event link copied to clipboard.');
// };

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

  // Copy and share buttons are commented out for now
  //   <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginVertical: 8 }}>
  //   <TouchableOpacity onPress={shareLink} style={{ padding: 8 }}>
  //     <Ionicons name="share-outline" size={24} color="#007bff" />
  //   </TouchableOpacity>
  //   <TouchableOpacity onPress={copyLink} style={{ padding: 8 }}>
  //     <Ionicons name="copy-outline" size={24} color="#007bff" />
  //   </TouchableOpacity>
  // </View>

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerWrapper}>
          <Image
            source={require('@/assets/images/Stanford_Oval.png')}
            style={styles.reactLogo}
            resizeMode="cover"
          />
          <BackButton />
          <ProfileAndSearchButtons />
        </View>
      }
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
  headerWrapper: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});
