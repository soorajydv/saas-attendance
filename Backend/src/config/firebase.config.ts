import admin from 'firebase-admin';
import path from 'path';

// Initialize the Firebase Admin SDK
export const firebaseConfig = () => {
  // Import the service account JSON file
  const serviceAccount = require(
    path.resolve(__dirname, '../../firebase-service-account-key.json')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};
