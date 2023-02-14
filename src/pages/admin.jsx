import React from 'react';
import CandidateStatistics from '../components/AdminDashboard/CandidateStatistics';
import AdminSidebar from '../components/layout/AdminSidebar';

const admin = () => {
  return (
    <div>
      <div className='flex w-100'>
        <AdminSidebar />
        <div className='w-[85%] h-fit'>
          <nav className='w-full h-fit border-y-2'>
            <h1 className='p-5 text-xl'>Admin Dashboard</h1>
          </nav>
          <div className='p-5 h-[88vh] overflow-auto'>
            <CandidateStatistics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default admin;
