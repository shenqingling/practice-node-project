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

  const Topic = new Schema({
    authorId: {type: ObjectId, index: true}, //index索引
    title: {type:String, trim: true}, //trim自动去掉首尾的空格
    content: {type: String},
    tags: [{type: String, index: true}],  //字符串数组
    createdAt: {type: Date, index: true},
    updatedAt: {type: Date, index: true},
    lastCommentAt: {type: Date, index: true},
    comments: [{
      cid: ObjectId,
      authorId: ObjectId,
      content: String,
      createdAt: Date
    }]
  });

  $.mongodb.model('Topic', Topic);
  $.model.Topic = $.mongodb.model('Topic');

  done();

}
