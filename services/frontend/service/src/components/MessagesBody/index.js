import { useState, useEffect } from 'react'
import MessagesPane from '../MessagesPane/index'
import SendMessageForm from '../SendMessageForm'
import { makeStyles } from '@material-ui/core/styles'
import UsersInChatsBar from '../UsersInChatsBar'

// style our components
const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  body: {
    overflow: 'auto',
    height: '70vh'
  },
  sendMessageForm: {
    height: '150px',
    paddingBottom: '10vh'
  },
  UsersInChatsBar: {
    display: 'flex',
    height: '10%',
    backgroundColor: '#f5f5f5',
    padding: '5px'
  }
}))

// MessagesBody component
function MessagesBody ({ currentState, currentUser }) {
  const classes = useStyles()
  const [sendingMessage, setSendingMessage] = useState([])

  /* https://stackoverflow.com/questions/61851659/chat-scroll-to-bottom-when-send-a-message-using-react
   * useeffect that triggers whenever our sendingMessage state changes & a message is sent to auto scroll our div to the bottom of the screen */
  useEffect(() => {
    document.querySelector(
      '#messages-scrollbar'
    ).scrollTop = document.querySelector('#messages-scrollbar').scrollHeight
  }, [sendingMessage])

  return (
    <div className={classes.messageContainer}>
      <div className={classes.UsersInChatsBar}>
        <UsersInChatsBar
          currentState={currentState}
          currentUser={currentUser}
        />
      </div>
      <div>
        <div id='messages-scrollbar' className={classes.body}>
          <MessagesPane
            currentState={currentState}
            currentUser={currentUser}
            setSendingMessage={setSendingMessage}
          />
        </div>
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
