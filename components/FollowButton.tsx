import { View, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedText';
import theme from '../assets/theme';
import { useEffect, useState } from 'react';
import { getUserId } from '@/database/authHooks';
import { useRouter } from 'expo-router';
import { isFollowing, handleFollow, handleUnfollow } from '@/database/followHooks';

type FollowButtonProps = {
  // User ID of the profile being viewed
  pageUserId: string;
};

export default function FollowButton({ pageUserId }: FollowButtonProps) {
  const authdUserId = getUserId();

  // if the user is not logged in, tell them to login to follow
  if (!authdUserId) {
    const router = useRouter();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Please log in to RSVP');
            router.push('/login');
          }}
        >
          <View style={{ ...styles.button, backgroundColor: theme.colors.primary }}>
            <ThemedText style={styles.text}>Log in to RSVP</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const [isFollow, setIsFollow] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    isFollowing(authdUserId, pageUserId)
      .then((status) => {
        setIsFollow(status);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error checking follow status:', err);
        setError('Failed to check follow status');
        setLoading(false);
      });
  }, [authdUserId, pageUserId]);

  const handlePress = async () => {
    if (isFollow === null || error) {
      Alert.alert('There was an error checking follow status.');
      return;
    }
    setLoading(true);
    try {
      if (!isFollow) {
        await handleFollow(authdUserId, pageUserId);
      } else {
        await handleUnfollow(authdUserId, pageUserId);
      }
      // Re-fetch and confirm the follow status
      const updatedStatus = await isFollowing(authdUserId, pageUserId);
      setIsFollow(updatedStatus);
    } catch (err) {
      Alert.alert('Failed to update follow status.');
    } finally {
      setLoading(false);
    }
  };

  const buttonText = isFollow ? 'Unfollow' : 'Follow';
  const buttonColor = isFollow ? 'grey' : theme.colors.primary;

  // Return loading state while checking RSVP status
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="small" color={theme.colors.primary} />}
      <TouchableOpacity onPress={handlePress} disabled={loading}>
        <View style={{ ...styles.button, backgroundColor: buttonColor }}>
          <ThemedText style={styles.text}>{buttonText}</ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
