const { throwError, to } = require('../util/requestHelper');
const bcryptjs = require('bcryptjs');

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('user', {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Invalid email' }
        }
      },
      password: DataTypes.STRING,
      refresh_token: DataTypes.STRING
    });
    Model.beforeSave(async user => {
        if(user.changed('password')){
            let salt, hash, err;
            [err, salt] = await to(bcryptjs.genSalt(10));
            if(err) throwError(err.message, true);
            [err, hash] = await to(bcryptjs.hash(user.password, salt));
            if(err) throwError(err.message, true);
            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass;
        if(!this.password) throwError('password not set');
    
        [err, pass] = await to(bcryptjs.compare(pw, this.password));
        if(err) throwError(err);
    
        if(!pass) throwError('invalid password');
    
        return this;
      };
      
      return Model;
}  

