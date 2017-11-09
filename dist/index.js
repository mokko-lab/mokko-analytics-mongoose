'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongooseAnalytics = function MongooseAnalytics() {
  _classCallCheck(this, MongooseAnalytics);

  this.getBasicStats = function () {

    return new Promise(function (resolve, reject) {

      var promises = [];
      var data = {};

      Object.keys(_mongoose2.default.models).map(function (key) {

        var model = _mongoose2.default.models[key];

        promises.push(_mongoose2.default.model(model.modelName).count().then(function (res) {
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
    return _mongoose2.default.model(modelName).find(options);
  };

  this.count = function (modelName, options) {
    return _mongoose2.default.model(modelName).count(options);
  };
};

exports.default = MongooseAnalytics;
