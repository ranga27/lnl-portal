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
  