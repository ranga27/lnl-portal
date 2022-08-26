import React, { Fragment } from 'react';
import classnames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import * as HIcons from '@heroicons/react/outline';

const DynamicHeroIcon = (props) => {
  const { ...icons } = HIcons;
  const TheIcon = icons[props.icon];

  return (
    <>
      <TheIcon className={props.style} aria-hidden='true' />
    </>
  );
};

export default DynamicHeroIcon;

export const Modal = ({
  cancelButton,
  confirmButton,
  isOpen,
  setOpen,
  title,
  iconType,
  iconStyle,
  iconBG,
  Content,
  modalSize,
  showIcon,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={setOpen}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-y-auto max-h-96 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-${modalSize} sm:w-full sm:p-6`}
            >
              <div className='my-4 hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
                <button
                  type='button'
                  className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
                  onClick={() => setOpen(false)}
                >
                  <span className='sr-only'>Close</span>
                  <XIcon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
              <div className='my-4 sm:flex sm:items-start'>
                {showIcon && (
                  <div
                    className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${iconBG} sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    <DynamicHeroIcon icon={iconType} style={iconStyle} />
                  </div>
                )}
                <div
                  className={classnames(
                    'mt-3 text-center sm:mt-0 sm:text-left',
                    {
                      'sm:ml-6': showIcon,
                    }
                  )}
                >
                  <Dialog.Title
                    as='h3'
                    className='text-2xl border-b pb-3 leading-6 font-medium text-[#F7B919]'
                  >
                    {title}
                  </Dialog.Title>
                  <div className='mt-2'>
                    <Content />
                  </div>
                </div>
              </div>

              <div className='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md'>
                {cancelButton && (
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:mt-0 sm:w-auto sm:text-sm'
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                )}

                {confirmButton && (
                  <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#F7B919] text-base font-medium text-white hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setOpen(false)}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
