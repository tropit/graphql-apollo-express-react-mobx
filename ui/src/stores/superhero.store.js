import { extendObservable, toJS } from 'mobx'
import SuperHero from '../api/superhero.api'

export default class SuperHeroStore {
  constructor () {
    extendObservable(this, {
      title: 'Super Heroes',
      structure: {
        name : '',
        email: '',
        superPower: '',
      },
      get allItems () {
        return SuperHeroStore.fetchSuperHeroes
      },
      get error () {
        return this.allItems.error.message || null
      },
      get loading () {
        console.log('loading data:', this.allItems.loading)
        return this.allItems.loading
      },
      get items () {
        return (this.allItems.data && toJS(this.allItems.data.result)) || []
      },
      get count () {
        return this.items.length
      },
      async add (input) {
        if ('id' in input) delete input.id
        if (!input.superPower || input.superPower === '') input.superPower = null
        return await SuperHero.add(input)
      },
      async update (input) {
        if (!input.superPower) input.superPower = null
        else input.superPower = parseInt(input.superPower)
        return await SuperHero.update(input)
      },
      async delete (id) {
        await SuperHero.delete(id)
      },
    })
  }
  static get fetchSuperHeroes () {
    return SuperHero.get()
  }
}
