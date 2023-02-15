import React, { useEffect } from 'react';
import { getSavedAppliedStatistics } from '../../../utils/getSavedAppliedStatistics';

const RoleStatusStatistics = () => {
  useEffect(() => {
    getSavedAppliedStatistics()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>Hello</div>;
};

export default RoleStatusStatistics;
