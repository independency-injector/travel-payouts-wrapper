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

    //TODO: method for pass generating  

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

    Model.beforeBulkUpdate(async user => {
      if(user.changed('password')){
        let [err, salt] = await to(bcryptjs.getSalt(10));
        if(err) throwError(err.message, true);
        [err, hash] = await to(bcryptjs.hash(user.password, salt));
        if(err) throwError(err.message, true);
        user.password = hash;
      };
    });
    
    Model.prototype.validatePassword = async function(pw){
      if(!this.password) throwError('password not set');
      let [err, pass] = await to(bcryptjs.compare(pw, this.password));
        if(!pass) return false;
      return true;
    };

    //idk why the fuck it returns true if passwords are different

      return Model;
}  


