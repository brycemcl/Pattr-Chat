import { gql } from '@apollo/client'
// graphql query to get public channels for users to display to the client
const GET_PUBLIC_CHANNELS = gql`
  subscription($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      users_channels(order_by: { id: desc }) {
        channel {
          name
          id
          conversations(
            where: { public: { _eq: true } }
            order_by: { id: desc }
          ) {
            id
            name
            public
          }
        }
      }
    }
  }
`

// graphql query to get private channels for users to display to the client
const GET_PRIVATE_CHANNELS = gql`
  subscription($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      users_conversations(
        where: { conversation: { public: { _eq: false } } }
        order_by: { id: desc }
      ) {
        id
        conversation {
          channel_id
          id
          name
        }
      }
    }
  }
`
export { GET_PUBLIC_CHANNELS, GET_PRIVATE_CHANNELS }
