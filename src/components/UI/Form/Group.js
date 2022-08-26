export const Group = ({ label, errors, children }) => {
  return (
    <div className='form-group'>
      <label className='py-1.5 mt-2 block text-sm font-medium text-gray-900'>
        {label}
      </label>
      {children}
      {errors && (
        <div className='error-text block text-sm font-medium text-red-500 tracking-wide mt-1'>
          {errors.message}
        </div>
      )}
    </div>
  );
};
