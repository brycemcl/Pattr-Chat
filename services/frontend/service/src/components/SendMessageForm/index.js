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
const handleSubmitForm = (event, message, sendMessage, currentUser, currentState, setMessage) => {
  event.preventDefault()
  setMessage('')

  return sendMessage({
    variables: {
      conversationId: currentState.conversation,
      userId: currentUser.id,
      message: { text: message }
    }
  })
}

// graphql mutator to send a message to our postgress db
const SEND_MESSAGES = gql`
  mutation ($conversationId:Int!, $userId: Int!, $message: json!) {
    insert_messages_one(object: {conversation_id: $conversationId, message: $message, user_id: $userId}) {
      id
      message
    }
  }
`

// component to send the message from the form
function SendMessageForm ({ currentUser, currentState }) {
  // state to store what the user types in the composer as a controlled component
  const [message, setMessage] = useState('')
  const classes = useStyles()

  // using our mutation to send messages
  const [sendMessage] = useMutation(SEND_MESSAGES)

  return (
    <form>
      <Composer value={message} setValue={setMessage} />
      <Button
        onClick={(event) => handleSubmitForm(
          event,
          message,
          sendMessage,
          currentUser,
          currentState,
          setMessage
        )}
        variant='contained'
        color='primary'
        className={classes.button}
      >Send
      </Button>
    </form>
  )
}

export default SendMessageForm
