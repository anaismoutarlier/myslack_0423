import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { firebaseConfig } from "./config";

const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAuth(getAuth(app));
    setDb(getFirestore(app));
  }, []);

  useEffect(() => {
    const updateUser = async (uid, user) => {
      if (!db) return;

      const userRef = doc(db, "users", uid);
      await setDoc(userRef, user, { merge: true });
    };

    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(data => {
        if (data) {
          const { displayName, photoURL, email, uid } = data;
          const newUser = {
            displayName,
            photoURL,
            email,
            lastLogged: new Date(),
          };
          updateUser(uid, newUser);
          setUser(newUser);
        } else setUser(null);
      });

      return () => unsubscribe();
    }
  }, [auth, db]);

  useEffect(() => {
    if (db) {
      const getMessages = handleSnapshot => {
        const q = query(collection(db, "messages"), orderBy("createdAt"));

        return onSnapshot(q, handleSnapshot);
      };

      const handleSnapshot = data => {
        const newMessages = data.docs.map(doc => ({ id: doc.id,  ...doc.data() }));
        setMessages(newMessages);
      };

      const unsubscribe = getMessages(handleSnapshot);

      return () => unsubscribe();
    }
  }, [db]);

  const login = async () => await signInWithPopup(auth, googleProvider);

  const logout = async () => await signOut(auth);

  const newMessage = async message => {
    if (!message || !db) return false;

    const newDoc = {
      message,
      author: user,
      createdAt: new Date(),
    };
    await addDoc(collection(db, "messages"), newDoc);
    return true;
  };

  return {
    user,
    auth: {
      login,
      logout,
    },
    firestore: {
      messages,
      newMessage,
    },
  };
};

export default useFirebase;
export { useFirebase };
