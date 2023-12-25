import { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   Observer to watch the auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      console.log("current user is:", user);
    });
    return () => {
      unsubscribe();
    };
  });

  //   Register
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Login with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update
  const update = (metadata) => {
    setLoading(true);
    return updateProfile(auth.currentUser, metadata);
  };

  // login with google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const authInfo = {
    user,
    loading,
    register,
    login,
    logout,
    update,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
