import React from 'react';
import Joyride from 'react-joyride';

function ProductTour({ JoyRideCustomConstant }) {
  return (
    <>
      <Joyride
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
