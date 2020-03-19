const to = require('await-to-js').default;

module.exports.to = async promise => {
    let err, res;
    [err, res] = await to(promise);
    if(err) return err;
    return [null, res];
  };
  
  module.exports.error = function (res, err, code) {
    if(typeof err == 'object' && typeof err.message != 'undefined'){
      err = err.message;
    }
    if(typeof code !== 'undefined') res.statusCode = code;
    return res.json({success:false, error: err});
  };

  module.exports.success = function (res, data, code) {
    let send_data = {success:true};
    if(typeof data == 'object'){
      send_data = Object.assign(data, send_data);
    }
    if(typeof code !== 'undefined') res.statusCode = code;
    return res.json(send_data);
  };
  

  module.exports.throwError = (err_message, log) => {
    if (log) logger.error(err_message);
    throw new Error(err_message);
  };
  