import { makeStyles } from '@material-ui/core/styles'
import Avatar from './Avatar'
import MessageMetadata from './MessageMetadata'
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
// style MessageInThread component
const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '100%'
  },
  currentUser: { alignSelf: 'flex-end' },
  root: {
    width: '75%',
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  messageContent: {
    flex: 1,
    overflow: 'auto',
    overflowWrap: 'anywhere'
  },
  figure: {
    margin: 0,
    marginRight: theme.spacing(2)
  }
}))

// MessageinThread component
const MessageInThread = ({ date, messageName, messageText, currentUser }) => {
  const classes = useStyles()
  return (
    <Paper className={clsx(classes.root, currentUser && classes.currentUser)}>
      <div className={classes.messageContainer}>
        <figure className={classes.figure}>
          <Avatar name={messageName} />
        </figure>
        <div className={classes.messageContent}>
          <MessageMetadata name={messageName} date={date} />
          {messageText}
        </div>
      </div>
    </Paper>
  )
}

export default MessageInThread
