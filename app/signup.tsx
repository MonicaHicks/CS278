import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import theme from '@/assets/theme';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [screenName, setScreenName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const pickImage = async () => {
    console.log('pickImage');
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 0.5,
    // });
    // if (!result.canceled && result.assets.length > 0) {
    //   setProfilePhoto(result.assets[0].uri);
    // }
  };

  const handleSignup = async () => {
    if (!email || !password || !name || !screenName) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: profilePhoto || undefined,
        });
        // May want to save screenName and photo to Firestore here as well
        router.replace('/(tabs)/feed/feed');

        // Initializing user data in Firestore
        const userId = userCredential.user.uid;
        const userData = {
          displayName: screenName,
          events: [],
          followers: [],
          following: [],
          createdAt: new Date(),
          isClub: false,
        };
        // Save user data to Firestore
        await setDoc(doc(db, 'users', userId), userData);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      alert('Sign up failed. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Screen Name"
        value={screenName}
        onChangeText={setScreenName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
        <Text style={styles.photoButtonText}>
          {profilePhoto ? 'Change Profile Photo' : 'Pick Profile Photo'}
        </Text>
      </TouchableOpacity>
      {profilePhoto && <Image source={{ uri: profilePhoto }} style={styles.profileImage} />}
      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  photoButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  photoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: { color: '#007bff', marginTop: 16 },
});
