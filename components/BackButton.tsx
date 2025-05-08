import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import theme from '@/assets/theme';

export default function BackButton() {
  const router = useRouter();
  // Set the back button to be visible if the user can go back
  const [isVisible, setIsVisible] = useState(router.canGoBack());

  return (
    <View style={styles.iconContainer}>
      {isVisible ? (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            // Navigate to the previous screen
            router.back();
            setIsVisible(router.canGoBack());
          }}
        >
          <Ionicons name="arrow-back" size={40} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    left: 10,
    alignItems: 'center',
  },
  icon: {
    zIndex: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    left: 15,
  },
});
