import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import PersonIcon from '@material-ui/icons/Person'
import { blue } from '@material-ui/core/colors'
import { gql, useMutation } from '@apollo/client'

/* step 2
* second mutator to use currentState.conversation and currentState.conversation to add user to the specific conversation selected.
* this needs to refer to currentStates .users elected conversation to update the selected user into */
const ADD_USERS_TO_CONVERSATION = gql`
 mutation($userId: Int!, $conversationId: Int!) {
   insert_users_conversations_one(object: {user_id: $userId, conversation_id: $conversationId}) {
     id
   }
 }
`
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  button: {
    height: '32px',
    width: '56px'
  }
})

// simple dialog component to render the user click options
function SimpleDialog ({ setOpen, open, usersForChats, currentState }) {
// function SimpleDialog ({ onClose, selectedValue, open, usersForChats, currentState, refetch }) {
  // declare our useMutation to add users to conversations here, pass the setter down later
  const [addUserConversation] = useMutation(ADD_USERS_TO_CONVERSATION)
  const classes = useStyles()

  // helper function to handle a user click and add a person to a conversation
  const handleListItemClick = (userId, currentState, addUserConversation) => {
    // call addUserConversation adding the current conversation selected in state to the
    addUserConversation({
      variables: {
        userId: userId,
        conversationId: currentState.conversation
      }
    }).then(() => {
      setOpen(false)
    })
  }

  // jsx returned from SimpleDialog component
  return (
    <Dialog
      onClose={() => {
        setOpen(false)
      }} aria-labelledby='simple-dialog-title' open={open}
    >
      <DialogTitle id='simple-dialog-title'>Add user</DialogTitle>
      <List>
        {usersForChats.map((user) => (
          <ListItem button onClick={() => handleListItemClick(user.id, currentState, addUserConversation)} key={user.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.display_name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
export default SimpleDialog
