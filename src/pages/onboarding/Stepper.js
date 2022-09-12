import React, { useEffect } from 'react';
import IntlMessages from '../../utils/IntlMessages';

function Stepper(props) {
  useEffect(() => {
    const stepperItems = document.querySelectorAll('.stepper-item');
    stepperItems.forEach((step, i) => {
      if (i + 1 <= props.currentStep) {
        step.classList.add('bg-[#F7B919]', 'text-black');
      } else {
        step.classList.remove('bg-[#F7B919]', 'text-black');
      }
    });

    const stepperItems2 = document.querySelectorAll('.stepper-text');
    stepperItems2.forEach((step, i) => {
      if (i + 1 <= props.currentStep) {
        step.classList.add('bg-white', 'text-black');
      } else {
        step.classList.remove('bg-white', 'text-black');
      }
    });
  }, [props.currentStep]);
  return (
    <div className='w-full mx-auto'>
      <div className='w-full flex flex-row items-center justify-center px-4 py-16'>
        <div className='flex flex-col  px-12'>
          <span className='stepper-item w-8 h-8 font-medium border-2 rounded-full flex self-center items-center justify-center'>
            1
          </span>
          <br />
          <p className='stepper-text'>
            <IntlMessages id='onboarding.stepper1' />
          </p>
        </div>
        <div className='flex-auto border-t-2 border-gray-300 pb-10'></div>
        <div className='flex flex-col  px-12'>
          <span className='stepper-item w-8 h-8 font-medium border-2 rounded-full flex self-center items-center justify-center'>
            2
          </span>
          <br />
          <p className='stepper-text'>
            <IntlMessages id='onboarding.stepper2' />
          </p>
        </div>
        <div className='flex-auto border-t-2 border-gray-300 pb-10'></div>
        <div className='flex flex-col px-12'>
          <span className='stepper-item w-8 h-8 font-medium border-2 rounded-full flex self-center items-center justify-center'>
            3
          </span>
          <br />
          <p className='stepper-text'>
            <IntlMessages id='onboarding.stepper3' />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
