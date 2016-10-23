import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import axios from 'axios'
import './Frame.styl'

@observer
export default class Frame extends Component {

  render() {
    return(
      <div className="Frame">
        <h1>Link Shortener</h1>
        {this.props.children}
      </div>
    )
  }
}
