import theme from '@/assets/theme';
import Feed from '@/components/Feed';
import GlobalHeaderImage from '@/components/GlobalHeaderImage';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ProfileHeader from '@/components/ProfileHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { signOut } from '@/database/authHooks';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { sampleUser } from '../../components/types';

const Separator = () => <View style={styles.separator} />;

export default function ProfileScreen() {
  // Ger user data from the server
  let user = sampleUser;
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login'); // Or wherever your login screen is
    } catch (error) {
      alert('Failed to log out: ');
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<GlobalHeaderImage />}
    >
      <ThemedView>
        <ProfileHeader {...user} />
      </ThemedView>
      {/* <FollowButton isFollowing={false} /> */}
      <Separator />
      <ThemedView>
        <ThemedText
          style={[theme.typography.subtitle, { alignItems: 'center', gap: 8, marginBottom: 10 }]}
        >
          {user.name}'s activity
        </ThemedText>
        <Feed filter="upcoming" />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
