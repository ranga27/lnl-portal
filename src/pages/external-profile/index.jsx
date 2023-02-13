/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';
import Link from 'next/link';
import { PencilIcon, StarIcon } from '@heroicons/react/solid';
import { AtSymbolIcon, GlobeAltIcon } from '@heroicons/react/outline';
import SideBar from '../../components/layout/Sidebar';
import AuthRoute from '../../components/context/authRoute';
import Footer from '../../components/layout/Footer';
import IntlMessages from '../../utils/IntlMessages';
import { AuthContext } from '../../components/context/AuthContext';
import useCollection from '../../components/hooks/useCollection';

export default function ExternalProfile() {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const { isLoading, data: company } = useCollection('companyV2', [
    'userId',
    '==',
    userId,
  ]);

  if (isLoading) {
    return <div className='loading' />;
  }

  const {
    companyName, // <- Aready have
    tagline,
    companyMission,
    numberOfEmployees,
    ratings,
    companyValues, // <- Aready have
    companyBenefits,
    commitmentToDiversity,
    diversityAnnouncement,
    interestingStats,
    linkedinUrl,
    twitterUrl,
    websiteUrl,
    careerPageUrl,
    logoUrl, // <- Aready have
  } = company[0] ?? {};

  // TODO:
  // View/Links to all roles at this company - Fetch roles posted and display it in a card/modal.
  // Header -Positions at this company
  // Content: Role description and role content

  return (
    <AuthRoute>
      <SideBar>
        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
          <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                <IntlMessages id='external-profile.title' />
              </h1>
            </div>
          </div>
          <div className='py-8 xl:py-10'>
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='md:flex md:items-center md:justify-between md:space-x-4 border-b xl:pb-6'>
                <div className='flex items-center'>
                  <img
                    className='w-20 h-20 rounded-full mx-auto mr-2'
                    src={logoUrl}
                    alt={`${companyName} logo`}
                  />
                  <div>
                    <h1 className='text-2xl font-bold text-gray-900'>
                      {companyName}
                    </h1>
                    {tagline && (
                      <span className='text-sm font-medium text-gray-500'>
                        {tagline}
                      </span>
                    )}
                    <div className='mt-2 flex items-center gap-2'>
                      {websiteUrl && (
                        <a
                          className='text-sm font-medium text-gray-500 flex items-center cursor-pointer'
                          href={websiteUrl}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <div className='text-xs text-gray-900 flex items-center bg-[#F7B919] px-2 py-0.5 rounded-md'>
                            Visit website{' '}
                            <GlobeAltIcon className='h-3 w-3 ml-1' />
                          </div>
                        </a>
                      )}
                      {careerPageUrl && (
                        <a
                          className='text-sm font-medium text-gray-500 flex items-center cursor-pointer'
                          href={careerPageUrl}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <div className='text-xs text-gray-900 flex items-center bg-[#F7B919] px-2 py-0.5 rounded-md'>
                            Career page{' '}
                            <AtSymbolIcon className='h-3 w-3 ml-1' />
                          </div>
                        </a>
                      )}
                      {linkedinUrl && (
                        <a href={linkedinUrl} target='_blank' rel='noreferrer'>
                          <svg
                            className='h-4 w-4 hover:text-[#F7B919]'
                            fill='currentColor'
                            viewBox='0 0 256 256'
                          >
                            <g>
                              <path
                                fillRule='evenodd'
                                d='M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055'
                                clipRule='evenodd'
                              ></path>
                            </g>
                          </svg>
                        </a>
                      )}
                      {twitterUrl && (
                        <a href={twitterUrl} target='_blank' rel='noreferrer'>
                          <svg
                            className='h-4 w-4 hover:text-[#F7B919]'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              fillRule='evenodd'
                              d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className='mt-4 flex space-x-3 md:mt-0'>
                  <Link
                    href={{
                      pathname: '/external-profile/edit',
                      query: {
                        ...company[0],
                        ratings: ratings
                          ? [...ratings?.map((o) => o.name)]
                          : [],
                      },
                    }}
                  >
                    <a className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-0 sm:ml-0'>
                      <PencilIcon
                        className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      <span>Edit</span>
                    </a>
                  </Link>
                </div>
              </div>

              <div className='border-b border-gray-200 py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  HIGHLIGHTS
                </dt>
                {ratings && (
                  <div className='flex gap-5'>
                    {ratings.map(
                      (elm) =>
                        elm.showRatings && (
                          <dd
                            key={elm.name}
                            className='text-sm font-medium bg-slate-100 rounded-md p-1 flex align-middle justify-center'
                          >
                            <StarIcon
                              className='mr-2 h-5 w-5 text-[#F7B919]'
                              aria-hidden='true'
                            />
                            {elm.rating} {elm.name}
                          </dd>
                        )
                    )}
                  </div>
                )}
                {numberOfEmployees && (
                  <>
                    <dt className='text-sm font-medium text-gray-500 mb-2 pt-4'>
                      NUMBER OF EMPLOYEES
                    </dt>
                    <div className='flex gap-5'>{numberOfEmployees}</div>
                  </>
                )}
              </div>

              {companyBenefits && (
                <div className='py-4'>
                  <dt className='text-sm font-medium text-gray-500 mb-2'>
                    COMPANY BENEFITS
                  </dt>
                  {companyBenefits?.map((item, index) => (
                    <p key={index} className='text-sm font-medium'>
                      - {item}
                    </p>
                  ))}
                </div>
              )}

              <div className='py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  COMPANY VALUES
                </dt>
                {companyValues?.map((item, index) => (
                  <p key={index} className='text-sm font-medium'>
                    - {item}
                  </p>
                ))}
              </div>

              {interestingStats && (
                <div className='py-4'>
                  <dt className='text-sm font-medium text-gray-500 mb-2'>
                    INTERESTING STATS
                  </dt>
                  {interestingStats?.map((item, index) => (
                    <p key={index} className='text-sm font-medium'>
                      - {item}
                    </p>
                  ))}
                </div>
              )}

              {commitmentToDiversity && (
                <div className='py-4'>
                  <dt className='text-sm font-medium text-gray-500 mb-2'>
                    COMMITMENT TO DIVERSITY
                  </dt>
                  <div className=''>
                    <dd className='text-sm font-medium'>
                      {commitmentToDiversity}
                    </dd>
                  </div>
                </div>
              )}

              {diversityAnnouncement && (
                <div className='py-4'>
                  <dt className='text-sm font-medium text-gray-500 mb-2'>
                    DIVERSITY NEWS/ANNOUNCEMENT
                  </dt>
                  <div className='flex flex-col'>
                    <a
                      href={diversityAnnouncement}
                      className='text-sm font-medium text-blue-400 rounded-md'
                      target='_blank'
                      rel='noreferrer'
                    >
                      {diversityAnnouncement}
                    </a>
                  </div>
                </div>
              )}

              {companyMission && (
                <div className='py-4'>
                  <dt className='text-sm font-medium text-gray-500 mb-2'>
                    COMPANY MISSION
                  </dt>
                  <dd className='text-sm font-medium'>{companyMission}</dd>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </SideBar>
    </AuthRoute>
  );
}
