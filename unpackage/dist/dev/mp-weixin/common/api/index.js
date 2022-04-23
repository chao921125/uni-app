"use strict";
var config = {
  testPath: "/test",
  basePath: "",
  paramsReauired: function(params) {
    if (!params || Object.keys(params).length === 0) {
      return false;
    }
    return true;
  }
};
exports.config = config;
