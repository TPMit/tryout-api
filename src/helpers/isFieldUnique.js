/* global module */
'use strict';

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const isFieldUnique = function (model, field, value, message, options, operate) {
  var Models = require("@models")[model];
  var conditions = {
    where: {},
  };
  conditions.where[field] = value;
  if (options) {
    Object.keys(options).filter(function (field) {
      if (operate == 'notIn') {
        conditions.where[field] = {
          [Op.notIn]: [options[field]]
        };
      }
      if (operate == null) {
        conditions.where[field] = {
          [Op.notIn]: [options[field]]
        };
      }
      if (operate == 'in') {
        conditions.where[field] = options[field];
      }
      if (operate == 'notempty') {
        conditions.where[field] != null;
      }
    })
  }
  return Models.count(conditions)
    .then(count => {
      console.log(count)
      if (count != 0) {
        throw new Error(message);
      }
    });
}

module.exports = isFieldUnique;


/*
var validateIsUnique = function (col, msg) {
    var conditions = {where: {}};
    msg = (!msg) ? col + ' must be unique' : msg;
    return function (value, next) {
        var self = this;

        console.log(self._modelOptions.name);

        this.Model.describe().then(function (schema) {
            conditions.where[col] = value;
            Object.keys(schema).filter(function (field) {
                return schema[field].primaryKey;
            }).forEach(function (pk) {
                conditions.where[pk] = {$ne: self[pk]};
            });
        }).then(function () {
            return self.Model.count(conditions).then(function (found) {
                return (found !== 0) ? next(msg) : next();
            });
        }).catch(next);
    };
};s
module.exports = function (Sequelize) {
    Sequelize = !Sequelize ? require('sequelize') : Sequelize;
    Sequelize.prototype.validateIsUnique = validateIsUnique;
    return Sequelize;
};*/