import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import ($NAME)Store from './($NAME).store.js'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import axios from 'axios'
import './($NAME).($CSS)'


@observer
export default class ($NAME) extends Component {
  // shouldComponentUpdate() {}
  // componentWillMount() {}
  // componentDidMount() {}

  render() {
    return (
      <div className="($NAME)">
        <div className="container">

        </div>
      </div>
    )
  }
}
