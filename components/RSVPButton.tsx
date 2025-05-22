import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import theme from '../assets/theme';
import { ThemedText } from './ThemedText';
import { auth } from '@/firebaseConfig';
import { EventType } from './types';
import { isRSVPed, handleRSVP, handleUnRSVP } from '@/firestore';
import { useState, useEffect } from 'react';
import { set } from 'date-fns';

export default function RSVPButton({ item }: { item: EventType }) {
  const user = auth.currentUser!; // Guarantee that user is not null
  const [isRSVP, setIsRSVP] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle the "isRSVPed" promise
  useEffect(() => {
    const checkRSVP = async () => {
      try {
        const rsvpStatus = await isRSVPed(item.id!, user.uid);
        setIsRSVP(rsvpStatus);
      } catch (err) {
        console.error('Error checking RSVP status:', err);
        setError('Failed to check RSVP status');
      } finally {
        setLoading(false);
      }
    };
    checkRSVP();
  }, [item.id, user.uid]);

  let buttonText = isRSVP ? 'Un-RSVP' : 'RSVP';
  let buttonColor = isRSVP ? 'grey' : theme.colors.primary;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="small" color={theme.colors.primary} />}
      <TouchableOpacity
        onPress={() => {
          if (isRSVP === null || error) {
            Alert.alert('There was an error checking RSVP status.');
            return;
          } else if (!isRSVP) {
            handleRSVP(user.uid, item.id!);
          } else if (isRSVP) {
            handleUnRSVP(user.uid, item.id!);
          } else {
            return;
          }
          setIsRSVP(!isRSVP);
        }}
      >
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
