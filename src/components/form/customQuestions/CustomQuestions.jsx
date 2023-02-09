import { useState, useEffect } from 'react';
import {
  ElementStore,
  ReactFormBuilder,
  ReactFormGenerator,
} from 'react-form-builder2';
import { getRoles } from '../../../../firebase/firestoreService';
// Components
import IntlMessages from '../../../utils/IntlMessages';
import useCollection from '../../hooks/useCollection';
import { QuestionInfo } from '../../layout/QuestionInfo';
import { Modal } from '../../UI/Modal';
// Helpers
import { toolbarItems } from './helpers';

const removeUndefinedFields = (data) => {
  data.forEach((elm) => {
    for (let key in elm) {
      if (!elm[key]) {
        delete elm[key];
      }
    }
  });

  return data;
};

const CustomQuestions = ({
  handleSaveFields,
  fields,
  companyId,
  roleCredits,
  role,
}) => {
  const { data: questionnaire, isLoading } = useCollection('questionnaire', [
    'roleId',
    '==',
    role.id ? role.id : 'noId',
  ]);

  const [data, setData] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  useEffect(() => {
    ElementStore.subscribe((state) => {
      setData(state.data);
    });
  });

  var count = true;

  useEffect(() => {
    if (role.id && questionnaire) {
      ElementStore.subscribe((state) => {
        const current = state.data;
        const questionID = [];
        for (let j = 0; j < current.length; j++) {
          questionID.push(current[j].id);
        }
        if (count) {
          for (let i = 0; i < questionnaire[0].questions.length; i++) {
            if (!questionID.includes(questionnaire[0].questions[i].id)) {
              state.data.push(questionnaire[0].questions[i]);
              setData(state.data);
            }
          }
          count = false;
        }
      });
    }
  }, [questionnaire]);

  const onSubmit = () => {
    const filteredData = removeUndefinedFields(data);
    const newFields = { customQuestions: filteredData, ...fields };
    handleSaveFields(newFields);
  };

  const [rolesList, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getRoles(companyId).then((results) => {
      setRoles(results);
    });
  }, [companyId]);

  return (
    <div className='form-builder-custom-css bg-white py-6 px-4 sm:p-6'>
      <div className='flex justify-between items-center w-[70%] m-3'>
        <h1>Candidate screening questions</h1>
        {/* //TODO: Tooltip can be used here which shows explanation how to use */}

        {roleCredits === 0 ? (
          <p>Role Limit Reached</p>
        ) : (
          <button
            className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
            onClick={onSubmit}
          >
            <IntlMessages id='roles.post-role' />
          </button>
        )}
      </div>
      <div>
        <button
          className='text-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-2 text-sm font-medium'
          onClick={() => setPreviewVisible(true)}
        >
          <IntlMessages id='roles.previewForm' />
        </button>
        <button
          type='button'
          className='ml-8 text-sm text-gray-900 underline hover:text-[#F7B919]'
          onClick={() => handleOpenModal()}
        >
          <IntlMessages id='roles.screening-description' />
        </button>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            setOpen={setIsModalOpen}
            cancelButton={true}
            confirmButton={false}
            modalSize='xl'
            title='Screening Questions Tutorial'
            showIcon={false}
            Content={QuestionInfo}
          />
        )}
      </div>

      {previewVisible && (
        <div className='modal show d-block overflow-scroll'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-body'>
                <ReactFormGenerator
                  data={data}
                  submitButton={
                    <button
                      onClick={onSubmit}
                      className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
                    >
                      <IntlMessages id='roles.submit' />
                    </button>
                  }
                />
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-default'
                  data-dismiss='modal'
                  onClick={() => setPreviewVisible(false)}
                >
                  <IntlMessages id='roles.close' />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ReactFormBuilder toolbarItems={toolbarItems} />
    </div>
  );
};

export default CustomQuestions;
