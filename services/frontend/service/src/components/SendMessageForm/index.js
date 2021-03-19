/* eslint-disable multiline-ternary */
import { useState } from 'react'
import Composer from '../Composer'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useMutation } from '@apollo/client'

// style our  material UI button
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  }
}))

/* helper function to handle the submission of the form in this controlled componentt
 * clear the controlled component after sending a message with graphql to our db */
const handleSubmitForm = (
  event,
  message,
  sendMessage,
  currentUser,
  currentState,
  setMessage,
  setSendingMessage
) => {
  event.preventDefault()
  setMessage('')
  setSendingMessage((cs) => {
    return [...cs, true]
  })
  return sendMessage({
    variables: {
      conversationId: currentState.conversation,
      userId: currentUser.id,
      message: { text: message }
    }
  })
    .then(({ data }) => data.insert_messages_one.id)
    .then((messageId) => {
      setSendingMessage((cs) => {
        const tempCs = [...cs]
        const indexToReplace = tempCs.findIndex((e) => e === true)
        tempCs[indexToReplace] = messageId
        return tempCs
      })
    })
    .catch((err) => {
      console.error(err)
      setSendingMessage((cs) => {
        const tempCs = [...cs]
        const indexToReplace = tempCs.findIndex((e) => e === true)
        tempCs.splice(indexToReplace, 1)
        return tempCs
      })
    })
}

// graphql mutator to send a message to our postgress db
const SEND_MESSAGES = gql`
  mutation($conversationId: Int!, $userId: Int!, $message: json!) {
    insert_messages_one(
      object: {
        conversation_id: $conversationId
        message: $message
        user_id: $userId
      }
    ) {
      id
      message
    }
  }
`

// component to send the message from the form
function SendMessageForm ({
  currentUser,
  currentState,
  sendingMessage,
  setSendingMessage
}) {
  // state to store what the user types in the composer as a controlled component
  const [message, setMessage] = useState('')
  const classes = useStyles()

  // using our mutation to send messages & store that in state
  const [sendMessageData] = useMutation(SEND_MESSAGES)
  const sendMessage = (event) =>
    handleSubmitForm(
      event,
      message,
      sendMessageData,
      currentUser,
      currentState,
      setMessage,
      setSendingMessage
    )
  return (
    <form>
      {!sendingMessage.length ? (
        <>
          <Composer
            currentState={currentState}
            value={message}
            setValue={setMessage}
            sendMessage={sendMessage}
          />
          <Button
            onClick={(e) => sendMessage(e)}
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Send
          </Button>
        </>
      ) : (
        <p>spinner goes here</p>
      )}
    </form>
  )
}

export default SendMessageForm
