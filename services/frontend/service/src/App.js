import React from 'react'
import Application from './components/Application'

import { WebSocketLink } from '@apollo/client/link/ws'
import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

// import { setContext } from '@apollo/client/link/context';

/* https://github.com/hasura/nodejs-graphql-subscriptions-boilerplate/issues/3
 * this is establishing urls to graphql from react for http & (full duplex) web sockets */
const HTTPS_URL = `http${process.env.REACT_APP_GRAPHQL_URL}`
const WSS_URL = `ws${process.env.REACT_APP_GRAPHQL_URL}`

// provides parameters for react to establish a http link to graphql later on
const httpsLink = new HttpLink({
  uri: HTTPS_URL,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_ADMIN_SECRET
  }
})

// provides parameters for react to establish a full duplex web socket link to graphql later on
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

// this is the splitter that decides if a link being made will be http or a web socket link
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

// establishes/declares apollo client in our react app
const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link
  })
}

// creates apollo client in our react app
const client = createApolloClient()

/* take client from above, and perform the desired query for graphql to fetch whatever we desire from our postgress db
 * it then returns the result from that query to react in "result" */
// client
//   .query({
//     query: gql`
//       query {
//         users_by_pk(id: 10) {
//           id
//           display_name
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result.data));

function App () {
  return (
    <ApolloProvider client={client}>
      <Application />
    </ApolloProvider>
  )
}

export default App
