import React, { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { firestore } from '../../../../firebase/clientApp';
import { getHearAboutusdata } from '../../../utils/getHearAboutusData';

const HearAboutUsGraph = () => {
  const [userData, setUserdata] = useState([]);

  const getUsers = async () => {
    let userData = [];
    const coll = collection(firestore, 'users');
    const snapshot = await getDocs(coll);

    snapshot.forEach((user) => {
      userData.push(user.data());
    });

    setUserdata(userData);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (userData.length) getHearAboutusdata(userData);
  }, [userData]);

  return (
    <>
      <h1>Hear About Graph (Comming Soon)</h1>
    </>
  );
};

export default HearAboutUsGraph;
