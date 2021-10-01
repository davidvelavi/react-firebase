import React, { useContext, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import AppContext from './ContextProvider';
import useAuthentication from '../hooks/useAuthentication';
import Header from '../components/Header';
import TypingText from '../components/TypingText';

const App = () => {
  const firebase = initializeApp(firebaseConfig);
  //const { dispatch } = useContext(AppContext);
  const { loginWithGoogle, logOut, user, authenticationError } = useAuthentication(firebase);

  const handleLogin = () => {
    loginWithGoogle();
  };

  const handleLogout = () => {
    logOut();
  };

  return (
    <div>
      <TypingText
        staticText='I am '
        dynamicText='Welcome'
      />
      {' '}
      <Header user={user} />
      <button onClick={handleLogin} type='button'> login </button>
      <button onClick={handleLogout} type='button'> logout </button>
    </div>
  );
};

export default App;
