import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Input from './ui/Input'
import Select from './ui/Select'
import Protected from './Protected'

@Protected
@observer
export default class SuperHeroCard extends Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
  }
  render () {
    const { props } = this
    const { row } = props
    let superPower
    let content
    if (row && Object.keys(row).length > 0 && props.inEdit !== row.id) {
      if (row.superPower !== null && row.superPower !== undefined) {
        superPower = <div>Super Power: <span className="primary">{row.superPower.name}</span></div>
      }
      content = <div>
        <div>{ row.name }</div>
        <div>{ row.email }</div>
        { superPower }
      </div>
    } else {
      content = <div>
        <div><Input name="name" value={ props.form.name } handleChange={props.updateForm} placeholder="Fill name"/></div>
        <div><Input name="email" value={ props.form.email } handleChange={props.updateForm} placeholder="Fill email"/></div>
        <div>
          <Select handleChange={props.updateForm} name="superPower" value={this.props.form.superPower} placeholder="Superpower..."
                  options={(this.props.store.superPowerStore.items || []).map(item => ({
                    value: item.id,
                    label: item.name,
                  }))}
          />
        </div>
      </div>
    }
    return content
  }
}
