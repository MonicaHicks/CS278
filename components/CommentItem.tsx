// src/components/CommentItem.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Comment } from './types';

interface CommentItemProps {
  comment: Comment; // Define that the `comment` prop is of type `Comment`
}

// const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentContent}>{comment.content}</Text>
      <Text style={styles.commentTimestamp}>{comment.timestamp.toLocaleString()}</Text>
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
