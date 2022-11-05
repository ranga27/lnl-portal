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
  apiKey: 'AIzaSyC9ifH-hmwCIxCd1SYNfsBnHCdzgoSO7AA',
  authDomain: 'lnl-dev.firebaseapp.com',
  projectId: 'lnl-dev',
  storageBucket: 'lnl-dev.appspot.com',
  messagingSenderId: '533712523465',
  appId: '1:533712523465:web:8ca43166340d53f2b27d18',
  measurementId: 'G-2L92WTL06P',
};

export const storageRootUrl = `https://storage.googleapis.com/${firebaseConfig.storageBucket}/`;

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
