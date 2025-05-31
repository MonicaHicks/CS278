// Keep ONLY this:
import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  friend: {
    id: string;
    name: string;
    displayName: string;
    image?: string;
  };
  isInvited: boolean;
  onInvite: () => void;
};

export default function FriendInviteTile({ friend, isInvited, onInvite }: Props) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isInvited) {
      scale.value = withTiming(1, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [isInvited]);

  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable style={styles.friend} onPress={onInvite} disabled={isInvited}>
      <View style={styles.avatarWrapper}>
        {friend.image ? (
          <Image source={{ uri: friend.image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.initials}>{friend.displayName?.charAt(0) || '?'}</Text>
          </View>
        )}
        {isInvited && <Animated.Text style={[styles.check, animatedCheckStyle]}>✅</Animated.Text>}
      </View>
      <Text style={styles.name}>{friend.displayName || friend.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  friend: {
    width: '30%',
    margin: 6,
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarFallback: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 20,
    color: '#333',
  },
  check: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    fontSize: 18,
  },
  name: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
  },
});
