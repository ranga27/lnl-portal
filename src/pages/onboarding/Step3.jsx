import React from 'react';
import Button from '../../components/UI/Form/Button';
import IntlMessages from '../../utils/IntlMessages';
import { CheckIcon } from '@heroicons/react/solid';
import { pricing } from '../../components/data/pricing';

export default function Step3(props) {
  const handlePayment = (data) => {
    console.log(data);
  };
  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='mb-6 text-3xl font-extrabold text-gray-900'>
        <IntlMessages id='onboarding.paymentHeader' />
      </h2>
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl'>
          <div className='space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4'>
            {pricing.map((data) => (
              <div
                key={data.name}
                className='divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm'
              >
                <div className='p-6'>
                  <h2 className='text-lg font-medium leading-6 text-gray-900'>
                    {data.name}
                  </h2>

                  <p className='mt-3'>
                    <span className='text-2xl font-bold tracking-tight text-gray-900'>
                      £{data.priceMonthly}
                    </span>{' '}
                    <span className='text-base font-medium text-gray-500'>
                      /month
                    </span>
                  </p>
                  {data.priceYearly ? (
                    <p className='mt-1'>
                      <span className='text-2xl font-bold tracking-tight text-gray-900'>
                        £{data.priceYearly}
                      </span>{' '}
                      <span className='text-base font-medium text-gray-500'>
                        /annum
                      </span>
                    </p>
                  ) : (
                    <div className='py-4 mt-1'> </div>
                  )}

                  <button
                    onClick={() => {
                      handlePayment(data);
                    }}
                    className='mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900'
                  >
                    Buy {data.name}
                  </button>
                </div>
                <div className='px-6 pt-6 pb-8'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    What's included
                  </h3>
                  <ul role='list' className='mt-6 space-y-4'>
                    {data.includedFeatures.map((feature) => (
                      <li key={feature} className='flex space-x-3'>
                        <CheckIcon
                          className='h-5 w-5 flex-shrink-0 text-green-500'
                          aria-hidden='true'
                        />
                        <span className='text-sm text-gray-500'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
