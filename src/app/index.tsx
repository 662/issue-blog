import React from 'react'
import { Helmet } from 'react-helmet'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faArchive,
  faComments,
  faExternalLinkAlt,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons'
import { faFolder, faFile, faStar } from '@fortawesome/free-regular-svg-icons'
import App from './App'
import config from '../configs/blog.json'
import introspectionQueryResultData from '../configs/fragment-types.json'

library.add(
  faHome,
  faArchive,
  faComments,
  faFolder,
  faFile,
  faStar,
  faExternalLinkAlt,
  faAddressCard
)

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})
const cache = new InMemoryCache({ fragmentMatcher })

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${config.github.token}`,
      },
    })
  },
})

const ApolloApp: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Helmet>
        <title>
          {config.title} - {config.subtitle}
        </title>
        <meta name="Keywords" content={config.keywords} />
        <meta name="Description" content={config.description} />
      </Helmet>
      <App />
    </ApolloProvider>
  )
}

export default ApolloApp
