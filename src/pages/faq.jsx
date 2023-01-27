import React, { useState } from 'react';
import Footer from '../components/layout/Footer';
import SideBar from '../components/layout/Sidebar';

function Accordion({ title, content }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((current) => !current);
  const minusIcon = '-';
  const plusIcon = '+';
  return (
    <div
      className='my-2 sm:my-4 md:my-6 shadow-sm cursor-pointer bg-white'
      onClick={toggleExpanded}
    >
      <div className='px-6 text-left items-center h-20 select-none flex justify-between flex-row'>
        <h5 className='flex-1'>{title}</h5>
        <div className='flex-none pl-2'>{expanded ? minusIcon : plusIcon}</div>
      </div>
      <div
        className={`px-6 pt-0 overflow-hidden transition-[max-height] duration-500 ease-in ${
          expanded ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <p className='pb-4 text-left'>{content}</p>
      </div>
    </div>
  );
}

const FAQ = () => {
  return (
    <SideBar>
      <div className='py-8 md:py-8 lg:py-8 px-4 bg-gray-100 w-full h-screen'>
        <h1 className='pb-8 text-primary text-bold text-3xl font-bold text-center'>
          Frequently Asked Questions
        </h1>
        <section className='max-w-6xl mx-auto text-center'>
          <Accordion
            title='How do I purchase more invite credits?'
            content={
              'When your invite credits runs out, your manage applicants page would automatically redirect you to the stripe page so you can buy more credits. This only applies on the initial package you signed up with.'
            }
          />
          <Accordion
            title='How can I update my password?'
            content='If you forgot your password, please head to the forgot password page on the login page and try to create a new password'
          />
          <Accordion
            title='How can I see applicants?'
            content='On the manage applicants page, you would see the list of roles created and all the applicants that have applied to each role created. There you can accept or reject them after reviewing their profiles'
          />

          <Accordion
            title='How do I onboard correctly?'
            content='After your first registration, you would be redirected to the onboarding form. Select the details that appeals to your company and after completion. your company profile should be set. Also you can edit the details in the company-profile page'
          />
          <Accordion
            title='How can I connect someone in the Loop Not Luck team?'
            content='Please send us an email at hello@loopnotluck.com'
          />
        </section>
      </div>

      <Footer />
    </SideBar>
  );
};
export default FAQ;
{
  /* <div className='px-4 py-8 max-w-5xl mx-auto text-justify overflow-auto'>
<div
  className='my-2 sm:my-4 md:my-6 shadow-sm cursor-pointer bg-white'
  onClick={toggleExpanded}
>
  <div className='px-6 text-left items-center h-20 select-none flex justify-between flex-row'>
    <h5 className='flex-1'>How do I purchase more invite credits</h5>
    <div className='flex-none pl-2'>
      {expanded ? minusIcon : plusIcon}
    </div>
  </div>
  <div
    className={`px-6 pt-0 overflow-hidden transition-[max-height] duration-500 ease-in ${
      expanded ? 'max-h-40' : 'max-h-0'
    }`}
  >
    <p className='pb-4 text-left'>
     
    </p>
  </div>
</div>
</div> */
}
