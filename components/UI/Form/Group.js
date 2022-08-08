export const Group = ({ label, errors, children }) => {
  return (
    <div className='form-group'>
      <label className='py-2 block text-md font-medium text-gray-900'>{label}</label>
      {children}
      {errors && (
        <div className='block text-sm font-medium text-red-700'>{errors.message}</div>
      )}
    </div>
  );
};
