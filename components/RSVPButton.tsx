import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import theme from '../assets/theme';
import { ThemedText } from './ThemedText';
import { auth } from '@/firebaseConfig';
import { EventType } from './types';
import { isRSVPed, handleRSVP, handleUnRSVP } from '@/firestore';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RSVPButton({ item }: { item: EventType }) {
  const user = auth.currentUser;

  // if the user is not logged in, tell them to login to RSVP
  if (!user) {
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
  const [isRSVP, setIsRSVP] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    isRSVPed(user.uid, item.id!).then((status) => {
      setIsRSVP(status);
      setLoading(false);
    });
  }, [item.id, user.uid]);

  const handlePress = async () => {
    if (isRSVP === null || error) {
      Alert.alert('There was an error checking RSVP status.');
      return;
    }
    setLoading(true);
    try {
      if (!isRSVP) {
        await handleRSVP(user.uid, item.id!);
      } else {
        await handleUnRSVP(user.uid, item.id!);
      }
      // Re-fetch and confirm the RSVP status
      const updatedStatus = await isRSVPed(user.uid, item.id!);
      setIsRSVP(updatedStatus);
    } catch (err) {
      Alert.alert('Failed to update RSVP status.');
    } finally {
      setLoading(false);
    }
  };

  const buttonText = isRSVP ? 'Un-RSVP' : 'RSVP';
  const buttonColor = isRSVP ? 'grey' : theme.colors.primary;

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
    backgroundColor: theme.colors.primary,
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
