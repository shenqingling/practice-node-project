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

// 初始化
$.init((err) => {
  if(err) {
    console.error(err);
    process.exit(-1);
  }else{
    // console.log('inited');
    console.log('inited [env=%s]', $.env);
  }
});
