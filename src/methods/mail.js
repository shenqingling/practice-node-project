'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

import nodemailer from 'nodemailer';

module.exports = function (done) {

  $.smtp = nodemailer.createTransport($.config.get('smtp'), {
    from: $.config.get('smtp.auth.user')
  });

  $.method('mail.send').check({
    to: {required: true}, // 多个邮箱地址以逗号分割
    subject: {required: true},
    html: {required: true}
  });
  $.method('mail.send').register(function(params, callback){

    $.smtp.sendMail(params, callback);

  });

  // $.method('mail.send').call({
  //   to: 'me@ucdok.com',
  //   subject: '我的第一封邮件',
  //   html: '<h1>啊哈哈哈,这是标题</h1><p>内容</p>'
  // },console.log);

  done();

}
