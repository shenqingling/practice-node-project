'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

import mongoose from 'mongoose';

module.exports = function (done) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const Notification = new Schema({
    from: {type: ObjectId, index: true, ref: 'User'}, //index索引   ref 表示关联到User表
    to: {type: ObjectId, index: true, ref: 'User'}, //index索引   ref 表示关联到User表
    type: {type: String},
    data: {type: Object},
    createdAt: {type: Date},
    isRead: {type: Boolean},
    readAt: {type: Date}
  });

  $.mongodb.model('Notification', Notification);
  $.model.Notification = $.mongodb.model('Notification');

  done();

}
