import { makeStyles } from '@material-ui/core/styles'
import Avatar from './Avatar'
import MessageMetadata from './MessageMetadata'
import Message from './Message'
import Paper from '@material-ui/core/Paper'

// style MessageInThread component
const useStyles = makeStyles({
  root: {
    // maxWidth: 475,
    // padding: '1rem',
    // marginTop: '20px',
    // marginBottom: '15px',
    // marginLeft: '275px'
  },
  bullet: {
    // display: 'inline-block',
    // margin: '0 2px',
    // transform: 'scale(0.8)'
  },
  title: {
    // fontSize: 14
  },
  pos: {
    // marginBottom: 12
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
      <div>
        <Avatar name='Bob' />
      </div>
      <div>
        <div>
          <MessageMetadata name={messageName} date={date} />
        </div>
        <Message>{messageText}</Message>
      </div>
    </Paper>
  )
}

export default MessageInThread
