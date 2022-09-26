export const getForgotPasswordError = (message) => {
    switch (true) {
      case /invalid-email/i.test(message):
        return 'Invalid email, please provide a valid email address';
      case /user-not-found/i.test(message):
        return 'The user with this email does not exist, please register';
      default:
        return message;
    }
  };
  