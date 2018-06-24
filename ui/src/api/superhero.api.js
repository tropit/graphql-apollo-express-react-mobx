import BaseApi from './'
import queries from './quries.graphql'

export default class SuperHeroApi extends BaseApi {
  static get (where) {
    if (!where) {
      return this._fetch(queries.superHero_getAll)
    }
    return this._fetch(queries.superHero_getByName, where)
  }
  static add (input) {
    return this._mutate(queries.superHero_add, { input }, [ queries.superPower_getAll, queries.superHero_getAll ])
  }
  static update (input) {
    return this._mutate(queries.superHero_update, { input }, [ queries.superPower_getAll, queries.superHero_getAll ])
  }
  static delete (id) {
    return this._mutate(queries.superHero_delete, { input: { id } }, [ queries.superPower_getAll, queries.superHero_getAll ])
  }
}