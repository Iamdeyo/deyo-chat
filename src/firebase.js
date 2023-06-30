// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXzzTL7lTI_qZMUhuWm379HuzUwSnpQr0',
  authDomain: 'deyo-chat.firebaseapp.com',
  projectId: 'deyo-chat',
  storageBucket: 'deyo-chat.appspot.com',
  messagingSenderId: '553296432456',
  appId: '1:553296432456:web:b8c41923e2faf029af377d',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
