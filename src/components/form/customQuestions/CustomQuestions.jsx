import { useState, useEffect } from 'react';
import {
  ElementStore,
  ReactFormBuilder,
  ReactFormGenerator,
} from 'react-form-builder2';
import { getRoles } from '../../../../firebase/firestoreService';
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

const CustomQuestions = ({ handleSaveFields, fields, companyId }) => {
  const [data, setData] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    ElementStore.subscribe((state) => setData(state.data));
  });

  const onSubmit = () => {
    const filteredData = removeUndefinedFields(data);
    const newFields = { customQuestions: filteredData, ...fields };
    handleSaveFields(newFields);
  };

  const [rolesList, setRoles] = useState([]);

  useEffect(() => {
    getRoles(companyId).then((results) => {
      setRoles(results);
    });
  }, [companyId]);

  return (
    <div className='form-builder-custom-css bg-white py-6 px-4 sm:p-6'>
      <div className='flex justify-between items-center w-[70%] m-3'>
        <h4>Make your questionnaire form</h4>
        {/* //TODO: Tooltip can be used here which shows explanation how to use */}
        <button
          className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
          onClick={() => setPreviewVisible(true)}
        >
          <IntlMessages id='roles.previewForm' />
        </button>
        {rolesList.length >= 1 ? (
          <p>Role Limit Reached</p>
        ) : (
          <button
            className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
            onClick={onSubmit}
          >
            <IntlMessages id='general.submit' />
          </button>
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
