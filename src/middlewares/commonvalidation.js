exports.isObjectId = (objectId) => {
  var ObjectID = require('mongodb').ObjectID;
  return ObjectID.isValid(objectId);
};
/* Mother category */
exports.insertMCvalueExistsInJSON = (json, findValue) => {
  return json.find((mc) =>
    mc.mcName.toLowerCase().includes(findValue.toLowerCase())
  );
  // return json.filter(function (json) {
  //   return json.mcName.toLowerCase() === findValue.toLowerCase();
  // });
};

exports.updateMCupdateValueExistsInJson = (json, findValue, dontCheck) => {
  return json.find(
    (mc) =>
      mc.mcName.toString() !== dontCheck &&
      mc.mcName.toLowerCase() === findValue.toLowerCase()
  );
};
/* Mother category */
/* category */
exports.insertCatvalueExistsInJSON = (json, findValue) => {
  return json.find((cat) =>
    cat.catName.toLowerCase().includes(findValue.toLowerCase())
  );
};

exports.updateCatupdateValueExistsInJson = (json, findValue, dontCheck) => {
  return json.find(
    (cat) =>
      cat.catName.toString() !== dontCheck &&
      cat.catName.toLowerCase() === findValue.toLowerCase()
  );
};
/* category */
/* sub category */
exports.insertSubcatvalueExistsInJSON = (json, findValue) => {
  return json.find((subcat) =>
    subcat.subcatName.toLowerCase().includes(findValue.toLowerCase())
  );
};

exports.updateSubcatupdateValueExistsInJson = (json, findValue, dontCheck) => {
  return json.find(
    (subcat) =>
      subcat.subcatName.toString() !== dontCheck &&
      subcat.subcatName.toLowerCase() === findValue.toLowerCase()
  );
};
/* sub category */
/* ratecards */
exports.insertRatecardvalueExistsInJSON = (json, findValue) => {
  return json.find((ratecard) =>
    ratecard.rateCardName.toLowerCase().includes(findValue.toLowerCase())
  );
};

exports.updateRatecardupdateValueExistsInJson = (
  json,
  findValue,
  dontCheck
) => {
  return json.find(
    (ratecard) =>
      ratecard.rateCardName.toString() !== dontCheck &&
      ratecard.rateCardName.toLowerCase() === findValue.toLowerCase()
  );
};
/* ratecards */
