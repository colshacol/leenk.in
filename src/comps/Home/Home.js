import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import axios from 'axios'
import { el, els, validateUrl } from '../functions'
import './Home.styl'

@observer
export default class Home extends Component {
  @observable submittedLinkStatus = 'none'
  @observable inputButtonSource = 'http://image.flaticon.com/icons/svg/189/189689.svg'
  @observable generatedShortlink = ''

  submitNewLink = (e) => {
    // For keyPress: If not 'enter', end event.
    if (e.type === 'keypress' && e.which !== 13) return

    // If paste, get pasted data + validate.
    // If click, get input value + validate.
    const [input, valid] = (e.type === 'paste')
      ? [
          e.clipboardData.getData('Text'),
          validateUrl(e.clipboardData.getData('Text'))
        ]
      : [
          el('#longlink-input').value,
          validateUrl(el('#longlink-input').value)
        ]; // < throws errors without it.

    (valid) // If submitted url is valid, call server for new shortlink.
      ? axios.post('/links/new', { url: input })
        .then(res => {
          handleValidLonglink(this, res.data)
        }).catch(err => console.log(err))
      // Otherwise, alert client of invalid longlink.
      : handleInvalidLonglink(this)
  }


  render() {
    return(
      <div className="Home">
        <div className={"input-section status-" + this.submittedLinkStatus}>
          <div id="input-components">
            <input
              id="longlink-input"
              onPaste={this.submitNewLink}
              onKeyPress={this.submitNewLink}
              placeholder="paste url here"
            />
            <img src={this.inputButtonSource} onClick={this.submitNewLink}/>
          </div>
        </div>
        <div id="shortlink-display">
          <a href={this.generatedShortlink}>
            <p>{this.generatedShortlink}</p>
          </a>
        </div>
      </div>
    )
  }
}


const handleValidLonglink = (_this, linkCode) => {
  _this.submittedLinkStatus = 'valid'
  _this.generatedShortlink = `http://localhost:8099/${linkCode}`
  _this.inputButtonSource = 'http://image.flaticon.com/icons/svg/56/56560.svg'
  setTimeout(() => _this.submittedLinkStatus = 'none', 5000)
}

const handleInvalidLonglink = (_this) => {
  _this.submittedLinkStatus = 'invalid'
  setTimeout(() => _this.submittedLinkStatus = 'none', 5000)
}
