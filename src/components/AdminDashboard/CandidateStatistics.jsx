import React, { useState } from 'react';
import SignupUserCount from './CandidateComponent/SignupUserCount';
import UnverifiedUserCount from './CandidateComponent/UnverifiedUserCount';

const CandidateStatistics = () => {
  const [totalSigneduser, setTotalSigneduser] = useState(0);

  console.log(totalSigneduser, 'In Statuistyia');

  return (
    <div>
      <h1>Candidate Statistics</h1>
      <div>
        <SignupUserCount setTotalSigneduser={setTotalSigneduser} />
        <UnverifiedUserCount />
      </div>
    </div>
  );
};

export default CandidateStatistics;
