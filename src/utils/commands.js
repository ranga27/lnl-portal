import { format, parse } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export const formatDateInArray = (array) => {
  array.forEach((item) => {
    for (const prop in item) {
      if (item.hasOwnProperty(prop)) {
        if (item[prop] instanceof Timestamp) {
          item[prop] = format(new Date(item[prop].toDate()), 'dd-MMM-yyyy');
        }
      }
    }
  });
  return array;
};

export const getDateFromString = (value) => {
  const formattedDate = parse(value, 'dd-MMM-yyyy', new Date());
  return formattedDate;
};
