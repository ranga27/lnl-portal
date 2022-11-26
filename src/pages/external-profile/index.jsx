import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { PencilIcon, StarIcon } from '@heroicons/react/solid';
import { AtSymbolIcon, GlobeAltIcon } from '@heroicons/react/outline';
import SideBar from '../../components/layout/Sidebar';
import AuthRoute from '../../components/context/authRoute';
import Footer from '../../components/layout/Footer';
import IntlMessages from '../../utils/IntlMessages';
import { AuthContext } from '../../components/context/AuthContext';
import useCollection from '../../components/hooks/useCollection';
import { externalCompanyProfile } from '../../components/data/externalCompanyProfile';

export default function ExternalProfile() {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const [company, setCompany] = useState(externalCompanyProfile);

  const { isLoading, data } = useCollection('companyV2', [
    'userId',
    '==',
    userId,
  ]);

  // TODO: Remove this. It's temporary
  useEffect(() => {
    if (!data) return;

    setCompany((prev) => (prev = { ...prev, ...data[0] }));
  }, [data]);

  if (isLoading) {
    return <div className='loading' />;
  }

  const {
    logoUrl,
    companyName,
    tagline,
    summary,
    companyMission,
    description,
    websiteUrl,
    careersPageUrl,
    linkedInUrl,
    twitterUrl,
    numberOfEmployees,
    interestingStats,
    industry,
    ratings,
    diversityNews,
    companyBenefits,
    companyValues,
    diversity,
  } = company ?? {};

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
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='md:flex md:items-center md:justify-between md:space-x-4 border-b xl:pb-6'>
                <div className='flex items-center'>
                  <img
                    className='w-20 h-20 rounded-full mx-auto mr-2'
                    src={logoUrl}
                    alt='Company logo'
                  />
                  <div>
                    <h1 className='text-2xl font-bold text-gray-900'>
                      {companyName}
                    </h1>
                    <span className='text-sm font-medium text-gray-500'>
                      {tagline}
                    </span>
                    <div className='mt-2 flex gap-2'>
                      <a
                        className='text-sm font-medium text-gray-500 flex items-center cursor-pointer'
                        href={websiteUrl}
                        target='_blank'
                      >
                        <div className='text-xs text-gray-900 flex items-center bg-[#F7B919] px-2 py-0.5 rounded-md'>
                          Visit website{' '}
                          <GlobeAltIcon className='h-3 w-3 ml-1' />
                        </div>
                      </a>
                      <a
                        className='text-sm font-medium text-gray-500 flex items-center cursor-pointer'
                        href={careersPageUrl}
                        target='_blank'
                      >
                        <div className='text-xs text-gray-900 flex items-center bg-[#F7B919] px-2 py-0.5 rounded-md'>
                          Career page <AtSymbolIcon className='h-3 w-3 ml-1' />
                        </div>
                      </a>
                      <i class='fa-brands fa-square-twitter'></i>
                    </div>
                  </div>
                </div>

                <div className='mt-4 flex space-x-3 md:mt-0'>
                  <Link
                    href={{
                      pathname: '/external-profile/edit',
                      query: {
                        ...company,
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
                <dt className='text-sm font-medium text-gray-500 mb-2 pt-4'>
                  NUMBER OF EMPLOYEES
                </dt>
                <div className='flex gap-5'>{numberOfEmployees}</div>
              </div>

              <div className='py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  INDUSTRY
                </dt>
                <div className='flex items-center gap-1'>
                  {industry?.map((item, index) => (
                    <span key={item} className='text-sm font-medium'>
                      {item} {index !== industry.length - 1 && '|'}
                    </span>
                  ))}
                </div>
              </div>

              <div className='py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  COMPANY BENEFITS
                </dt>
                <div className='flex items-center gap-1'>
                  {companyBenefits?.map((item, index) => (
                    <span key={item} className='text-sm font-medium'>
                      {item} {index !== companyBenefits.length - 1 && '|'}
                    </span>
                  ))}
                </div>
              </div>

              <div className='py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  COMPANY VALUES
                </dt>
                <div className='flex items-center gap-1'>
                  {companyValues?.map((item, index) => (
                    <span key={item} className='text-sm font-medium'>
                      {item} {index !== companyValues.length - 1 && '|'}
                    </span>
                  ))}
                </div>
              </div>

              <div className='py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  DIVERSITY
                </dt>
                <div className='flex items-center gap-1'>
                  {diversity?.map((item, index) => (
                    <span key={item} className='text-sm font-medium'>
                      {item} {index !== diversity.length - 1 && '|'}
                    </span>
                  ))}
                </div>
              </div>

              <div className='py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  INTERESTING STATS
                </dt>
                <div className='flex items-center gap-1'>
                  {interestingStats?.map((item, index) => (
                    <span key={item} className='text-sm font-medium'>
                      {item} {index !== interestingStats.length - 1 && '|'}
                    </span>
                  ))}
                </div>
              </div>

              <div className='py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  DIVERSITY NEWS
                </dt>
                <div className='flex flex-col'>
                  {diversityNews.summary}...
                  <a
                    href={diversityNews.articleUrl}
                    className='text-sm font-medium bg-slate-100 rounded-md p-1'
                    target='_blank'
                  >
                    Read More
                  </a>
                </div>
              </div>

              <div className='py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  COMPANY MISSION
                </dt>
                <dd className='text-sm font-medium'>{companyMission}</dd>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </SideBar>
    </AuthRoute>
  );
}
