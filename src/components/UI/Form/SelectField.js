import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { Group } from './Group';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? '1px solid #F7B919'
      : '1px solid rgb(209 213 219)',
    boxShadow: state.isFocused ? '0px 0px 0px rgb(209 213 219)' : 'none',
    '&:hover': {},
  }),
};

export const SelectField = ({
  label,
  name,
  control,
  options,
  errors,
  ...rest
}) => {
  return (
    <Group label={label} errors={errors}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={(e) => {
              // onChange's arg will send value into hook form
              onChange(e.value);
            }}
            value={{
              // make sure we retain the corect format for the controlled component
              value,
              label: options.find((e) => e.value === value)?.label,
            }}
            options={options}
            // className=''
            styles={customStyles}
            classNamePrefix='react-select'
            {...rest}
          />
        )}
      />
    </Group>
  );
};
