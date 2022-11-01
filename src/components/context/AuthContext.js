import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase/clientApp';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserSubscription } from '../../utils/stripe/getUserSubscription';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    userProviderId: '',
    userId: '',
    userEmail: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSubscription = await getUserSubscription();

        const requiredData = {
          userProviderId: user.providerData[0].providerId,
          userId: user.uid,
          userEmail: user.email,
          userSubscription,
        };
        setUserData(requiredData);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className='loading'></div>;
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
