import { format } from 'date-fns';

// Function to manage the Object UseState
class StoreInUsestate {
  // handle the changes in Input field to store the data in UseState
  static handleChange = (e, stateName) => {
    const { name, value } = e.target;
    stateName((prevState) => ({
      ...prevState,
      [name]:
        name === 'appliedAt' && value !== ''
          ? format(new Date(value), 'dd-MMM-yyyy')
          : value,
    }));
  };
}
export default StoreInUsestate;

// function to return  the keys which have values
const getKeys = (searchObj) => {
  const keys = Object.keys(searchObj).filter((key) => {
    return searchObj[key] !== '' && searchObj[key] !== undefined;
  });
  return keys;
};

// Function to search the Data by multiple field
export const searchData = (searchObj, allData) => {
  const keysToSearch = getKeys(searchObj);
  if (keysToSearch <= 0) return allData;
  const filtered = [];
  for (let i = 0; i < allData.length; i += 1) {
    let check = false;
    const record = allData[i];
    for (let j = 0; j < keysToSearch.length; j += 1) {
      const key = keysToSearch[j];
      if (
        record[key]
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchObj[key].toString().toLowerCase())
      ) {
        check = true;
      } else {
        check = false;
        break;
      }
    }
    if (check) {
      filtered.push(record);
    }
  }

  if (filtered?.length) {
    return filtered;
  }
  return [];
};

// Filter by Date range - For Dashboard
export const filterByDateTange = (
  dateObj,
  allData,
  dateToUse = 'createdAt'
) => {
  if (dateToUse === 'createdAt') {
    if (dateObj.to === '' || dateObj.from === '') {
      return allData;
    } else {
      const data = allData.filter((item) => {
        if (
          new Date(formatDate(item.createdAt)) <= new Date(dateObj.to) &&
          new Date(formatDate(item.createdAt)) >= new Date(dateObj.from)
        ) {
          return item;
        }
      });
      return data;
    }
  } else if (dateToUse === 'appliedAt') {
    if (dateObj.to === '' || dateObj.from === '') {
      return allData;
    } else {
      const data = allData.filter((item) => {
        if (
          new Date(formatDate(item.appliedAt)) <= new Date(dateObj.to) &&
          new Date(formatDate(item.appliedAt)) >= new Date(dateObj.from)
        ) {
          return item;
        }
      });
      return data;
    }
  }
};

// Convert date into form
export const formatDate = (input) => {
  return format(new Date(input.toDate()), 'dd-MMM-yyyy');
};

//function to calculte average
const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

// Function make filtering according to given sortBy string.
export const sortScreeningUserList = (userList, sortBy) => {
  switch (sortBy) {
    case 'appliedAtAscending':
      return userList.sort(
        (a, b) =>
          new Date(formatDate(a.appliedAt)).getTime() -
          new Date(formatDate(b.appliedAt)).getTime()
      );

    case 'appliedAtDescending':
      return userList.sort(
        (a, b) =>
          new Date(formatDate(b.appliedAt)).getTime() -
          new Date(formatDate(a.appliedAt)).getTime()
      );

    case 'scoreAscending':
      return userList.sort((a, b) => a.score - b.score);

    case 'scoreDescending':
      return userList.sort((a, b) => b.score - a.score);

    case 'matchAscending':
      return userList.sort((a, b) => a.match - b.match);

    case 'matchDescending':
      return userList.sort((a, b) => b.match - a.match);

    case 'getPendingApplication':
      return userList.filter((item) => {
        if (item.status === 'Pending Review') {
          return item;
        }
      });

    case 'getAcceptedApplication':
      return userList.filter((item) => {
        if (item.status === 'Accepted') {
          return item;
        }
      });

    case 'getRejectedApplication':
      return userList.filter((item) => {
        if (item.status === 'Rejected') {
          return item;
        }
      });

    case 'signupAtAscending':
      return userList.sort(
        (a, b) =>
          new Date(formatDate(a.createdAt)).getTime() -
          new Date(formatDate(b.createdAt)).getTime()
      );

    case 'signupAtDescending':
      return userList.sort(
        (a, b) =>
          new Date(formatDate(b.createdAt)).getTime() -
          new Date(formatDate(a.createdAt)).getTime()
      );

    case 'rolePostedAtAscending':
      return userList.sort(
        (a, b) =>
          new Date(formatDate(a.createdAt)).getTime() -
          new Date(formatDate(b.createdAt)).getTime()
      );

    case 'rolePostedAtDescending':
      return userList.sort(
        (a, b) =>
          new Date(formatDate(b.createdAt)).getTime() -
          new Date(formatDate(a.createdAt)).getTime()
      );

    case 'roleDeadlineAscending':
      return userList.sort(
        (a, b) =>
          new Date(formatDate(a.deadline)).getTime() -
          new Date(formatDate(b.deadline)).getTime()
      );

    case 'roleDeadlineDescending':
      return userList.sort(
        (a, b) =>
          new Date(formatDate(b.deadline)).getTime() -
          new Date(formatDate(a.deadline)).getTime()
      );

    case 'acceptedAscending':
      return userList.sort((a, b) => a.accepted.length - b.accepted.length);

    case 'acceptedDescending':
      return userList.sort((a, b) => b.accepted.length - a.accepted.length);

    case 'rejectedAscending':
      return userList.sort((a, b) => a.rejected.length - b.rejected.length);

    case 'rejectedDescending':
      return userList.sort((a, b) => b.rejected.length - a.rejected.length);

    case 'savedAscending':
      return userList.sort((a, b) => a.saved - b.saved);

    case 'savedDescending':
      return userList.sort((a, b) => b.saved - a.saved);

    case 'aplliedAscending':
      return userList.sort((a, b) => a.applied - b.applied);

    case 'appliedDescending':
      return userList.sort((a, b) => b.applied - a.applied);

    case 'averageMatchAscending':
      return userList.sort((a, b) => average(a.score) - average(b.score));

    case 'averageMatchDescending':
      return userList.sort((a, b) => average(b.score) - average(a.score));

    default:
      return userList;
  }
};
