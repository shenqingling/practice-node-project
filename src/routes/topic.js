'use strict';

/**
* pratice Node.js projec}t
*
* @author sql370 <sql370@qq.com>
*/


module.exports = function (done) {


  // 用了中间件捕捉错误信息有异常，改进server.js中的routerWrap
  // 增加topic记录
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
    res.apiSuccess({topic});

  });


  // 获取topic的list
  $.router.get('/api/topic/list', async function (req, res, next) {

    if('tags' in req.query){
      req.query.tags = req.query.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    const list = await $.method('topic.list').call(req.query);

    res.apiSuccess({list});

  });

  // 获取某具体的topic
  $.router.get('/api/topic/item/:topic_id', async function (req, res, next) {

    const topic = await $.method('topic.get').call({_id: req.params.topic_id});
    if(!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

    res.apiSuccess({topic});

  });

  // 修改某具体的topic
  $.router.post('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {

    if('tags' in req.body){
      req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    req.body._id = req.params.topic_id;
    await $.method('topic.update').call(req.body);

    const topic = await $.method('topic.get').call({_id: req.params.topic_id});

    res.apiSuccess({topic});

  });

  // 删除某具体的topic
  $.router.delete('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {

    const topic = await $.method('topic.delete').call({_id: req.params.topic_id});

    res.apiSuccess({topic});

  });

  // 增加topic的评论
  $.router.post('/api/topic/item/:topic_id/comment/add', $.checkLogin, async function (req, res, next) {

    req.body._id = req.params.topic_id;
    // console.log(req.session.user._id);
    req.body.authorId = req.session.user._id;
    const comment = await $.method('topic.comment.add').call(req.body);

    res.apiSuccess({comment});

  });

  // 获取topic的某条评论
  $.router.post('/api/topic/item/:topic_id/comment/get', async function (req, res, next) {

    req.body._id = req.params.topic_id;

    const comment = await $.method('topic.comment.get').call({
      _id: req.params.topic_id,
      cid: req.body.cid
    });

    res.apiSuccess({comment});

  });

  // 删除topic的某条评论
  $.router.post('/api/topic/item/:topic_id/comment/delete', $.checkLogin, async function (req, res, next) {

    req.body._id = req.params.topic_id;

    const query = {
      _id: req.params.topic_id,
      cid: req.body.cid
    };
    const comment = await $.method('topic.comment.get').call(query);

    if(!(comment && comment.comments && comment.comments[0] &&
        comment.comments[0].authorId.toString() === req.session.user._id.toString())){
      return next(new Error('access denied'));
    }

    await $.method('topic.comment.delete').call(query);

    res.apiSuccess({comment: comment.comments[0]});

  });

  done();

};
