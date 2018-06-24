import React, { Component } from 'react'
import { observer } from 'mobx-react'

import 'react-select/dist/react-select.css'

@observer
export default class SelectApp extends Component {
  onChange (e) {
    this.props.handleChange(this.props.name, e.target.value)
  }
  render () {
    const options = this.props.options.map((option) => {
      return <option value={option.value} key={option.value}>{option.label}</option>
    })
    const { props } = this
    return <select value={props.value || ''} type="text" name={ props.name } placeholder={props.placeholder} onChange={ this.onChange.bind(this) }>
      <option value="">None</option>
      {options}
    </select>
  }
}


