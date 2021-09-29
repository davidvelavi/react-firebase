import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

const initialAuthenticationError = {
  typeError: '',
  errorCode: '',
  errorMessage: '',
};
const initialUserData = { name: '', email: '', photoURL: '', uid: '' };

const useAuthentication = (firebase) => {
  const [user, setUser] = useState(initialUserData);
  const [authenticationError, setAuthenticationError] = useState(initialAuthenticationError);

  /**
    * @description Generic factory error
    * @param {string} typeError - the type of the error
    * @param {object} error - the error that come from service
  */
  const buildErrorObject = (typeError) => {
    return (error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      setAuthenticationError({
        typeError,
        errorCode,
        errorMessage,
      });
    };
  };

  /**
    * @description Method which handle Auth state
    * @param {object} user - the user who sign in o sign out
  */
  const handleAuthState = (user) => {
    if (user) {
      const { displayName, email, photoURL, uid } = user;
      setUser({ name: displayName, email, photoURL, uid });
      setAuthenticationError(initialAuthenticationError);
    } else {
      setUser(initialUserData);
    }
  };

  /**
    * @description Method which is in charge to login with Google
  */
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .catch(buildErrorObject('loginWithGoogleError'));
  };

  /**
    * @description Method which end the session
  */
  const logOut = () => {
    const auth = getAuth();
    signOut(auth).catch(buildErrorObject('logoutError'));
  };

  useEffect(() => {
    const auth = getAuth(firebase);
    /**
      * @description Method which is listening the user state
      * @param {object} typeError - the type of the error
      * @param {function} error - the error that come from service
    */
    onAuthStateChanged(auth, handleAuthState);
  }, [firebase]);

  return {
    loginWithGoogle,
    user,
    authenticationError,
    logOut,
  };
};

export default useAuthentication;
