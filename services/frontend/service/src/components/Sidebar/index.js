import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FaceIcon from '@material-ui/icons/Face'
import AssessmentIcon from '@material-ui/icons/Assessment'
import {
  showUsersInCompany,
  showChannelsInCompany
} from '../../helpers/selectors'
import { gql, useSubscription } from '@apollo/client'

const drawerWidth = 240

const GET_CHANNELS = gql`
  subscription ($id: Int!) {
    users_by_pk(id: $id) {
      channels {
        name
        id
        conversations {
          id
          name
          public
        }
      }
    }
  }
`

// style this component
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '80px',
    marginLeft: '16px'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}))

// sidebar component
const Sidebar = ({ currentUser, currentState, setCurrentState }) => {
  // usestate in this component that will keep track of the menu option in the left hand panel which is clicked on
  const [, setClickedSidebarOption] = useState(null)
  const classes = useStyles()

  // hook which stores the data back from graphql with live data of users current channels and convos
  const { loading, error, data } = useSubscription(GET_CHANNELS, {
    variables: { id: currentUser.id }
  })

  // error checking
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const jsonDom = JSON.stringify(data.users_by_pk.channels)

  // call showUsersInCompany & showChannelsInCompany helper functions to get users and channels in company
  // default state for selected conversation in sidebar
  console.log('data.users_by_pk.channels in sidebar component: ', data.users_by_pk.channels)
  const usersInCompany = showUsersInCompany()
  const channelsInCompany = showChannelsInCompany()

  /* check to see if a user is removed from any channels, if they are on this component re render reflect that
  * map through entire array of data.users_by_pk.channels, for each channel in this array, return each channel id
  * includes goes through this entire array of returned channel ids + checks if this entire array includes the currentState.channel
  * in our state passed as props into this component */
  if (!data.users_by_pk.channels.map((channel) => {
    return channel.id
  }).includes(currentState.channel)) {
    if (data.users_by_pk.channels.length > 0) {
      currentState.channel = data.users_by_pk.channels[0]
    } else {
      // if a user is removed from their last channel
      currentState.channel = null
    }
  }

  let currentConversations
  try {
    // this filters a channel in our data returned from graphql to match with the currently selected channel in our currentStates .channel
    currentConversations = data.users_by_pk.channels
      .filter((channel) => {
        return channel.id === currentState.channel
      })[0].conversations

    if (!currentConversations.map((conversation) => {
      return conversation.id
    }).includes(currentState.conversation)
    ) {
      if (currentConversations.length > 0) {
        currentState.conversation = currentConversations[0].id
      } else {
        currentState.conversation = null
      }
    }
  } catch {
    currentState.conversation = null
  }

  // setCurrentState(()=>{})

  // return the component to render the sidebar & when a sidebar option is clicked, update the current state to record the last
  // clicked button
  return (
    <>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='left'
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={jsonDom} />
          </ListItem>
          {channelsInCompany.map(({ name, channelId }) => (
            <ListItem
              button
              key={name}
              onClick={() => setClickedSidebarOption(channelId)}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}

        </List>
        <Divider />
        <List>
          {usersInCompany.map(({ name }) => (
            <ListItem button key={name}>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar
