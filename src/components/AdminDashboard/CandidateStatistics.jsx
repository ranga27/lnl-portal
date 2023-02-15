import React, { useState } from 'react';
import HearAboutUsGraph from './CandidateComponent/HearAboutUsGraph';
import SignupUserCount from './CandidateComponent/SignupUserCount';
import TalentPartners from './CandidateComponent/TalentPartners';
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
        <TalentPartners />
      </div>
    </div>
  );
};

export default CandidateStatistics;
