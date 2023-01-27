export const UserRole = {
  super: 'super',
  admin: 'admin',
  editor: 'editor',
  employer: 'employer',
  candidate: 'candidate',
};

/*
  Menu Types:
  "menu-default", "menu-sub-hidden", "menu-hidden"
  */
export const defaultMenuType = 'menu-sub-hidden';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const firebaseConfigForLoop = {
  apiKey: 'AIzaSyASO7xWsWqUHXXxkcMlbmaLWBuI6hOK5gA',
  authDomain: 'loop-luck.firebaseapp.com',
  databaseURL: 'https://loop-luck.firebaseio.com',
  projectId: 'loop-luck',
  storageBucket: 'loop-luck.appspot.com',
  messagingSenderId: '254916519702',
  appId: '1:254916519702:web:bd8ba9a53a0f27486c9237',
  measurementId: 'G-VYCHZLSDJZ',
};

export const storageRootUrl = `https://storage.googleapis.com/${firebaseConfigForLoop.storageBucket}/`;

export const adminRoot = '/';
export const buyUrl = '';
export const searchPath = `${adminRoot}/#`;
export const servicePath = '';

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = false;
export const defaultColor = 'light.loopnotluck';
export const isDarkSwitchActive = false;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
  'loopnotluck',
];

export const applicationOptions = [
  { value: 'Email to Hiring Manager', label: 'Email to Hiring Manager' },
  { value: 'Apply on website', label: 'Apply on website' },
];

export const lnlLogo =
  'https://firebasestorage.googleapis.com/v0/b/loop-luck.appspot.com/o/companyLogos%2Fwhite.png?alt=media&token=93b1b8cc-e66b-4c82-ac61-040e316c897b';
