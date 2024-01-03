const _ = require("lodash");

/**
 * The `cleanTranslationObject` function recursively removes undefined values and empty objects from a
 * given object.
 * @param {object} obj - The `obj` parameter is an object that represents a translation. It may contain nested
 * objects and properties. The purpose of the `cleanTranslationObject` function is to remove any
 * properties that have a value of `undefined` or nested objects that are empty (i.e., have no
 * properties).
 */
const cleanTranslationObject = (obj) => {
  console.log("before", obj);

  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    } else if (
      typeof obj[key] === "object" &&
      Object.keys(obj[key]).length === 0
    ) {
      delete obj[key];
    } else if (
      typeof obj[key] === "object" &&
      Object.keys(obj[key]).length > 0
    ) {
      cleanTranslationObject(obj[key]);

      // Delete empty object after recursion
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  });
};

const mergeCustomizerWithoutOverwrite = (objValue, srcValue) => {
  if (typeof objValue === "object" || typeof srcValue === "object") {
    return undefined;
  }

  if (objValue) {
    return objValue;
  }

  return srcValue;
};

module.exports = {
  cleanTranslationObject,
  mergeCustomizerWithoutOverwrite,
};
