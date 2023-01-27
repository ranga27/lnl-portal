import React, { useEffect, useState } from 'react';
import { getScreeningQuestions } from '../../../../firebase/firestoreService';

const RoleQuestions = ({ Applicant }) => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    getScreeningQuestions(Applicant.roleId, Applicant.uid).then((result) =>
      setQuestions(result?.answer)
    );
  }, [Applicant]);

  if (questions?.length == 0 || questions === undefined)
    return (
      <p className='py-16 text-center text-xl font-bold text-gray-600 mt-6 ml-10'>
        {Applicant.firstName} did not answer the screening questions.
      </p>
    );
  return (
    <div className='ml-10'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900 truncate text-left mt-6'>
          Screening Questions answers by candidate
        </h2>
      </div>
      {questions &&
        Object.keys(questions).map((item, index) => (
          <div key={index} className='mt-5'>
            <p className='font-semibold text-gray-600'>
              <span className='text-base'>{index + 1}.</span>
              <span className='m-3 text-base'>{item}</span>
            </p>
            <p className='text-sm ml-6 text-gray-800'>
              {questions[item].toString()}
            </p>
          </div>
        ))}
    </div>
  );
};

export default RoleQuestions;
