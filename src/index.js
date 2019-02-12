import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
// import 'antd-doddle/dist/index.css';
import Layout from './pages';
import './style/index.less';

function Root({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
}
render((
  <Root />
), document.getElementById('app'));