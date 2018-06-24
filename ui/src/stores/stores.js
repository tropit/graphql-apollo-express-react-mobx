import { store } from 'rfx-core'

import appState from './AppState'
import superHeroStore from './superhero.store'
import superPowerStore from './superpower.store'

export default store.setup({
  appState,
  superHeroStore,
  superPowerStore,
})
