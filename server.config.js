export const REPOSITORIES = {
  'contributions': '.',
  'mint': '../mint'
};

export const AUTHORS = {
  getId(name, email) {
    if (email.indexOf('jaworski') > -1) {
      return 'mateusz.jaworski@nokia.com';
    }
    return email;
  }
};
