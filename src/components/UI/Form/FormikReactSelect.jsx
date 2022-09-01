/* eslint-disable import/prefer-default-export */
import React from 'react';
import Select from 'react-select';

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
      styles={customStyles}
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
