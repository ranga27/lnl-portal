import { Controller } from 'react-hook-form';
import { Group } from './Group';

export const CheckBox = ({ label, name, control, checked, ...rest }) => {
    return (
      <Group>
        <Controller
          render={({ field }) => (
            <input
              id={name}
              onChange={field.onChange}
              innerRef={field.ref}
              defaultChecked={checked}
              type="checkbox"
              {...rest}
            />
          )}
          name={name}
          control={control}
        />
        <label className="mx-2 text-sm">{label}</label>
      </Group>
    );
  };