'use strict';

/**
 * pratice Node.js project
 *
 * @author sql370 <sql370@qq.com>
 */

import path from 'path';

module.exports = function(done) {

  $.router.get('*', function(req, res, next) {
    // res.end(`现在是北京时间${new Date()}`);
    if(req.url.indexOf('/api/') !== 0 && req.url.indexOf('/build/') !== 0){
      res.sendFile(path.resolve(__dirname, '../../frontend/index.html'));
    }else {
      next();
    }
    // res.sendFile(path.resolve(__dirname, '../../frontend/index.html'));
  })

  done();

};
