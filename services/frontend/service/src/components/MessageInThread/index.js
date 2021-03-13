import { makeStyles } from '@material-ui/core/styles'
import Avatar from './Avatar'
import MessageMetadata from './MessageMetadata'
import Message from './Message'
import Paper from '@material-ui/core/Paper'

// style MessageInThread component
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '1rem'
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
  }
})

// MessageinThread component
const MessageInThead = () => {
  const classes = useStyles()
  const date = new Date()
  return (
    <Paper className={classes.root}>
      <div>
        <Avatar name='Bob' />
      </div>
      <div>
        <div>
          <MessageMetadata name='Bob' date={date} />
        </div>
        <Message>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt,
          fugiat? Quo quaerat illum sit omnis dolor? Quo alias maxime
          repellendus!
        </Message>
      </div>
    </Paper>
  )
}

export default MessageInThead
