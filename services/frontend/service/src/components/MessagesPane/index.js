/* eslint-disable camelcase */
import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from 'react'
import MessageInThread from '../MessageInThread'
import Spinner from '../Spinner'
import { gql, useSubscription } from '@apollo/client'

// style MessageInThread component
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

// graphql query to get messages via subscription from our pg db :)
const GET_MESSAGES = gql`
  subscription($conversationId: Int!) {
    conversations_by_pk(id: $conversationId) {
      messages(order_by: { id: asc }) {
        id
        message
        date_sent
        user {
          id
          display_name
        }
      }
      id
    }
  }
`

// component to handle all the messages in the message pane
function MessagesPane ({ currentState, currentUser, setSendingMessage }) {
  // call and use graphql query to get messages via subscription/web socket
  const { loading, error, data } = useSubscription(GET_MESSAGES, {
    variables: {
      conversationId: currentState.conversation
    }
  })
  const classes = useStyles()
  useEffect(() => {
    try {
      data.conversations_by_pk.messages.forEach((message) => {
        setSendingMessage((cs) => {
          const tempCs = [...cs]
          const indexToReplace = tempCs.findIndex((e) => e === message.id)
          tempCs.splice(indexToReplace, 1)
          return tempCs
        })
      })
    } catch {}
  }, [data, setSendingMessage])

  // render out the array of messages from this MessagesPane component
  if (loading) return <Spinner />
  if (error) return <p>Error :(</p>

  // array to store our collected messages in this component
  let messages = []

  /* loop through + render out messages back from graphql subscription
   * set the currently logged in user for each message so we can style them conditonally later
   * convert messages date from string to JS date (black magic idk how this works) */
  try {
    messages = data.conversations_by_pk.messages.map(({ ...message }) => {
      message.user.currentUser = message.user.id === currentUser.id
      const dateString = String(message.date_sent)
      const dateStringDelimited = dateString
        .split(/[-,:.T]+/)
        .map((s) => Number(s))

      message.date_sent = new Date(
        Date.UTC(
          dateStringDelimited[0],
          dateStringDelimited[1] - 1,
          dateStringDelimited[2],
          dateStringDelimited[3],
          dateStringDelimited[4],
          dateStringDelimited[5]
        )
      )

      return message
    })
  } catch {
    // if conversation doesn't have any messages
  }
  /* map out filtered messages, then loop through them and make new messages for each one
   * passing down props when necessary */
  const mappedMessages = messages.map(({ user, message, date_sent, id }) => {
    return (
      <MessageInThread
        key={id}
        date={date_sent} // eslint-disable-line camelcase
        messageText={message.text}
        messageName={user.display_name}
        currentUser={user.currentUser}
      />
    )
  })

  return <div className={classes.root}>{mappedMessages}</div>
}

export default MessagesPane
