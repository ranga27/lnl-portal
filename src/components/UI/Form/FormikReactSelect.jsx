/* eslint-disable import/prefer-default-export */
import React from 'react';
import Select from 'react-select';

export const FormikReactSelect = ({
  name,
  value,
  options,
  isMulti,
  className,
  onChange,
  onBlur,
}) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : '';
  };

  return (
    <Select
      className={`react-select ${className}`}
      classNamePrefix='react-select'
      options={options}
      isMulti={isMulti}
      onChange={(value) => {
        onChange(value);
      }}
      value={defaultValue(options, value)}
    />
  );
};
