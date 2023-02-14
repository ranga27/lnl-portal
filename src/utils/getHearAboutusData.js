export const getHearAboutusdata = (userData) => {
  console.log(userData.length);
  const graphData = [];
  for (let i = 0; i < userData.length; i++) {
    const user = userData[i];
    for (let j = 0; j < user.hearAbout?.length; j++) {
      const hearAboutData = user.hearAbout[j];
      const added = false;
      graphData.map((data) => {
        console.log(hearAboutData);
        if (data.hasOwnProperty(hearAboutData)) {
          data[hearAboutData] = data[hearAboutData] + 1;
          added = true;
        }
      });
      if (!added) {
        const tempData = { [hearAboutData]: 1 };
        graphData.push(tempData);
      }
    }
  }
  console.log(graphData);
};
