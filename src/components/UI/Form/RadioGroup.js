import { Controller } from 'react-hook-form';
import { Group } from './Group';

export const RadioGroup = ({
  label,
  name,
  control,
  errors,
  options,
  defaultChecked,
}) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <fieldset onChange={field.onChange} value={field.value}>
            {options.map((option) => (
              <div key={option.value}>
                <input
                  name={name}
                  value={option.value}
                  type='radio'
                  defaultChecked={defaultChecked === option.value}
                />
                <label className='ml-2'>{option.label}</label>
              </div>
            ))}
          </fieldset>
        )}
      />
    </Group>
  );
};
