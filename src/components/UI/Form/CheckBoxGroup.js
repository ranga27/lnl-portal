import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Group } from './Group';

export const CheckBoxGroup = ({
  name,
  label,
  control,
  options,
  setValue,
  errors,
  defaultChecked,
}) => {
  defaultChecked = !Array.isArray(defaultChecked)
    ? [defaultChecked]
    : defaultChecked;

  const [selectedItems, setSelectedItems] = useState(defaultChecked || []);

  console.log(selectedItems);

  useEffect(() => {
    setValue(name, selectedItems);
  }, [selectedItems]);

  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems?.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  return (
    <Group label={label} errors={errors}>
      {options.map((option) => (
        <Controller
          key={option.name}
          name={name}
          control={control}
          render={() => (
            <div key={option.name}>
              <input
                defaultChecked={defaultChecked.includes(option.name)}
                onChange={() => handleSelect(option.name)}
                type='checkbox'
              />
              <label className='ml-2'>{option.label}</label>
            </div>
          )}
        />
      ))}
    </Group>
  );
};
