/* eslint-disable import/prefer-default-export */
export const getUserError = (message) => {
  switch (true) {
    case /email-already-in-use/i.test(message):
      return 'Email already in use, try to login';
    case /user-not-found/i.test(message):
      return 'The user with this email does not exist, please register';
    case /wrong-password/i.test(message):
      return 'Incorrect password, please try again or reset password';
    default:
      return message;
  }
};
