import { useState } from 'react'
import MessagesPane from '../MessagesPane/index'
import SendMessageForm from '../SendMessageForm'
import { makeStyles } from '@material-ui/core/styles'

// style our components
const useStyles = makeStyles((theme) => ({
  messageContainer: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // width: '100%'
    // // height: '100vh'
  },
  body: {
    // // marginTop: '80px',
    // // maxHeight: '80vh',
    // // overflowY: 'scroll'
    // height: '100%',
    // flex: 1
  },
  sendMessageForm: {
    // maxHeight: '80vh',
    // minHeight: '80vh'
  }
}))

// MessagesBody component
function MessagesBody ({ currentState, currentUser }) {
  const classes = useStyles()
  const [sendingMessage, setSendingMessage] = useState([])
  return (
    <div className={classes.messageContainer}>
      <div className={classes.body}>
        <MessagesPane
          currentState={currentState}
          currentUser={currentUser}
          setSendingMessage={setSendingMessage}
          // sendingMessage={sendingMessage}
        />
      </div>
      <div className={classes.sendMessageForm}>
        <SendMessageForm
          currentUser={currentUser}
          currentState={currentState}
          setSendingMessage={setSendingMessage}
          sendingMessage={sendingMessage}
        />
      </div>
    </div>
  )
}

export default MessagesBody
