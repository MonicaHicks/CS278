import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import theme from '../assets/theme';
import { useState } from 'react';

type FollowButtonProps = { isFollowing: boolean };

export default function FollowButton({ isFollowing }: FollowButtonProps) {
  const [following, setIsFollowing] = useState(isFollowing);
  let buttonText = following ? 'Unfollow' : 'Follow';
  let buttonColor = following ? 'grey' : theme.colors.primary;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          // Handle follow action
          console.log('Follow button pressed');
          setIsFollowing(!following);
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
