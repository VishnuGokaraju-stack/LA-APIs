exports.insertIsDuplicateCheckValidation = (json, postData, type) => {
  if (type === 'mobile') {
    return json.find(
      (customer) => customer.mobileNumber === postData.mobileNumber
    );
  }
  if (type === 'email') {
    return json.find(
      (customer) =>
        customer.email.toLowerCase() === postData.email.toLowerCase()
    );
  }
  if (type === 'referarCode') {
    return json.find(
      (customer) =>
        customer.referralCode.toLowerCase() ===
        postData.referarCode.toLowerCase()
    );
  }
};
