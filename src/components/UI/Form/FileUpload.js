import React from 'react';
import { Controller } from 'react-hook-form';
import { Group } from './Group';

export const FileUpload = ({ label, errors, name, control, ...rest }) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        render={({ field: { onChange, ref } }) => (
          <input
            type='file'
            id='logoFile'
            onChange={(e) => onChange(e.target.files[0])}
            innerRef={ref}
            {...rest}
          />
        )}
        name={name}
        control={control}
      />
    </Group>
  );
};
