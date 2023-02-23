import React, { useState } from 'react';
import CandidateApplication from './CandidateComponent/CandidateApplication';
import HearAboutUsGraph from './CandidateComponent/HearAboutUsGraph';
import SignupUserCount from './CandidateComponent/SignupUserCount';
import UnverifiedUserCount from './CandidateComponent/UnverifiedUserCount';

const CandidateStatistics = () => {
  const [totalSigneduser, setTotalSigneduser] = useState(0);

  return (
    <div>
      <h1>Candidate Statistics</h1>
      <div>
        <SignupUserCount setTotalSigneduser={setTotalSigneduser} />
        <UnverifiedUserCount totalSigneduser={totalSigneduser} />
        <HearAboutUsGraph />
        <CandidateApplication />
      </div>
    </div>
  );
};

export default CandidateStatistics;
