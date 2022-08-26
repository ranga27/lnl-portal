import React from 'react';
import { Group } from './Group';
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePicker = ({ label, name, control, errors, ...rest }) => {
    return (
      <Group label={label} errors={errors}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:border-[#F7B919] focus:outline-none"
              placeholderText="Select date"
              onChange={(e) => onChange(e)}
              selected={value}
              {...rest}
            />
          )}
        />
      </Group>
    );
  };