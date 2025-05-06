import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🏠 Home / Navigation Test</Text>

      <View style={styles.buttonGroup}>
        <Text style={styles.label}>🔐 Authentication</Text>
        <Button title="Login / Signup" color="#e63946" onPress={() => router.push("/login")} />
      </View>

      <View style={styles.buttonGroup}>
        <Text style={styles.label}>👤 User Screens</Text>
        <Button title="User Profile" color="#e63946" onPress={() => router.push("/profile")} />
      </View>

      <View style={styles.buttonGroup}>
        <Text style={styles.label}>🏢 Club / Business Screens</Text>
        <Button title="Club Page" color="#e63946" onPress={() => router.push("/club")} />
        <Button title="Create Event Page" color="#e63946" onPress={() => router.push("/create-event")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 24,
    gap: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  buttonGroup: {
    gap: 8,
  },
  label: {
    fontWeight: "500",
    marginBottom: 4,
  },
});
