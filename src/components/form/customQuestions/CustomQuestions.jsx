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

const CustomQuestions = ({ _roleId, companyId }) => {
  const [roleId, setRoleId] = useState(_roleId);

  const { data: questionnaire, isLoading } = useCollection('questionnaire', [
    'companyId',
    '==',
    companyId,
  ]);

  useEffect(() => {
    questionnaire && setRoleId(questionnaire[0]?.roleId);
  }, [questionnaire]);

  const { mutateDocument } = useDocumentMutation(
    'questionnaire',
    roleId || 'noId'
  );

  const [data, setData] = useState(
    questionnaire ? questionnaire[0]?.questions : []
  );
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    ElementStore.subscribe((state) => setData(state.data));
  }, []);

  const handleSubmit = (questions) => {
    mutateDocument({
      roleId,
      companyId,
      questions,
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
      </div>

      {previewVisible && (
        <div className='modal show d-block overflow-scroll'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-body'>
                <ReactFormGenerator
                  onSubmit={handleSubmit}
                  data={data}
                  submitButton={
                    <button className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'>
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
