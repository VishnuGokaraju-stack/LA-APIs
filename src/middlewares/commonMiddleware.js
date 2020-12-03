exports.clientType = (key) => {
  let clientTypeObject = {
    'SAAS-ADMIN': 'ADMIN',
    'SAAS-ANDROID': 'ANDROID',
    'SAAS-IOS': 'IOS',
    'SAAS-WEBSITE': 'WEBSITE',
    'SAAS-MSITE': 'MSITE',
  };
  return clientTypeObject[key];
};
