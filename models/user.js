'use strict';
const { emptyQuery } = require('pg-protocol/dist/messages');
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/jwt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: `Email can't be empty`
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      },
      unique: {
        args: true,
        msg: `Choose another email`
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password is required'
        },
        notEmpty: {
          msg: `password can't be empty`
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'phoneNumber is required'
        },
        notEmpty: {
          msg: `phoneNumber can't be empty`
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image is required'
        },
        notEmpty: {
          msg: `Image can't be empty`
        }
      }
    },
    noIdentity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'noIDCard is required'
        },
        notEmpty: {
          msg: `noIDCard can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((item) => {
    return item.password = hashPassword(item.password)
  })
  return User;
};