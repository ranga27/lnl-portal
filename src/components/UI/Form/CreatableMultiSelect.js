import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Controller } from 'react-hook-form';
import { Group } from './Group';

export const CreatableMultiSelect = ({
  label,
  name,
  control,
  setValue,
  errors,
  clearErrors,
  ...rest
}) => {
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

  return (
    <Group label={label} errors={errors}>
      <Controller
        name={name}
        control={control}
        render={() => (
          <CreatableSelect
            isMulti
            options={[]}
            onChange={handleChange}
            value={selection.selectedOptions}
            {...rest}
          />
        )}
      />
    </Group>
  );
};
