import React, { useState, useContext, useEffect } from 'react';
import CandidateStatistics from '../components/AdminDashboard/CandidateStatistics';
import AdminSidebar from '../components/layout/AdminSidebar';
import ProductStatistics from '../components/AdminDashboard/ProductStatistics';
import { AuthContext } from '../components/context/AuthContext';
import { fetchUserProfileDataFromFirestore } from '../../firebase/firestoreService';
import { useRouter } from 'next/router';

const admin = () => {
  const [user, setUser] = useState('');
  const router = useRouter();
  const {
    userData: { userId },
  } = useContext(AuthContext);

  useEffect(() => {
    fetchUserProfileDataFromFirestore(userId).then((results) => {
      setUser(results);
    });
  }, [userId]);

  const [tab, setTab] = useState('candidate');
  if (user.role === 'admin') {
    return (
      <div>
        <div className='flex w-100'>
          <AdminSidebar setTab={setTab} />
          <div className='w-[85%] h-fit'>
            <nav className='w-full h-fit border-y-2'>
              <h1 className='p-5 text-xl'>Admin Dashboard</h1>
            </nav>
            <div className='p-5 h-[88vh] overflow-auto'>
              {tab === 'candidate' ? (
                <CandidateStatistics />
              ) : (
                <ProductStatistics />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (user.role === 'company') {
    router.push('/dashboard');
  } else {
    return <div className='loading'></div>;
  }
};

export default admin;
