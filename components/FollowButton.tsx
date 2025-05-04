import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import theme from '../assets/theme';


type FollowButtonProps = { isFollowing: boolean };

export default function FollowButton({isFollowing}: FollowButtonProps) {
    let buttonText = isFollowing ? 'Unfollow' : 'Follow';
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    // Handle follow action
                    console.log('Follow button pressed');
                }}
            >
            <View style={styles.button}>
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
      alignItems: "center",
    },
    text: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });