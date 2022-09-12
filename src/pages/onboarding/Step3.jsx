import React from 'react';
import Button from '../../components/UI/Form/Button';
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
      <div className='my-12 flex flex-row space-x-6'>
        <Button
          onClick={() => props.previousStep()}
          text={'onboarding.backVariant2'}
          type='button'
          width='w-full'
          color='text-black'
          bg='bg-gray-100'
        />
        <Button
          onClick={() => {
            props.nextStep(), window.scrollTo(0, 0);
          }}
          text={'onboarding.nextVariant3'}
          type='submit'
          width='w-full'
          color='text-white'
          bg='bg-gray-900'
        />
      </div>{' '}
    </div>
  );
}
