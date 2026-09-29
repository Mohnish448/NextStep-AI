import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// your firebase API key and address
const firebaseConfig = {
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
