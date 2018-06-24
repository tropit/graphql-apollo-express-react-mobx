import DataLoader from 'dataloader'

import { SuperPower as SuperPowerModel } from '../model'

function dataLoader (target) {
  return new DataLoader(target)
}

export const getSuperPowersByIds = dataLoader((ids) => SuperPowerModel.getSuperPowersByIds(ids))
