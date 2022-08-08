import { Controller } from 'react-hook-form';
import { Group } from './Group';

export const TextInput = ({ name, label, control, errors, ...rest }) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type='text'
            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none'
            {...field}
            {...rest}
          />
        )}
      />
    </Group>
  );
};
