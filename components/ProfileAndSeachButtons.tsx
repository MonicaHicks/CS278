import { View, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '@/assets/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getUserId } from '@/database/authHooks';

export default function ProfileAndSearchButtons() {
  const userId = getUserId();
  if (!userId) {
    return null; // or handle the case when userId is not available
  }

  const router = useRouter();

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          // Navigate to profile screen
          router.push(`/profile/${userId}`);
        }}
      >
        <Ionicons name="person-circle" size={40} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconSearch}
        onPress={() => {
          // Navigate to search screen
          router.push('/(tabs)/search');
        }}
      >
        <Ionicons name="search" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    right: 10,
    alignItems: 'center',
  },
  icon: {
    zIndex: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    right: 15,
  },
  iconSearch: {
    zIndex: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 17,
    height: 32,
  },
});
