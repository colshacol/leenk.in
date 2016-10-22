import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import axios from 'axios'
import { el, els, validateUrl } from '../functions'
import './Home.styl'

@observer
export default class Home extends Component {

  submitNewLink = (e) => {
    // For keyPress: If not 'enter', end event.
    if (e.type === 'keypress' && e.which !== 13) return

    // If paste, get pasted data + validate.
    // If click, get input value + validate.
    const [input, valid] = (e.type === 'paste')
      ?
        [
          e.clipboardData.getData('Text'),
          validateUrl(e.clipboardData.getData('Text'))
        ]
      :
        [
          el('.Home > input').value,
          validateUrl(el('.Home > input').value)
        ]

    if (valid) axios.post('/links/new', { url: input })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    else console.log('invalid')
  }

  render() {
    return(
      <div className="Home">
        <h1>home</h1>
        <input
          onPaste={this.submitNewLink}
          onKeyPress={this.submitNewLink}
          placeholder="paste url here"
        />
        <button onClick={this.submitNewLink}>Submit</button>
      </div>
    )
  }
}
