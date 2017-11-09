"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongooseAnalytics = function MongooseAnalytics(mongooseInstance) {
  var _this = this;

  _classCallCheck(this, MongooseAnalytics);

  this.getBasicStats = function () {

    return new Promise(function (resolve, reject) {

      var promises = [];
      var data = {};

      Object.keys(_this.mongoose.models).map(function (key) {

        var model = _this.mongoose.models[key];

        promises.push(_this.mongoose.model(model.modelName).count().then(function (res) {
          data[model.modelName] = {
            count: res
          };
        }));
      });

      Promise.all(promises).then(function (res) {
        return resolve(data);
      }).catch(function (err) {
        return reject(err);
      });
    });
  };

  this.query = function (modelName, options) {
    return _this.mongoose.model(modelName).find(options);
  };

  this.count = function (modelName, options) {
    return _this.mongoose.model(modelName).count(options);
  };

  this.mongoose = mongooseInstance;
};

exports.default = MongooseAnalytics;