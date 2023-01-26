import React from 'react';
import Joyride from 'react-joyride';
import { updateUserTourInFirestore } from '../../firebase/firestoreService';

function ProductTour({ JoyRideCustomConstant, userId }) {
  const handleJoyrideCallback = async (data) => {
    const { status, type } = data;
    if (type === 'tour:end' || status === 'finished' || status === 'skipped') {
      await updateUserTourInFirestore(userId);
    }
  };

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        run={true}
        disableCloseOnEsc={true}
        steps={JoyRideCustomConstant}
        showSkipButton
        howProgress
        continuous
        spotlightClicks
      />
    </>
  );
}

export default ProductTour;
