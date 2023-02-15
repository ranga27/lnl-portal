import React, { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { firestore } from '../../../../firebase/clientApp';
import {
  getHearAboutusdata,
  getIntroOfPage,
} from '../../../utils/getHearAboutusData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='p-2 px-5 border-0 bg-[#F7B919] first:outline-none'>
        <p>{`${getIntroOfPage(label)} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const HearAboutUsGraph = () => {
  const [userData, setUserdata] = useState([]);
  const [graphData, setGraphData] = useState([]);

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
    if (userData.length) {
      const data = getHearAboutusdata(userData);
      data.map((item) => {
        if (item.name.length > 3) {
          item.name = `${item.name.slice(0, 3)}...`;
        }
      });
      setGraphData(data);
    }
  }, [userData]);

  if (userData.length <= 0) return <div className='loader'></div>;

  return (
    <div className='mt-16'>
      <h1 className='text-center pb-2 font-bold'>Hear About us Statistics</h1>
      <BarChart
        width={1000}
        height={350}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey='count' barSize={30} fill='#1F2937' />
      </BarChart>
    </div>
  );
};

export default HearAboutUsGraph;
