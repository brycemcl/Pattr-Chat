import CreateTextSingleLine from '../CreateTextSingleLine'
import { useState, Fragment } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import WorkIcon from '@material-ui/icons/Work'
import MenuIcon from '@material-ui/icons/Menu'
import UserSelectorChannels from '../UserSelectorChannels'

// this is our ChannelNavigator component
export default function ChannelNavigator ({
  currentUser,
  channels,
  setCurrentState,
  currentState
}) {
  // state which keeps track of what side the panel drops out of
  const [state, setState] = useState({
    left: false
  })

  // helper function to toggle the drawer to open and close
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open })
  }
  let mapOfChannels = null

  /* create mapped channels, on a render tbd. this defaults to the catch, because our channels
   * don't exist in state yet (passed as a prop from somehwere else in our app from a different component), when this  eventually re-renders
   * with the 'channel' prop finally, the code in the try block gets executed sucessfuly */
  try {
    mapOfChannels = channels.users_by_pk.users_channels.map(({ channel }) => {
      return (
        <ListItem
          button
          key={channel.id}
          onClick={(e) => {
            setCurrentState((cs) => {
              return {
                ...cs,
                channel: channel.id
              }
            })
          }}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary={channel.name} />
          <UserSelectorChannels
            channel={channel}
          />
        </ListItem>
      )
    })
  } catch {}
  // callback function that will
  const list = (anchor) => (
    <List>
      <div role='presentation'>
        <ListItem>
          <CreateTextSingleLine
            currentUser={currentUser}
            currentState={currentState}
            placeholder='New Channel'
            type='channel'
          />
        </ListItem>
      </div>
      <div
        role='presentation'
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {mapOfChannels}
        <Divider />
      </div>
    </List>
  )

  return (
    <div>
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </div>
          <Drawer open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  )
}
