// src/components/CommentItem.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Comment } from './types';

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime(); // Difference in milliseconds

  const minutes = Math.floor(diff / 60000); // Convert milliseconds to minutes
  const hours = Math.floor(diff / 3600000); // Convert milliseconds to hours
  const days = Math.floor(diff / 86400000); // Convert milliseconds to days
  const weeks = Math.floor(diff / 604800000); // Convert milliseconds to weeks

  if (weeks >= 1) {
    // More than a week ago
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } else if (days >= 1) {
    // Less than a week but more than a day
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours >= 1) {
    // Less than a day but more than an hour
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes >= 1) {
    // Less than an hour but more than a minute
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    // Less than a minute ago
    return 'now';
  }
}
// const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
export default function CommentItem({ comment }: { comment: Comment }) {
  // @ts-ignore
  const timestamp = comment.timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
  const formattedTimestamp = formatTimestamp(timestamp); // Format the timestamp

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentContent}>{comment.content}</Text>
      <Text style={styles.commentTimestamp}>{formattedTimestamp}</Text>
      {/* You can display other comment info like user, likes, etc. */}
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    marginBottom: 12,
  },
  commentContent: {
    fontSize: 16,
    marginBottom: 4,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#888',
  },
});
