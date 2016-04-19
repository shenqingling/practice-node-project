'use strict';

/**
* pratice Node.js projec}t
*
* @author sql370 <sql370@qq.com>
*/

module.exports = function (done) {

  // 当前用户的信息
  $.router.get('/api/login_user',async function (req, res, next) {
    res.apiSuccess({user: req.session.user, token: req.session.logout_token});
  });

  // 登录
  $.router.post('/api/login',async function (req, res, next) {

    // try{}catch(){}替换成在express.js中拦截api错误
    // try{
      if(!req.body.password) return next(new Error('missing password'));

      const user = await $.method('user.get').call(req.body);
      if(!user) return next(new Error('user does not exists'));

      if(!$.utils.validatePassword(req.body.password, user.password)){
        return next(new Error('incorrect password'));
      }

      req.session.user = user;
      //随机生成token
      req.session.logout_token = $.utils.randomString(20);

      res.apiSuccess({token:req.session.logout_token});
    // } catch (err){
    //   next(err);
    // }

  })

  // 登出
  $.router.get('/api/logout',async function (req, res, next) {

    if(req.session.logout_token && req.query.token !== req.session.logout_token){
      // console.log(req.query);
      // console.log(req.query.token);
      // console.log(req.session.logout_token);
      return next(new Error('invalid token'));
    }

    delete req.session.user;
    delete req.session.logout_token;

    res.apiSuccess({});

  })

  // 登出
  $.router.post('/api/logout',async function (req, res, next) {

    delete req.session.user;
    delete req.session.logout_token;

    res.apiSuccess({});

  })

  // 注册
  $.router.post('/api/signup',async function (req, res, next) {

    const user = await $.method('user.add').call(req.body);

    res.apiSuccess({user: user});

  })

  done();

};
