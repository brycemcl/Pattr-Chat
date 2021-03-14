import Sidebar from '../Sidebar'
import MessagesBody from '../MessagesBody'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  messagesBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '100px'
  }
}))

function ChatRoom () {
  const classes = useStyles()
  return (
    <section>
      <div>
        <Sidebar className={classes.sidebar} display='flex' />
      </div>
      <div>
        <MessagesBody className={classes.messagesBody} display='flex' />
      </div>
    </section>
  )
}

export default ChatRoom
