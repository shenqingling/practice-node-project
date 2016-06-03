'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

import {expect} from 'chai';
import request from '../test';

describe('user', function(){

  it('signup', async function(){

    try{
      const ret = await request.post('/api/signup',{
        name: 'test1',
        password: '12345678'
      });
      // console.log(ret);
      throw new Error('should throws email: missing parameter "email"')
    }catch(err){
      expect(err.message).to.equal('email: missing parameter "email"');
    }

    {
      const ret = await request.post('/api/signup',{
        name: 'test1',
        password: '12345678',
        email:'text1@example.com'
      });
      console.log(ret);
    }

  });

});
