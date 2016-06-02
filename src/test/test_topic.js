'use strict';

/**
* pratice Node.js project
*
* @author sql370 <sql370@qq.com>
*/

import {expect} from 'chai';
import request from '../test';

describe('topic', function(){

  it('list', async function(){

    const list = await request.get('/api/topic/list');
    console.log(list);

  });

});
