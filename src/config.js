'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

module.exports = function (set, get, has) {

  // 服务器监听端口
  set('web.port', 3000);   //在config/dev.js设置了3001，就会覆盖这里的配置

  // session secret
  set('web.session.secret', 'test');

  // session redis connection
  set('web.session.redis', {
    host: '192.168.99.100',
    port: 32770,
  });

  // limiter redis connection
  set('limiter.redis', {
    host: '192.168.99.100',
    port: 32770,
    prefix: 'L:'
  });

}
