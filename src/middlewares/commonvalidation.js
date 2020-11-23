exports.isObjectId = (objectId) => {
  var ObjectID = require('mongodb').ObjectID;
  return ObjectID.isValid(objectId);
};
