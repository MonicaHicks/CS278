import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, Pressable } from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {
    if (isSignup) {
      setShowModal(true); // Ask if user or club/business
    } else {
      // Direct login → assume user → go to profile
      router.replace("/profile");
    }
  };

  const handleProfileChoice = (type: "user" | "club" | "business") => {
    setShowModal(false);
    if (type === "user") {
      router.replace("/profile");
    } else {
      router.replace("/club");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={isSignup ? "Create Account" : "Login"} onPress={handleSubmit} />
      <Pressable onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.switch}>
          {isSignup ? "Already have an account? Log in" : "New? Sign up"}
        </Text>
      </Pressable>

      {/* Modal only shows during signup */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Choose account type:</Text>
          <Button title="User" onPress={() => handleProfileChoice("user")} />
          <Button title="Club" onPress={() => handleProfileChoice("club")} />
          <Button title="Business" onPress={() => handleProfileChoice("business")} />
          <Button title="Cancel" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  switch: { textAlign: "center", color: "blue", marginTop: 10 },
  modalView: {
    margin: 50,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    gap: 10,
  },
  modalText: { marginBottom: 15, fontSize: 16 },
});
