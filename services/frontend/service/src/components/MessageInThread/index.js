import { makeStyles } from '@material-ui/core/styles'
import Avatar from './Avatar'
import MessageMetadata from './MessageMetadata'
import Paper from '@material-ui/core/Paper'

// style MessageInThread component
const useStyles = makeStyles({
  messageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1.25em',
    width: '100%'
  },
  root: {
    maxWidth: '57%',
    padding: '1rem',
    marginTop: '20px',
    marginBottom: '15px',
    marginLeft: '290px'
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
    margin: 1
  }
})

// MessageinThread component
const MessageInThread = ({
  date,
  messageName,
  messageText = 'Test message'
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <div className={classes.messageContainer}>
        <figure className={classes.figure}>
          <Avatar name='Bob' />
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
