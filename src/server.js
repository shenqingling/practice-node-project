'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

import './base';

// 初始化
$.init((err) => {
  if(err) {
    console.error(err);
    process.exit(-1);
  }else{
    console.log('inited [env=%s]', $.env);
  }
});
