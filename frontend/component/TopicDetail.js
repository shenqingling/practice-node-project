import React from 'react';
import 'highlight.js/styles/github-gist.css';
import {getTopicDetail, addComment, deleteComment} from '../lib/client';
import {renderMarkdown} from '../lib/utils';
import { Router, Route, Link, browserHistory } from 'react-router';
import CommentEditor from './CommentEditor';

export default class TopicDetail extends React.Component{

  constructor(pros){
    super(pros);
    this.state = {};
  }

  componentDidMount(){
    this.refresh();
  }

  refresh(){
    getTopicDetail(this.props.params.id)
      .then(topic => {
        topic.html = renderMarkdown(topic.content);
        if(topic.comments){
          for(const item of topic.comments){
            item.html = renderMarkdown(item.content);
          }
        }
        this.setState({topic});
      })
      .catch(err => console.error(err));
  }

  render(){
    const topic = this.state.topic;
    if(!topic){
      return(
        <div>正在加载...</div>
      );
    }
    return(
      <div>
        <h2>{topic.title}</h2>
        <Link to={`/topic/${topic._id}/edit`} className="btn btn-primary">编辑</Link>
        <hr />
        <p>标签：
          {topic.tags.map((tag, i) => {
            return(
              <span className="label label-primary" style={{marginRight: 10}} key={i}>{tag}</span>
            );
          })}
        </p>
        <section dangerouslySetInnerHTML={{__html: topic.html}}></section>
        <CommentEditor
          title="发表评论"
          onSave={(comment, done) => {
            addComment(this.state.topic._id, comment.content)
              .then(comment => {
                done();
                this.refresh();
              })
              .catch(err => {
                done();
                alert(err);
              });
          }}
        />
        <ul className="list-group">
          {topic.comments.map((item, i) => {
            return(
              <li className="list-group-item" key={i}>
                {item.authorId}于{item.createdAt}说:
                <p dangerouslySetInnerHTML={{__html: item.html}}></p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
