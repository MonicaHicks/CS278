import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

const {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessageSenderId,
  firebaseAppId,
  firebaseMeasurementId,
  firebaseDatabaseUrl,
} = Constants.expoConfig?.extra ?? {};

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  databaseURL: firebaseDatabaseUrl,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessageSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId,
};

console.log('Firebase Config', firebaseConfig);

const app = initializeApp(firebaseConfig);
// Don't do auth persistence on web
let auth;
if (Platform.OS === 'web') {
  auth = initializeAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}
export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
