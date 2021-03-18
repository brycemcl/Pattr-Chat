import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'

// styles for our component
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

// this is our ChannelNavigator component
export default function ChannelNavigator ({ currentUser, channels, setCurrentState, currentState }) {
  // console.log("YEE CHANNELS:", channels.users_by_pk.channels[0].name);
  console.log('current user in the channel navigator is: ', currentUser)
  // use the styles for our component
  const classes = useStyles()

  // state which keeps track of what side the panel drops out of
  const [state, setState] = React.useState({
    left: false
  })

  // helper function to toggle the drawer to open and close
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open })
  }
  let mapOfChannels = null

  try {
  // console.table(channels.users_by_pk.channels)
  // create mapped channels
    mapOfChannels = channels.users_by_pk.channels.map((channel) => (
      <ListItem
        button key={channel.id}
        onClick={(e) => {
          setCurrentState((cs) => {
            return {
              ...cs,
              channel: channel.id
            }
          })
        }}
      >
        <ListItemIcon><MailIcon /></ListItemIcon>
        <ListItemText primary={channel.name} />
      </ListItem>
    ))
  } catch {

  }
  // callback function that will
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {mapOfChannels}
      </List>
      <Divider />
    </div>
  )

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
