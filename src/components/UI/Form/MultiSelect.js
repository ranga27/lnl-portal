import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Controller } from 'react-hook-form';
import { Group } from './Group';

export const MultiSelect = ({
  label,
  name,
  control,
  options,
  setValue,
  errors,
  clearErrors,
  defaultValue,
  isCreatable,
  ...rest
}) => {
  if (isCreatable) {
    // Build required data structure for options
    options = !Array.isArray(options) ? [options] : options;
    options = options.map((o) => {
      return {
        label: o,
        value: o,
      };
    });
  }

  const setDefaultValues = options.filter((o) => {
    if (defaultValue === undefined) {
      return null;
    } else {
      if (Array.isArray(defaultValue)) {
        return defaultValue?.some((d) => {
          return o.value === d;
        });
      } else {
        return o.value === defaultValue;
      }
    }
  });
  const [selection, setSelection] = useState({
    selectedOptions: [],
  });
  const handleChange = (selectedOption) => {
    clearErrors(name);
    setSelection({ selectedOption });
    setValue(
      name,
      selectedOption.map((option) => option.value)
    );
  };
  useEffect(() => {
    // HACK: to reset values on first render
    setSelection([]);
    if (defaultValue) {
      setSelection({ selectedOptions: setDefaultValues });
    }
  }, [defaultValue]);

  return (
    <Group label={label} errors={errors}>
      <Controller
        name={name}
        control={control}
        render={() =>
          isCreatable ? (
            <CreatableSelect
              isMulti
              options={options}
              onChange={handleChange}
              value={selection.selectedOptions}
              {...rest}
            />
          ) : (
            <Select
              isMulti
              options={options}
              onChange={handleChange}
              value={selection.selectedOptions}
              {...rest}
            />
          )
        }
      />
    </Group>
  );
};
