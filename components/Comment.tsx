import { addComment, fetchComments } from '@/firestore'; // import the necessary Firestore functions
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import theme from '../assets/theme';
import CommentItem from './CommentItem';
import ParallaxScrollView from './ParallaxScrollView';
import RSVPButton from './RSVPButton';
import { ThemedText } from './ThemedText';
import { Comment, EventType } from './types';

export default function EventPage({ item }: { item: EventType }) {
  const [eventComments, setEventComments] = useState<Comment[]>([]); // Manage comments state
  const [newComment, setNewComment] = useState<string>(''); // Manage new comment input

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

  // Fetch comments for the event when the component mounts
  useEffect(() => {
    const loadComments = async () => {
      if (item.id !== null && item.id !== undefined) {
        const comments = await fetchComments(item.id);
        setEventComments(comments);
      }
    };
    loadComments();
  }, [item.id]); // Depend on item.id

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // Don't submit empty comments

    if (!item.id) {
      return;
    }

    const userId = 'currentUserId'; // Replace this with actual user ID logic
    const eventId = item.id;

    // Add comment to Firestore
    const success = await addComment(userId, eventId, newComment);

    if (success) {
      // Refresh comments after adding the new comment
      const updatedComments = await fetchComments(eventId);
      setEventComments(updatedComments);
      setNewComment(''); // Clear the comment input field
    }
  };

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
        <Text>Monica</Text>
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

        {/* Comment Section */}
        <View style={styles.commentSection}>
          <ThemedText style={theme.typography.subtitle}>Comments</ThemedText>
          {eventComments.length === 0 ? (
            <ThemedText style={theme.typography.caption}>No comments yet.</ThemedText>
          ) : (
            eventComments.map((comment) => <CommentItem comment={comment} key={comment.id} />)
          )}
          <Text> Monica </Text>
          {/* Comment input and submit */}
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleCommentSubmit}>Post Comment</TouchableOpacity>
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
  commentInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});
