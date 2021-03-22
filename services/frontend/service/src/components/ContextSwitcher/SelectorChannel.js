import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import WorkIcon from '@material-ui/icons/Work'
import CreateTextSingleLine from '../CreateTextSingleLine'
import UserSelectorChannels from '../UserSelectorChannels'

const SelectorChannel = ({
  channels,
  setCurrentChannel,
  currentState,
  currentUser,
  toggleChannelSelectorOpen
}) => {
  const channelsList = channels.map((channel) => (
    <ListItem
      button
      key={channel.id}
      selected={currentState?.channel === channel.id}
      onClick={() => {
        setCurrentChannel(channel.id)
        toggleChannelSelectorOpen()
      }}
    >
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary={channel.name} />
      <UserSelectorChannels channel={channel} />
    </ListItem>
  ))

  return (
    <List>
      <ListItem>
        <CreateTextSingleLine
          currentUser={currentUser}
          currentState={currentState}
          placeholder='New Channel'
          type='channel'
        />
      </ListItem>
      {channelsList}
    </List>
  )
}

export default SelectorChannel
