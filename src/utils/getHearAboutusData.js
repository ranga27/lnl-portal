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
        if (data.name === hearAboutData) {
          data.count = data.count + 1;
          added = true;
        }
      });
      if (!added) {
        const tempData = { name: hearAboutData, count: 1 };
        graphData.push(tempData);
      }
    }
  }
  if (graphData.length) return graphData;
  return [];
};

export const getIntroOfPage = (label) => {
  if (label === 'Cha...') {
    return 'User hear from Charity';
  }
  if (label === 'Fac...') {
    return 'User hear from Facebook';
  }
  if (label === 'Goo...') {
    return 'User hear from Google Search';
  }
  if (label === 'Ind...') {
    return 'User hear from Indeed';
  }
  if (label === 'Ins...') {
    return 'User Hear from Instagram';
  }
  if (label === 'Lin...') {
    return 'User hear from LinkedIn';
  }
  if (label === 'Uni...') {
    return 'User hear from Universities';
  }
  if (label === 'Tik...') {
    return 'User hear from TikTok';
  }
  if (label === 'Twi...') {
    return 'User hear from Twitter';
  }
  if (label === 'Wor...') {
    return 'User hear from Word of mouth';
  }
  if (label === '4-2...') {
    return 'User hear from 4-22 Foundation';
  }
  if (label === 'Bay...') {
    return 'User hear from Baytree Centre';
  }
  if (label === 'Uni...') {
    return 'User hear from Universities';
  }
  if (label === 'Bla...') {
    return 'User hear from Black Gifted Network';
  }
  if (label === 'Cha...') {
    return 'User hear from Change Ahead';
  }
  if (label === 'Cit...') {
    return 'User hear from City Gateway';
  }
  if (label === 'Foc...') {
    return 'User hear from Focus Charity';
  }
  if (label === 'Nat...') {
    return 'User hear from National Youth Agency';
  }
  if (label === 'Rea...') {
    return 'User hear from Reach Society';
  }
  if (label === 'Res...') {
    return 'User hear from Resurgo';
  }
  if (label === 'You...') {
    return 'User hear from Youth Focus: North East';
  }
  if (label === 'Car...') {
    return 'User hear from Youth Career Ready';
  }
  if (label === 'Oth...') {
    return 'User hear from Somewhere else.';
  }
  return '';
};
