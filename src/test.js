'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

// $.method('user.add').call({
//   name: 'hello2',
//   email: 'xxxx@qq.com',
//   password: '123456',
//   nickname: '测试1',
//   about: '好厉害呀'
// },console.log);

$.method('user.get').call({
  name: 'hello'
},console.log);

// $.method('user.update').call({
//   name: 'hello',
//   nickname: '我是sql'
// },console.log);
