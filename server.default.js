export const PROJECTS = {
  contributions: {
    name: 'PurpleCode.Contributions',
    repositories: [{
      type: 'git',
      path: '.'
    }]
  },
  faces: {
    name: 'PurpleCode.Faces',
    repositories: [{
      type: 'git',
      path: '../faces'
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
