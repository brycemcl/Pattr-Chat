import { makeStyles } from '@material-ui/core/styles'
import DataWrapper from './DataWrapper'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  }
}))

const setCurrentConversation = (setCurrentState, id) => {
  setCurrentState((cs) => {
    return {
      ...cs,
      conversation: id
    }
  })
}
const setCurrentChannel = (setCurrentState, id) => {
  setCurrentState((cs) => {
    return {
      ...cs,
      channel: id
    }
  })
}
const ContextSwitcher = ({ currentUser, currentState, setCurrentState }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <DataWrapper
        currentUser={currentUser}
        currentState={currentState}
        setCurrentState={setCurrentState}
        setCurrentChannel={(id) => setCurrentChannel(setCurrentState, id)}
        setCurrentConversation={(id) =>
          setCurrentConversation(setCurrentState, id)}
      />
    </div>
  )
}

export default ContextSwitcher
