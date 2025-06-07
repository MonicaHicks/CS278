import 'dotenv/config';

export default {
  expo: {
    name: 'YourAppName',
    slug: 'your-app',
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessageSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
      firebaseAppId: process.env.APP_ID,
      firebaseMeasurementId: process.env.MEASUREMENT_ID,
      firebaseDatabaseUrl: process.env.DATABASE_URL,
    },
  },
};
