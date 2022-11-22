import { useState, useEffect } from 'react';
import {
  ElementStore,
  ReactFormBuilder,
  ReactFormGenerator,
} from 'react-form-builder2';
// Hooks
import useDocumentMutation from '../../hooks/useDocumentMutation';
import useCollection from '../../hooks/useCollection';
// Components
import IntlMessages from '../../../utils/IntlMessages';
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

const CustomQuestions = ({ _roleId, companyId }) => {
  const [roleId, setRoleId] = useState(_roleId);
  const url = `http://127.0.0.1:5001/lnl-dev/europe-west2/users-fetchQuestions?companyId=${companyId}`;

  const { data: questionnaire, isLoading } = useCollection('questionnaire', [
    'companyId',
    '==',
    companyId,
  ]);

  useEffect(() => {
    questionnaire?.length && setRoleId(questionnaire[0]?.roleId);
  }, [questionnaire]);

  const [data, setData] = useState(
    questionnaire ? questionnaire[0]?.questions : []
  );
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    ElementStore.subscribe((state) => setData(state.data));
  });

  const { mutateDocument } = useDocumentMutation(
    'questionnaire',
    roleId || 'noId'
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredData = removeUndefinedFields(data);

    mutateDocument({
      roleId,
      companyId,
      questions: filteredData,
    });
  };

  if (isLoading) {
    return <div className='loading' />;
  }

  return (
    <div className='bg-white py-6 px-4 sm:p-6'>
      <div className='flex justify-between items-center w-[70%] m-3'>
        <h4>Make your questionnaire form</h4>
        {/* //TODO: Tooltip can be used here which shows explanation how to use */}
        <button
          className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
          onClick={() => setPreviewVisible(true)}
        >
          <IntlMessages id='roles.previewForm' />
        </button>
        <button
          className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
          onClick={handleSubmit}
        >
          <IntlMessages id='roles.saveForm' />
        </button>
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
                      onClick={handleSubmit}
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

      <ReactFormBuilder url={url} toolbarItems={toolbarItems} />
    </div>
  );
};

export default CustomQuestions;
