import React, { useEffect, useState } from 'react';
import Select from 'react-select';
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
  ...rest
}) => {
  const setDefaultValues = options.filter((o) => {
    return defaultValue?.some((d) => {
      return o.value === d;
    });
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
  }, []);

  return (
    <Group label={label} errors={errors}>
      <Controller
        name={name}
        control={control}
        render={() => (
          <Select
            isMulti
            options={options}
            onChange={handleChange}
            value={selection.selectedOptions}
            {...rest}
          />
        )}
      />
    </Group>
  );
};