import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBC-yhtBPsGuPXhgq-e8TRMlzO8tFxcxUk",
  authDomain: "nextstep-ai-1100.firebaseapp.com",
  projectId: "nextstep-ai-1100",
  storageBucket: "nextstep-ai-1100.firebasestorage.app",
  messagingSenderId: "641406914958",
  appId: "1:641406914958:web:9dcc819082285b295114df",
  measurementId: "G-EG46LVZHFR"
};

const app = initializeApp(firebaseConfig);

// ✅ FIX HERE
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };