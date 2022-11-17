import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';

const tabs = [
  { id: '01', tab: 'tab1', name: 'Role details', current: true },
  { id: '02', tab: 'tab2', name: 'Hiring manager', current: false },
  { id: '03', tab: 'tab3', name: 'Additional Information', current: false },
  { id: '04', tab: 'tab4', name: 'Custom Questions', current: false },
];

export default function Tabs({ activeTab, handleChangeTab }) {
  return (
    <nav aria-label='Progress'>
      <ol
        role='list'
        className='border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0'
      >
        {tabs.map((step, stepIdx) => (
          <li key={step.name} className='relative md:flex-1 md:flex'>
            {step.status === 'complete' ? (
              <button
                onClick={() => handleChangeTab(step.tab)}
                className='group flex items-center w-full'
              >
                <span className='px-6 py-4 flex items-center text-sm font-medium'>
                  <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#F7B919] rounded-full group-hover:bg-[#F7B919]'>
                    <CheckIcon
                      className='w-6 h-6 text-white'
                      aria-hidden='true'
                    />
                  </span>
                  <span className='ml-4 text-sm font-medium text-gray-900'>
                    {step.name}
                  </span>
                </span>
              </button>
            ) : step.tab === activeTab ? (
              <button
                onClick={() => handleChangeTab(step.tab)}
                className='px-6 py-4 flex items-center text-sm font-medium'
                aria-current='step'
              >
                <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-[#F7B919] rounded-full'>
                  <span className='text-[#F7B919]'>{step.id}</span>
                </span>
                <span className='ml-4 text-sm font-medium text-[#F7B919]'>
                  {step.name}
                </span>
              </button>
            ) : (
              <button
                onClick={() => handleChangeTab(step.tab)}
                className='group flex items-center'
              >
                <span className='px-6 py-4 flex items-center text-sm font-medium'>
                  <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400'>
                    <span className='text-gray-500 group-hover:text-gray-900'>
                      {step.id}
                    </span>
                  </span>
                  <span className='ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900'>
                    {step.name}
                  </span>
                </span>
              </button>
            )}

            {stepIdx !== tabs.length - 1 ? (
              <>
                <div
                  className='hidden md:block absolute top-0 right-0 h-full w-5'
                  aria-hidden='true'
                >
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 22 80'
                    fill='none'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M0 -2L20 40L0 82'
                      vectorEffect='non-scaling-stroke'
                      stroke='currentcolor'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
