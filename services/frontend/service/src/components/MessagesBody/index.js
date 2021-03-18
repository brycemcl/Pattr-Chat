import MessagesPane from '../MessagesPane/index'
import SendMessageForm from '../SendMessageForm'
import { makeStyles } from '@material-ui/core/styles'

// style our component
const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: '80px'
  }
}))

function MessagesBody ({ currentState, currentUser }) {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.body}>
        <MessagesPane
          currentState={currentState}
          currentUser={currentUser}
        />
      </div>
      <div>
        <SendMessageForm
          currentUser={currentUser}
          currentState={currentState}
        />
      </div>
    </div>
  )
}

export default MessagesBody
