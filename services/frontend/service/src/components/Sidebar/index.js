import CreateTextSingleLine from '../CreateTextSingleLine'
import { useEffect } from 'react'
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
import { gql, useSubscription } from '@apollo/client'
const drawerWidth = 240

// grab this
const GET_CHANNELS = gql`
  subscription($id: Int!) {
    users_by_pk(id: $id) {
      channels(order_by: { id: desc }) {
        name
        id
        conversations(order_by: { id: desc }) {
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

const setClickedSidebarOption = (id, setCurrentState) => {
  setCurrentState((cs) => {
    return {
      ...cs,
      conversation: id
    }
  })
}
// sidebar component
const Sidebar = ({ currentUser, currentState, setCurrentState, setChannels }) => {
  const classes = useStyles()

  // grab this hook
  // hook which stores the data back from graphql with live data of users current channels and conversations
  const { loading, error, data } = useSubscription(GET_CHANNELS, {
    variables: { id: currentUser.id }
  })

  /* useEffect called in this component every time our data changes OR our currenState changes - this fixes this issue:
   * https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
   * TODO refactor includes to be find */
  useEffect(() => {
    if (!loading && !error) {
      setChannels(data)

      /* use setCurrentState setter we passed down from props to update the currentState, we use a callback to modify this
       * check to see if a user is removed from any channels, if they are on this component re render reflect that
       * map through entire array of data.users_by_pk.channels, for each channel in this array, return each channel id
       * includes goes through this entire array of returned channel ids + checks if this entire array includes the currentState.channel
       * in our state passed as props into this component */
      setCurrentState((cs) => {
        const mutatedState = { ...cs }
        if (
          !data.users_by_pk.channels
            .map((channel) => {
              return channel.id
            })
            .includes(mutatedState.channel)
        ) {
          // we should reach this code if a user gets removed from their currently selected channel
          if (data.users_by_pk.channels.length > 0) {
            mutatedState.channel = data.users_by_pk.channels[0].id
          } else {
            // if a user is removed from their last channel
            mutatedState.channel = null
          }
        }

        /* handling conversations
         * overall goal: to keep track of a clients valid conversations in their sidebar
         * for every render we are checking that the user is not in an invalid state and if they are, we return them to a valid state
         * if a user has a conversation and has not currently selected a conversation, we should select the first conversation for them by default
         * user has selected an invalid conversation we should return them to the first conversation, unless they don't have a conversation then we should not select a conversation */
        try {
          const currentConversations = data.users_by_pk.channels.filter(
            (channel) => {
              return channel.id === mutatedState.channel
            }
          )[0].conversations

          // map through currentConversations array, on each iteration, return the conversation.id
          if (
            !currentConversations
              .map((conversation) => {
                return conversation.id
              })
              .includes(mutatedState.conversation)
          ) {
            // check if they have any conversations
            if (currentConversations.length > 0) {
              mutatedState.conversation = currentConversations[0].id
            } else {
              // if they don't have any channels
              mutatedState.conversation = null
            }
          }
          // if they don't have any channels
        } catch {
          mutatedState.conversation = null
        }

        if (
          cs.conversation === mutatedState.conversation &&
          cs.channel === mutatedState.channel
        ) {
          return cs
        } else {
          return mutatedState
        }
      })
    }
  }, [data, currentState])

  // error checking
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // empty arrays to store our users private and public conversations
  const conversationsPublic = []
  const conversationsPrivate = []

  // filter messages and push them to the private or public arrays based on their status
  try {
    // show our conversation for a users selected channel
    data.users_by_pk.channels
      .find((channel) => {
        return channel.id === currentState.channel
      })
      .conversations.forEach((conversation) => {
        // if the conversation is public push to public array, else it is private, push to private array
        if (conversation.public) {
          conversationsPublic.push(conversation)
        } else {
          conversationsPrivate.push(conversation)
        }
      })
  } catch {
    // user doesn't have any conversations in the selected channel
  }

  /* return the component to render the sidebar & when a sidebar option is clicked, update the current state to record the last
   * clicked button */
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
            <CreateTextSingleLine
              currentUser={currentUser}
              currentState={currentState}
              placeholder='New Channel'
            />
          </ListItem>
          {conversationsPublic.map(({ name, id }) => (
            <ListItem
              button
              key={id}
              selected={currentState.conversation === id}
              onClick={() => setClickedSidebarOption(id, setCurrentState)}
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
          <ListItem>
            <CreateTextSingleLine
              currentUser={currentUser}
              currentState={currentState}
              placeholder='New Conversation'
              conversationPublic={false}
            />
          </ListItem>
          {conversationsPrivate.map(({ name, id }) => (
            <ListItem
              button
              key={name}
              onClick={() => setClickedSidebarOption(id, setCurrentState)}
              selected={currentState.conversation === id}
            >
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
