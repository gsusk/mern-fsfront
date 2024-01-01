import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "merstate-af0a8.firebaseapp.com",
  projectId: "merstate-af0a8",
  storageBucket: "merstate-af0a8.appspot.com",
  messagingSenderId: "167552237857",
  appId: "1:167552237857:web:c4849f992a48c47a8ebe60",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
