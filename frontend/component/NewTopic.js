import React from 'react';
import jQuery from 'jquery';
import {addTopic} from '../lib/client';
import {redirectURL} from '../lib/utils';

export default class NewTopic extends React.Component{

  constructor(pros){
    super(pros);
    this.state = {};
  }

  //
  handleChange(name, e){
    this.state[name] = e.target.value;
  }

  // 点击‘保存’
  handleSubmit(e){
    const $btn = jQuery(e.target);
    $btn.button('loading');
    addTopic(this.state.title, this.state.content, this.state.tags)
      .then(ret => {
        $btn.button('reset');
        console.log(ret);
        redirectURL(`/topic/${ret._id}`);
      })
      .catch(err => {
        $btn.button('reset');
        alert(err);
      });
  }

  render(){

    return(
      <div className="panel panel-primary">
        <div className="panel-heading">发表新主题</div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label htmlFor="ipt-title">标题</label>
              <input type="text" className="form-control" id="ipt-title" onChange={this.handleChange.bind(this, 'title')} placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="ipt-tags">标签</label>
              <input type="text" className="form-control" id="ipt-tags" onChange={this.handleChange.bind(this, 'tags')} placeholder="" />
              <p className="help-block">多个标签使用半角都好分隔</p>
            </div>
            <div className="form-group">
              <label htmlFor="ipt-content">内容</label>
              <textarea type="text" className="form-control" rows="10" id="ipt-content" onChange={this.handleChange.bind(this, 'content')} placeholder=""></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>保存</button>
          </form>
        </div>
      </div>
    );
  }
}
