export let Repositories = {
  'mint': '../mint'
};

export let Authors = {
  getId(name, email) {
    if (email.indexOf('jaworski') > -1) {
      return 'mateusz.jaworski@nokia.com';
    }
    return email;
  }
};
