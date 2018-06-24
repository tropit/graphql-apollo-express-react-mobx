import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import SuperPowerCard from '../SuperPowerCard'
import SuperHeroCard from '../SuperHeroCard'
import Button from './Button'

// @Todo dynamic fields in view and form

@observer
export default class Box extends Component {
  @observable classes = ['subpage__container__box']
  @action addClass (clss) {
    this.classes.push(clss)
  }
  @action removeClass (clss) {
    this.classes.splice(this.classes.findIndex(c => c === clss), 1)
  }
  constructor () {
    super(...arguments)
    setTimeout(() => {
      this.addClass('subpage__container__box--show')
    }, 0)
  }
  render () {
    const { props } = this
    const { row } = props
    let buttons, card
    const editMode = row && Object.keys(row).length > 0 && props.inEdit !== row.id
    if (editMode) {
      buttons = <div>
        <Button onClick={e => props.load(row)} title="Edit" /> |&nbsp;
        <Button onClick={e => props.delete(row.id)} title="X" />
      </div>
    } else {
      const cancelBtn = row.id !== undefined && props.inEdit ? <span> |&nbsp;<Button onClick={() => props.clear(true)} title="Cancel" /></span> : ''
      buttons = <div>
        <Button onClick={() => props.send()} title={ props.sendLabel } />
        { cancelBtn }
      </div>
    }
    switch (props.storeName) {
      case 'superPowerStore':
        card = <SuperPowerCard { ...props }/>
        break
      case 'superHeroStore':
      default:
        card = <SuperHeroCard { ...props }/>
    }
    return <div className={this.classes.join(' ')} key={row.id}>
      <div>
        { card }
        <br />
        { buttons }
      </div>
    </div>
  }
}