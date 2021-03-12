import Paper from '@material-ui/core/Paper'

// Message component, takes in whatever is inbetween the message tags from parent component
// wrap this text in a paper grandchild component from material UI lib. return it
const Message = ({ children }) => {
  return <Paper elevation={3}>{children}</Paper>
}

export default Message
