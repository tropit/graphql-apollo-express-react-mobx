import { extendObservable, toJS } from 'mobx'
import SuperPower from '../api/superpower.api'

export default class SuperPowerStore {
  constructor () {
    extendObservable(this, {
      title: 'Super Powers',
      structure: {
        name: '',
        rank: '',
      },
      get allItems () {
        return SuperPowerStore.fetchItems
      },
      get error () {
        return (this.allItems.error && this.allItems.error.message) || null
      },
      get loading () {
        return this.allItems.loading
      },
      get items () {
        console.log('this.allItems.data:', this.allItems.data)
        // debugger
        return (this.allItems.data && toJS(this.allItems.data.result)) || []
      },
      get count () {
        return this.items.length
      },
      async add (input) {
        if (input.id) delete input.id
        console.log('input:', input)
        return await SuperPower.add(input)
      },
      async update (input) {
        return await SuperPower.update(input)
      },
      async delete (id) {
        return await SuperPower.delete(id)
      },
    })
  }
  static get fetchItems () {
    return SuperPower.get()
  }
}
