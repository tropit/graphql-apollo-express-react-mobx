import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import LazyRoute from 'lazy-route'
import DevTools from 'mobx-react-devtools'

import TopBar from './TopBar'

@withRouter
@inject('store')
@observer
export default class App extends Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
  }
  componentDidMount () {
    this.authenticate()
  }
  authenticate (e) {
    if (e) e.preventDefault()
    this.store.appState.authenticate()
  }
  render () {
    return (
      <div className="wrapper">
        {/* <DevTools />*/}
        <TopBar />
        <Route
          exact
          path="/"
          render={props =>
            <LazyRoute {...props} component={import('./Home')} />
          }
        />
        <Route
          exact
          path="/super-heroes"
          render={props =>
            <LazyRoute {...props} storeName='superHeroStore' component={import('./SubPage')} />
          }
        />
        <Route
          exact
          path="/super-powers"
          render={props =>
            <LazyRoute {...props} storeName='superPowerStore' component={import('./SubPage')} />
          }
        />
        <Route
          exact
          path="/login"
          render={props =>
            <LazyRoute {...props} component={import('./Login')} />
          }
        />
        <Route
          exact
          path="/*"
          render={props =>
            <LazyRoute {...props} component={import('./NotFound')} />
          }
        />
        <footer>
          <a href="" target="_blank">
              @tropit
          </a>
          {' '}
            | github:
          {' '}
          <a href="https://github.com/tropit" target="_blank">
              tropit
          </a>
        </footer>
      </div>
    )
  }
}
