import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import ForumIcon from '@material-ui/icons/Forum'
import CreateTextSingleLine from '../CreateTextSingleLine'

const SelectorConversationPublic = ({
  publicConversations,
  setCurrentConversation,
  currentState,
  currentUser
}) => {
  const conversations = publicConversations.map(({ name, id }) => (
    <ListItem
      button
      key={id}
      selected={currentState?.conversation === id}
      onClick={() => setCurrentConversation(id)}
    >
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  ))
  return (
    <List>
      <ListItem>
        <CreateTextSingleLine
          currentUser={currentUser}
          currentState={currentState}
          conversationPublic
          placeholder='New Public Thread'
        />
      </ListItem>
      {conversations}
    </List>
  )
}

export default SelectorConversationPublic
