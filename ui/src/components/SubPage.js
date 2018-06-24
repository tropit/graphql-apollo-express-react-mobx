import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable, action } from 'mobx'

import Box from './ui/Box'
import Protected from './Protected'
import DataWrapper from './DataWrapper'

const BASE_FORM = {
  name: '',
  email: '',
}

@Protected
@DataWrapper
@inject('store')
@observer
export default class SubPage extends Component {
  constructor () {
    super(...arguments)
    this.store = this.props.store[this.props.storeName]
    this.baseForm = this.store.structure ? { ...this.store.structure } : BASE_FORM
  }
  @observable form = { ...this.baseForm }
  @observable editForm = { ...this.baseForm }
  @observable error = null
  @observable inEdit
  deleteItem (id) {
    this.store.delete(id)
  }
  @action updateEditForm (key, value) {
    this.updateForm(key, value, true)
  }
  @action updateForm (key, value, edit) {
    const form = edit ? 'editForm' : 'form'
    this[form][key] = value
  }
  @action clearForm (edit = false) {
    this[edit ? 'editForm' : 'form'] = { ...this.baseForm }
  }
  @action setError (error) {
    this.error = error.replace(/_/g, ' ').toLowerCase()
  }
  @action reset (edit = false) {
    this.clearForm(edit)
    if (edit) {
      this.clearInEdit()
    }
  }
  @action load (row) {
    const { id } = row
    this.inEdit = id
    for (const key of Object.keys(this.store.structure)) {
      this.editForm.id = row.id
      if (key === 'superPower' && row[key].id) {
        this.editForm[key] = row[key].id
      } else {
        this.editForm[key] = row[key]
      }
    }
    this.putInEdit(id)
  }
  @action async send (edit = false) {
    let res
    console.log('edit', edit, this.form)
    if (edit) {
      res = await this.store.update(this.editForm)
    } else {
      res = await this.store.add(this.form)
    }
    console.log('res:', res)
    if (res.data.result.error) {
      this.setError(res.data.result.error)
    } else {
      this.reset(edit)
    }
  }
  @action sendUpdate () {
    return this.send(true)
  }
  @action sendLabel (id) {
    return id !== undefined ? 'Update' : 'Add'
  }
  @action putInEdit (id) {
    this.inEdit = id
  }
  @action clearInEdit () {
    this.inEdit = null
  }
  @computed get boxes () {
    return [...this.store.items, {}].map(row => <Box key={ row.id || 'new' } row={ row }
      inEdit={this.inEdit}
      form={this[row.id !== undefined ? 'editForm' : 'form']}
      load={this.load.bind(this)}
      send={this[row.id !== undefined ? 'sendUpdate' : 'send'].bind(this)}
      clear={this.reset.bind(this)}
      sendLabel={this.sendLabel(row.id)}
      updateForm={this[row.id !== undefined ? 'updateEditForm' : 'updateForm'].bind(this)}
      delete={this.deleteItem.bind(this)}
      storeName={this.props.storeName}
      store={this.props.store}
    />)
  }
  render () {
    if (this.store.loading) {
      console.log('this.store.loading:', this.store.loading)
    }
    const loading = this.store.loading ? <h3>
      loading...
    </h3> : ''
    return (
      <div className="page posts">
        { loading }
        <h1>{ this.store.title }</h1>
        <p className="subheader">
          { this.store.title } are fetched from local graphql server
          <span className="error">
            { this.error }
          </span>
        </p>
        <hr />
        <div className="subpage__container">
          { this.boxes }
        </div>
      </div>
    )
  }
}
