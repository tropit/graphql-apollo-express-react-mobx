import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Input from './ui/Input'
import Protected from './Protected'
import { parseUpdateProperty } from '../utils/general'

@Protected
@observer
export default class SuperPowerCard extends Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
  }
  render () {
    const { props } = this
    const { row } = props
    let content
    if (row && Object.keys(row).length > 0 && props.inEdit !== row.id) {
      content = <div>
        <div>{ row.name }</div>
        <div>{ row.rank }</div>
        <div>Owners: <span className='primary'>{ row.owners.map((owner) => owner.name).filter((item) => item).join(', ') }</span></div>
      </div>
    } else {
      content = <div>
        <div><Input name="name" value={ props.form.name } handleChange={props.updateForm} placeholder="Fill name"/></div>
        <div><Input name="rank" value={ props.form.rank } handleChange={(...args) => parseUpdateProperty(...args, props.updateForm)} placeholder="Fill rank"/></div>
      </div>
    }
    return content
  }
}
