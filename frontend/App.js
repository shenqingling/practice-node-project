import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

import Header from './component/Header';
import Footer from './component/Footer';
import TopicList from './component/TopicList';
import TopicDetail from './component/TopicDetail';

class Index extends React.Component {
  render() {
    return(
      <div className="container">
        <Header />
        {this.props.children ? this.props.children : <TopicList />}
        <Footer />
      </div>
    );
  }
}

export default class App extends React.Component {
  render() {
    // 这样实现不了跳转到首页，因为 <Link> 跳转必须纳入 <Router> ,所以封装成组件 <Index>
    // <div>
    //   <Header />
    //   <Router history={browserHistory}>
    //     <Route path="/" component={Index}>
    //       <Route path="/" component={TopicList} />
    //       <Route path="/topic/:id" component={TopicDetail}/>
    //     </Route>
    //   </Router>
    //   <Footer />
    // </div>
    return (
        <Router history={browserHistory}>
          <Route path="/" component={Index}>
            <Route path="/topic/:id" component={TopicDetail}/>
          </Route>
        </Router>
    );
  }
}
