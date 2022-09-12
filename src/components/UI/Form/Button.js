import React from 'react';
import IntlMessages from '../../../utils/IntlMessages';

const Button = (props) => {
  const { dataCy, text, type, width, color, bg, hover, ...rest } = props;
  return (
    <button
      {...rest}
      type={type}
      data-cy={dataCy}
      className={`${width} ${color} ${bg} text-center mx-auto px-7 py-3 font-semibold text-sm leading-snug rounded shadow-md hover:${
        hover || 'bg-gray-900'
      } hover:shadow-lg focus:bg-gray-900 focus:shadow-md focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-md transition duration-150 ease-in-out`}
    >
      <IntlMessages id={text} />
    </button>
  );
};
export default Button;
