// components/Comment.tsx
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../assets/theme";
import { Comment } from "./types";

export default function CommentItem({ comment }: { comment: Comment }) {
  const timeAgo = formatDistanceToNow(comment.timestamp, { addSuffix: true });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Placeholder_User.png")}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={theme.typography.subtitle}>{comment.userId}</Text>
          <Text style={styles.timestamp}>{timeAgo}</Text>
        </View>
        <Text style={theme.typography.body}>{comment.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ccc",
  },
  textContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
});
