'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

import mongoose from 'mongoose';

module.exports = function (done) {

  const debug = $.createDubug('init:mongodb');
  debug('connecting to MongooDB...');

  const conn = mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb = conn;
  $.model = {};

  done();

}
