import { useContext, useEffect, useState } from 'react';
import Button from '../../components/UI/Form/Button';
import IntlMessages from '../../utils/IntlMessages';
import { CheckIcon } from '@heroicons/react/solid';
import { pricing } from '../../components/data/pricing'; // ! For now using static pricing plans data
import { createCheckoutSession } from '../../utils/stripe/createCheckoutSession';
import { AuthContext } from '../../components/context/AuthContext';
// import useFetchPricing from '../../components/hooks/useFetchPricing';

export default function Step3(props) {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const [selectedInterval, setSelectedInterval] = useState('Monthly');

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const selectedIntervalStyle =
    'block w-full rounded-md border border-gray-800 bg-gray-800 p-2 text-center text-sm font-semibold text-white hover:bg-gray-900';
  const unselectedIntervalStyle =
    'block w-full rounded-md border border-gray-800 p-2 text-center text-sm font-semibold hover:bg-gray-100';

  // const { data: pricing, isLoading, error } = useFetchPricing(); //TODO: Solve this fetching error in hook

  const handlePayment = async (priceId) => {
    setIsCheckoutLoading(true);
    await createCheckoutSession(userId, priceId);
  };

  // if (isLoading) {
  //   return <div className='loading' />;
  // }

  // if (error) {
  //   return <h1>{error}</h1>;
  // }

  if (isCheckoutLoading) {
    return <div className='loading' />;
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-6 flex justify-between items-center'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          <IntlMessages id='onboarding.paymentHeader' />
        </h2>
        <div className='flex justify-between items-center'>
          <h4
            onClick={() => setSelectedInterval('Monthly')}
            className={`${
              selectedInterval === 'Monthly'
                ? selectedIntervalStyle
                : unselectedIntervalStyle
            } cursor-pointer mr-3`}
          >
            Monthly
          </h4>
          <h4
            onClick={() => setSelectedInterval('Yearly')}
            className={`${
              selectedInterval === 'Yearly'
                ? selectedIntervalStyle
                : unselectedIntervalStyle
            } cursor-pointer`}
          >
            Yearly
          </h4>
        </div>
      </div>
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl'>
          <div className='space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4'>
            {pricing.map((pricing) =>
              selectedInterval === 'Yearly' && !pricing.prices.yearlyPrice ? (
                <div key={pricing.productId}></div>
              ) : (
                <Package
                  key={pricing.productId}
                  pricing={pricing}
                  selectedInterval={selectedInterval}
                  handlePayment={handlePayment}
                  isCheckoutLoading={isCheckoutLoading}
                />
              )
            )}
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
      </div>
    </div>
  );
}

function Package({
  pricing,
  handlePayment,
  selectedInterval,
  isCheckoutLoading,
}) {
  const { productId, name, prices, description } = pricing;

  return (
    <div
      key={productId}
      className='divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm'
    >
      <div className='p-6'>
        <h2 className='text-lg font-medium leading-6 text-gray-900'>{name}</h2>
        {prices.monthlyPrice && selectedInterval === 'Monthly' && (
          <p className='mt-3'>
            <span className='text-2xl font-bold tracking-tight text-gray-900'>
              £{prices.monthlyPrice.unit_amount / 100}
            </span>{' '}
            <span className='text-base font-medium text-gray-500'>
              /{prices.monthlyPrice.interval}
            </span>
          </p>
        )}
        {prices.yearlyPrice && selectedInterval === 'Yearly' && (
          <p className='mt-3'>
            <span className='text-2xl font-bold tracking-tight text-gray-900'>
              £{prices.yearlyPrice.unit_amount / 100}
            </span>{' '}
            <span className='text-base font-medium text-gray-500'>
              /{prices.yearlyPrice.interval}
            </span>
          </p>
        )}
        <button
          disabled={isCheckoutLoading}
          onClick={() => {
            handlePayment(
              selectedInterval === 'Monthly'
                ? prices.monthlyPrice.priceId
                : prices.yearlyPrice.priceId
            );
          }}
          className='mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900'
        >
          Buy {name}
        </button>
      </div>
      <div className='px-6 pt-6 pb-8'>
        <h3 className='text-sm font-medium text-gray-900'>What's included</h3>
        <ul role='list' className='mt-6 space-y-4'>
          {description.split(', ')?.map((feature) => (
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
  );
}
