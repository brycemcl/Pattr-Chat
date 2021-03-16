import React from 'react'
import Application from './components/Application'

import { WebSocketLink } from '@apollo/client/link/ws'
import { split, HttpLink, ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

// import { setContext } from '@apollo/client/link/context';

const HTTPS_URL = `http${process.env.REACT_APP_GRAPHQL_URL}`
const WSS_URL = `ws${process.env.REACT_APP_GRAPHQL_URL}`

const httpsLink = new HttpLink({
  uri: HTTPS_URL,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_ADMIN_SECRET
  }
})

const wssLink = new WebSocketLink({
  uri: WSS_URL,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_ADMIN_SECRET
      }
    }
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wssLink,
  httpsLink
)

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link
  })
}

const client = createApolloClient()

client
  .query({
    query: gql`
      query {
        users_by_pk(id: 10) {
          id
          display_name
        }
      }
    `
  })
  .then((result) => console.log(result.data))

function App () {
  return <Application />
}

export default App
