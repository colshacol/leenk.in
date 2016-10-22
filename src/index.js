import React from 'react'
import ReactDOM from 'react-dom'
import { Link, browserHistory, Router, Route, IndexRoute } from 'react-router'

// Frame holds components that persist across views.
import Frame from './comps/Frame/Frame'
import Home from './comps/Home/Home'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Frame}>
      <IndexRoute component={Home}></IndexRoute>
    </Route>
  </Router>,
  document.getElementById('root')
)
