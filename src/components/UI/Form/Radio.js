import { Controller } from 'react-hook-form';
import { Group } from './Group';

export const Radio = ({ label, name, control, options }) => {
  return (
    <Group>
      <Controller
        render={({ field }) => (
          <input
            id={name}
            value={field.value}
            onChange={field.onChange}
            innerRef={field.ref}
            type='radio'
          />
        )}
        name={name}
        control={control}
      />
    </Group>
  );
};
