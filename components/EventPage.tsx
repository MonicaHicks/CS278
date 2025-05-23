// components/EventPage.tsx
import { fetchComments } from '@/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import theme from '../assets/theme';
import CommentItem from './Comment';
import ParallaxScrollView from './ParallaxScrollView';
import RSVPButton from './RSVPButton';
import { ThemedText } from './ThemedText';
import { Comment, EventType } from './types';

export default function EventPage({ item }: { item: EventType }) {
  const [eventComments, setEventComments] = useState<Comment[]>([]); // Manage comments state

  useEffect(() => {
    const loadComments = async () => {
      if (item.id !== null && item.id !== undefined) {
        // Check that item.id is valid
        const comments = await fetchComments(item.id); // Fetch comments from Firestore
        setEventComments(comments);
      }
    };
    loadComments();
  }, [item.id]); // Depend on item.id

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

        <ThemedText style={theme.typography.title}>{item.eventTitle}</ThemedText>

        <View style={styles.details}>
          <ThemedText style={theme.typography.subtitle}>{formattedTime}</ThemedText>
          <ThemedText style={theme.typography.subtitle}>{formattedDate}</ThemedText>
          <ThemedText style={theme.typography.subtitle}>Location: {item.location}</ThemedText>
        </View>

        <RSVPButton item={item} />
        <View style={styles.commentSection}>
          <ThemedText style={theme.typography.subtitle}>Comments</ThemedText>
          {eventComments.length === 0 ? (
            <ThemedText style={theme.typography.caption}>No comments yet.</ThemedText>
          ) : (
            eventComments.map((comment) => <CommentItem comment={comment} key={comment.id} />)
          )}
        </View>
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
  commentSection: {
    marginTop: 24,
    gap: 12,
  },
});
