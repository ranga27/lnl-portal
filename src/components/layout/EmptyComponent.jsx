import { PlusIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import IntlMessages from '../../utils/IntlMessages';

export default function EmptyComponent({
  title,
  subtitle,
  buttonText,
  buttonRequired,
}) {
  return (
    <div className='mt-48 text-center'>
      <svg
        className='mx-auto h-12 w-12 text-gray-400'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        aria-hidden='true'
      >
        <path
          vectorEffect='non-scaling-stroke'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
        />
      </svg>
      <h3 className='mt-2 text-sm font-medium text-gray-900'>
        {' '}
        <IntlMessages id={title} />
      </h3>
      <p className='mt-1 text-sm text-gray-500'>
        <IntlMessages id={subtitle} />
      </p>
      {buttonRequired && (
        <div className='mt-6'>
          <Link href='/roles/add'>
            <a
              className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-[#F7B919] hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
              id='add-roles'
            >
              <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
              <IntlMessages id={buttonText} />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
