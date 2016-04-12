import 'bootstrap-webpack';
import React from 'react';
import ReactDom from 'react-dom';

console.log('hello, world');

class App extends React.Component {
  render() {
    return(
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

ReactDom.render(<App />, document.body);
