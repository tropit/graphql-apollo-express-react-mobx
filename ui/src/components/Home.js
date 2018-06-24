import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
  }

  render () {
    return (
      <div className="page home">
        <header>
          <div className="hero-unit">
            <div className="react-logo" />
            <h1>GraphQL Apollo React MobX Boilerplate</h1>
          </div>
          <div className="hero-subunit">
            <h4>
							A simple starting point for GraphQL Apollo MobX React with routing, data-fetching and state management!
            </h4>
          </div>
          <div className="github-buttons">
            <a
              href="https://github.com/mhaagens/react-mobx-react-router4-boilerplate"
              target="_blank"
            >
							Download from GitHub
            </a>
          </div>
        </header>
        <main>
          <div className="section-header">
            <h3>Included libraries</h3>
            <hr />
          </div>


          <div className="boilerplate-item">
            <div className="boilerplate-logo graphql" />
            <div className="boilerplate-item-content">
              <a
                href="https://github.com/graphql/graphql-js"
                target="_blank"
              >
                <h4>GraphQL</h4>
              </a>
              <small>Query Language</small>
              <p>
                GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.              </p>
            </div>
          </div>
          <div className="boilerplate-item">
            <div className="boilerplate-logo apollo" />
            <div className="boilerplate-item-content">
              <a
                href="https://github.com/apollographql/apollo-client/"
                target="_blank"
              >
                <h4>Apollo</h4>
              </a>
              <small>Community-Driven GraphQL client</small>
              <p>
                Apollo Client is a fully-featured caching GraphQL client with integrations for React, Angular, and more
              </p>
            </div>
          </div>
          <div className="boilerplate-item">
            <div className="boilerplate-logo react" />
            <div className="boilerplate-item-content">
              <a
                href="https://facebook.github.io/react/"
                target="_blank"
              >
                <h4>React</h4>
              </a>
              <small>UI Library</small>
              <p>
								React makes it painless to create
                {' '}
                <br />
								interactive UIs.
              </p>
            </div>
          </div>
          <div className="boilerplate-item">
            <div className="boilerplate-logo mobx" />
            <div className="boilerplate-item-content">
              <a
                href="http://mobxjs.github.io/mobx/"
                target="_blank"
              >
                <h4>MobX</h4>
              </a>
              <small>Reactive State Management</small>
              <p>
								MobX is a battle tested library that makes state management simple and scalable.
              </p>
            </div>
          </div>
          <div className="boilerplate-item">
            <div className="boilerplate-logo reactrouter" />
            <div className="boilerplate-item-content">
              <a
                href="https://react-router.now.sh/"
                target="_blank"
              >
                <h4>React Router 4</h4>
              </a>
              <small>Routing Library</small>
              <p>
								React Router is a declarative way to render, at any location, any UI that you and your team can think up.
              </p>
            </div>
          </div>
          <div className="boilerplate-item">
            <div className="boilerplate-logo webpack" />
            <div className="boilerplate-item-content">
              <a href="http://webpack.github.io/" target="_blank">
                <h4>Webpack 2</h4>
              </a>
              <small>Module Bundler</small>
              <p>
								Webpack takes modules with dependencies and generates static assets representing those modules.
              </p>
            </div>
          </div>

          <div className="section-header extras">
            <h4>Extras</h4>
            <hr />
            <ul>
              <li>✓ Async Component Loading</li>
              <li>✓ Code-splitting</li>
              <li>✓ Extracted and autoprefixed CSS</li>
            </ul>
          </div>
        </main>
      </div>
    )
  }
}
