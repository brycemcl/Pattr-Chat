import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import List from '@material-ui/core/List'
import UserSelector from '../UserSelector'
import CreateTextSingleLine from '../CreateTextSingleLine'

const SelectorConversationPrivate = ({
  privateConversations,
  setCurrentConversation,
  currentState,
  currentUser
}) => {
  const conversations = privateConversations.map(({ name, id }) => (
    <ListItem
      button
      key={name}
      onClick={() => setCurrentConversation(id)}
      selected={currentState?.conversation === id}
    >
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
      <UserSelector currentState={currentState} />
    </ListItem>
  ))
  return (
    <List>
      <ListItem>
        <CreateTextSingleLine
          currentUser={currentUser}
          currentState={currentState}
          conversationPublic={false}
          placeholder='New Private Thread'
        />
      </ListItem>
      {conversations}
    </List>
  )
}

export default SelectorConversationPrivate
