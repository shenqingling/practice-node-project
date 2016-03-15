'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

import path from 'path';
import projectCore from 'project-core';

const $ = global.$ = new projectCore();

// 加载配置文件
$.init.add((done) => {
  $.config.load(path.resolve(__dirname, 'config.js'));
  const env = process.env.NODE_ENV || null;
  if(env) {
    $.config.load(path.resolve(__dirname, '../config', env + '.js'));
  }
  $.env = env;
  done();
});

// 初始化MongooDB
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));
// 加载models
$.init.load(path.resolve(__dirname, 'models'));


// 初始化Express
$.init.load(path.resolve(__dirname, 'init', 'express.js'));
//加载路由
$.init.load(path.resolve(__dirname, 'routes'))

// 初始化
$.init((err) => {
  if(err) {
    console.error(err);
    process.exit(-1);
  }else{
    // console.log('inited');
    console.log('inited [env=%s]', $.env);
  }

  // 测试连接MongooDB
  // const item = new $.model.User({
  //   name: `User${$.utils.date('Ymd')}`,
  //   password: '123456',
  //   nickname: '测试用户'
  // });
  // item.save(console.log);

});
