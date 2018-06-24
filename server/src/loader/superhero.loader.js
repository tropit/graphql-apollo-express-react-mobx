import DataLoader from 'dataloader'

import { SuperHero as SuperHeroModel } from '../model'

export default class SuperHero {
  constructor (data) {
    this.id = data.id
    this._id = data._id
    this.name = data.name
    this.email = data.email
  }
}

function dataLoader (target) {
  return new DataLoader(target)
}

export const getSuperHeroesByName = dataLoader((names) => SuperHeroModel.getSuperHeroesByName(names))
export const getSuperHeroById = dataLoader((id) => SuperHeroModel.getSuperHeroById(id))
export const getSuperHeroesByIds = dataLoader((ids) => SuperHeroModel.getSuperHeroesByIds(ids))
export const getAll = dataLoader((id) => SuperHeroModel.getAll(id))
