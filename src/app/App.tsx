import React from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'
import Layout from '../components/layout'
import Page from './page'
import config from '../configs/blog.json'

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={require('./home').default} />
          <Route
            exact
            path="/archives"
            component={require('./archives').default}
          />
          <Route
            exact
            path="/tags/:name"
            component={require('./tags').default}
          />
          <Route
            exact
            path="/categories/:number"
            component={require('./categories').default}
          />
          <Route
            exact
            path="/posts/:id"
            component={require('./post').default}
          />
          {config.pages.map(page => (
            <Route exact key={page.path} path={page.path}>
              <Page
                title={page.title}
                issueNumber={page.issueNumber}
                allowComments={page.allowComments}></Page>
            </Route>
          ))}
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
