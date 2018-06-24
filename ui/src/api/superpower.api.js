import BaseApi from './'
import queries from './quries.graphql'

console.log('queries:', queries)

export default class SuperPowerApi extends BaseApi {
  static get () {
    return this._fetch(queries.superPower_getAll)
  }
  static add (input) {
    return this._mutate(queries.superPower_add, { input }, [ queries.superHero_getAll, queries.superPower_getAll ])
  }
  static update (input) {
    return this._mutate(queries.superPower_update, { input }, [ queries.superHero_getAll, queries.superPower_getAll ])
  }
  static delete (id) {
    return this._mutate(queries.superPower_delete, { input: { id } }, [ queries.superHero_getAll, queries.superPower_getAll ])
  }
}