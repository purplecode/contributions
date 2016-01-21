export const PROJECTS = {
  contributions: {
    name: 'PurpleCode.Contributions',
    description: "Project contributions stats made with love by PurpleCode",
    repositories: [{
      type: 'git',
      path: '.'
    }]
  }
};

export const AUTHORS = {
  getId(name, email) {
    if (email.indexOf('jaworski') > -1) {
      return 'mateusz.jaworski@nokia.com';
    }
    return email;
  }
};
