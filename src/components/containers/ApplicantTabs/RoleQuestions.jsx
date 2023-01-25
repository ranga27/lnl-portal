import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc } from '@firebase/firestore';
import { firestore } from '../../../../firebase/clientApp';

const RoleQuestions = ({ Applicant }) => {
  const [questions, setQuestions] = useState(null);

  //Demo RoleID = "32fd4281-d9b2-49c8-be64-3c8db73a4fe5" ---->  Applicant.roleId
  // Demo User ID = "U0Jgfs29o3fs6PdNJ7FWyL7AEm02" --->  Applicant.uid

  const getScreeningQuestions = async (role) => {
    const roleRef = doc(firestore, `questionnaire/${Applicant.roleId}`);
    const ansRef = collection(roleRef, 'Answers');
    const sereeningQuestions = doc(ansRef, Applicant.uid);

    const data = await getDoc(sereeningQuestions);
    return data.data();
  };

  useEffect(() => {
    getScreeningQuestions().then((result) => setQuestions(result?.answer));
  }, [getScreeningQuestions]);

  if (questions?.length == 0 || questions === undefined)
    return (
      <p className='text-xl font-bold text-gray-600 truncate text-left mt-6 ml-10'>
        User did not answer the screening Questions....!
      </p>
    );
  return (
    <div className='ml-10'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900 truncate text-left mt-6'>
          Candidate Answers For Screening Questions
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
