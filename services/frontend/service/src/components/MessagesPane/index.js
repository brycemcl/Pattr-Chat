/* eslint-disable camelcase */
import MessageInThread from '../MessageInThread'
import { gql, useSubscription } from '@apollo/client'

// graphql query to get messages via subscription from our pg db :)
const GET_MESSAGES = gql`
  subscription($userId: Int!, $channelId: Int!, $conversationId: Int!) {
    users_by_pk(id: $userId) {
      channels(where: { id: { _eq: $channelId } }) {
        conversations(
          where: { id: { _eq: $conversationId }, messages: { user: {} } }
        ) {
          id
          messages {
            id
            message
            date_sent
            user {
              display_name
              id
            }
          }
        }
      }
    }
  }
`

// component to handle all the messages in the message pane
function MessagesPane ({ currentState, currentUser }) {
  // call and use graphql query to get messages via subscription/web socket
  const { loading, error, data } = useSubscription(GET_MESSAGES, {
    variables: {
      userId: currentUser.id,
      channelId: currentState.channel,
      conversationId: currentState.conversation
    }
  })

  // render out the array of messages from this MessagesPane component
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // array to store our collected messages in this component
  let messages = []

  /* loop through + render out messages back from graphql subscription
   * set the currently logged in user for each message so we can style them conditonally later
   * convert messages date from string to JS date */
  try {
    messages = data.users_by_pk.channels[0].conversations[0].messages.map(
      (message) => {
        message.user.currentUser = message.user.id === currentUser.id
        console.log(message.date_sent)
        message.date_sent = new Date(message.date_sent)
        return message
      }
    )
  } catch {}

  /* map out filtered messages, then loop through them and make new messages for each one
   * passing down props when necessary */
  const mappedMessages = messages.map(({ user, message, date_sent, id }) => {
    return (
      <MessageInThread
        key={id}
        date={date_sent} // eslint-disable-line camelcase
        messageText={message.text}
        messageName={user.display_name}
      />
    )
  })

  return (
    <main className='layout'>
      <section className='messaged'>{mappedMessages}</section>
    </main>
  )
}

export default MessagesPane
