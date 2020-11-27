exports.isObjectId = (objectId) => {
  var ObjectID = require('mongodb').ObjectID;
  return ObjectID.isValid(objectId);
};

exports.valueExistsInJSON = (json, findValue) => {
  return json.filter(function (json) {
    return json.catName.toLowerCase() === findValue.toLowerCase();
  });
};
