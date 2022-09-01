import React from 'react';
import IntlMessages from '../../utils/IntlMessages';

export default function Step3(props) {
  return (
    <div className=''>
      <h2 className='mt-6 py-8 text-3xl font-extrabold text-gray-900'>
        <IntlMessages id='onboarding.paymentHeader' />
      </h2>
      <iframe
        src='https://firebasestorage.googleapis.com/v0/b/loop-luck.appspot.com/o/coverLetters%2FLNL%20Pricing%202022%20(1).pdf?alt=media&token=cb3e8bf5-7765-4ea9-955c-34d2dc8e4cfd'
        title='LNLPricing'
        height={'500px'}
        width='100%'
      />
      <p className='py-6'>Stripe integration coming soon</p>
      <div className='flex flex-row space-x-6'>
        <button
          className='w-full rounded-md bg-[#F7B919] font-medium text-white my-8  p-2'
          type='button'
          onClick={() => props.previousStep()}
        >
          <IntlMessages id='onboarding.backVariant2' />
        </button>
        <button
          className='w-full rounded-md bg-[#F7B919] font-medium text-white my-8  p-2'
          type='submit'
          onClick={() => {
            props.nextStep(), window.scrollTo(0, 0);
          }}
        >
          <IntlMessages id='onboarding.nextVariant3' />
        </button>
      </div>{' '}
    </div>
  );
}
