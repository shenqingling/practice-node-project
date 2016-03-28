'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multipart from 'connect-multiparty';
import session from 'express-session';

module.exports = function (done) {

  const debug = $.createDubug('init:express');
  debug('initing Express...');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(multipart());
  app.use(session({
    secret: $.config.get('web.session.secret'),
  }));

  const router = express.Router();

  // $.router = router;
  //调试api接口时拦截错误
  const routerWrap = {};
  ['get', 'head', 'post', 'put', 'del', 'delete'].forEach(method => {
    routerWrap[method] = function(path, ...fnList){
      fnList = fnList.map(fn => {
        return function(req, res, next){
          const ret = fn(req, res, next);
          if(ret && ret.catch) ret.catch(next);
        }
      });
      router[method](path, ...fnList);
    }
  });
  $.router = routerWrap;

  app.use(router);
  app.use('/static', serveStatic(path.resolve(__dirname, '../../static')));

  // api返回错误json,而不是错误信息
  app.use('/api', function(err, req, res, next){
    debug('API error: %s', err && err.stack || err);
    res.json({error: err.toString()});
  });

  app.listen($.config.get('web.port'), (err) => {
    done(err);
  });

}
