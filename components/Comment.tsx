import theme from '@/assets/theme';
import { addComment, fetchComments } from '@/database/commentHooks';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CommentItem from './CommentItem';
import { ThemedText } from './ThemedText';
import { Comment } from './types';

type CommentsProps = {
  eventID: string; // Accept eventID as a prop
};

export default function Comments({ eventID }: CommentsProps) {
  const [eventComments, setEventComments] = useState<Comment[]>([]); // Manage comments state
  const [newComment, setNewComment] = useState<string>(''); // Manage new comment input

  // Fetch comments for the event when the component mounts
  useEffect(() => {
    const loadComments = async () => {
      if (eventID) {
        const comments = await fetchComments(eventID); // Fetch comments from Firestore using eventID
        setEventComments(comments);
      }
    };
    loadComments();
  }, [eventID]); // Depend on eventID

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // Don't submit empty comments

    const userId = 'currentUserId'; // Replace with actual user ID logic

    // Add comment to Firestore (you may need to implement addComment if it's not already in place)
    const success = await addComment(userId, eventID, newComment);

    if (success) {
      // Refresh comments after adding the new comment
      const updatedComments = await fetchComments(eventID);
      setEventComments(updatedComments);
      setNewComment(''); // Clear the comment input field
    }
  };

  return (
    <View style={styles.commentSection}>
      <ThemedText style={styles.title}>Comments</ThemedText>
      {eventComments.length === 0 ? (
        <ThemedText style={styles.caption}>No comments yet.</ThemedText>
      ) : (
        eventComments.map((comment) => <CommentItem comment={comment} key={comment.id} />)
      )}

      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />

      <TouchableOpacity onPress={handleCommentSubmit} style={styles.commentButton}>
        <Text style={styles.commentButtonText}>Post Comment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: '#444',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    color: '#888',
  },
  commentButton: {
    backgroundColor: theme.colors.primary, // Primary color for the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Full width to match the input field
    marginTop: 8,
  },
  commentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
