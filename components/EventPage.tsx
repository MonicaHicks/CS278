import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import theme from '../assets/theme';
import Comments from './Comment'; // Ensure the correct component is imported (Comment vs Comments)
import ParallaxScrollView from './ParallaxScrollView';
import RSVPButton from './RSVPButton';
import { ThemedText } from './ThemedText';
import { EventType } from './types';
import { useRouter } from 'expo-router';

export default function EventPage({ item }: { item: EventType }) {
  const router = useRouter();
  const formattedDate = item.dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = item.dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const eventID = item.id ? item.id : '';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FDF8F3', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={
            item.hostFlyer ? { uri: item.hostFlyer } : require('../assets/images/Sample_Flyer.png')
          }
          style={styles.flyer}
        />
      }
    >
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            router.push(`/profile/${item.hostId}`);
          }}
        >
          <View style={styles.hostInfo}>
            <Image
              source={
                item.hostImage
                  ? { uri: item.hostImage }
                  : require('../assets/images/Placeholder_Club.png')
              }
              style={theme.profilePic}
            />
            <ThemedText style={theme.typography.eventTitle}>{item.hostName}</ThemedText>
          </View>
        </TouchableOpacity>

        <ThemedText style={theme.typography.title}>{item.eventTitle}</ThemedText>

        <View style={styles.details}>
          <ThemedText style={theme.typography.subtitle}>{formattedTime}</ThemedText>
          <ThemedText style={theme.typography.subtitle}>{formattedDate}</ThemedText>
          <ThemedText style={theme.typography.subtitle}>Location: {item.location}</ThemedText>
        </View>

        <RSVPButton item={item} />

        {/* Pass eventComments to the Comments component */}
        <Comments eventID={eventID} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  flyer: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  details: {
    alignItems: 'center',
    gap: 6,
  },
});
