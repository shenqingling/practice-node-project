'use strict';

/**
* pratice Node.js projec}t
*
* @author sql370 <sql370@qq.com>
*/

module.exports = function (done) {

  // 用了中间件捕捉错误信息有异常，改进server.js中的routerWrap
  $.router.post('/api/topic/add',$.checkLogin, async function (req, res, next) {

    req.body.authorId = req.session.user._id;

    console.log(1, req.body);
    if('tags' in req.body){
      req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    // try{
    // console.log(2, req.body);
    const topic = await $.method('topic.add').call(req.body);
    // }catch(err){
    //     console.error(err);
    // }
    // console.log(3, topic);
    res.json({success: true, topic});

  });

  $.router.get('/api/topic/list', async function (req, res, next) {

    if('tags' in req.query){
      req.query.tags = req.query.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    const list = await $.method('topic.list').call(req.query);

    res.json({success: true, list});

  });

  $.router.get('/api/topic/item/:topic_id', async function (req, res, next) {

    const topic = await $.method('topic.get').call({_id: req.params.topic_id});
    if(!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

    res.json({success: true, topic});

  });

  done();

};
