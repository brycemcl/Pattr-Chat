/* eslint-disable multiline-ternary */
import CreateTextSingleLine from '../CreateTextSingleLine'
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ForumIcon from '@material-ui/icons/Forum'
import { gql, useSubscription } from '@apollo/client'
const drawerWidth = 260

// graphql subscription to grab the current channels - server to client 1 way updating
const GET_CHANNELS = gql`
  subscription($id: Int!) {
    users_by_pk(id: $id) {
      id
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
    marginTop: '64px',
    marginLeft: '0px',
    paddingLeft: '0px'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}))

// helper function to modify the clicked sidebar option for the user in the currentState
const setClickedSidebarOption = (id, setCurrentState) => {
  setCurrentState((cs) => {
    return {
      ...cs,
      conversation: id
    }
  })
}
// sidebar component
const Sidebar = ({
  currentUser,
  currentState,
  setCurrentState,
  setChannels
}) => {
  const classes = useStyles()

  // grab this hook, which stores the data back from graphql with live data of users current channels and conversations
  const { loading, error, data } = useSubscription(GET_CHANNELS, {
    variables: { id: currentUser.id }
  })

  /* useEffect called in this component. fires off after our data changes OR our currenState changes - fixes this issue:
   * https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning */
  useEffect(() => {
    if (!loading && !error) {
      // setter for organization switcher component to show all orgs to switch between
      setChannels(data)

      /* use setCurrentState setter, passed from props to update the currentState, use a callback to modify this.
       * spread the current state tied to setCurrentState. store its contents as a copy into 'mutatedState'.
       * check if a user is removed from any channels, if they are on this component, re-render it to reflect that.
       * map through the entire array of data.users_by_pk.channels, for each channel in the array, return each channel id includes
       * goes through the array of returned channel ids. checks if the array includes currentState.channel in our mutated state. */
      setCurrentState((cs) => {
        const mutatedState = { ...cs }
        if (
          !data.users_by_pk.channels
            .map((channel) => {
              return channel.id
            })
            .includes(mutatedState.channel)
        ) {
          /* if above evals to true, we reach this code. we check if that users data.users_by_pk.channels.length is more than 0
           * if it is, we then set the mutated states .channel property to = data.users_by_pk.channels[0].id, setting a default channel
           * else this logged in user is removed from the last channel they can see in their list */
          if (data.users_by_pk.channels.length > 0) {
            mutatedState.channel = data.users_by_pk.channels[0].id
          } else {
            mutatedState.channel = null
          }
        }

        /* keep track of a clients valid conversations in their sidebar
         * filter the conversations a user selects by the organization that is stored for this user in currentState */
        try {
          const currentConversations = data.users_by_pk.channels.find(
            (channel) => {
              return channel.id === mutatedState.channel
            }
          ).conversations

          /* map through currentConversations array we collected above, on each iteration, return the conversation.id
           * on each passthrough of the loop in this map, ensure the conversation.id is included with the mutatedStates conversation */
          if (
            !currentConversations
              .map((conversation) => {
                return conversation.id
              })
              .includes(mutatedState.conversation)
          ) {
            /* if above evaluates to true, check if they have any valid conversations.
             * setting a default channel, set the first conversation from currentConversations[0].id as their default selected
             * else they don't have any conversations, don't show anything in the sidebar */
            if (currentConversations.length > 0) {
              mutatedState.conversation = currentConversations[0].id
            } else {
              mutatedState.conversation = null
            }
          }
          // if they don't have any conversations on inital rendering/loading (or ever), show nothing
        } catch {
          mutatedState.conversation = null
        }

        /* final check to make sure the current states conversations & channels match the mutated states conversations & channels
         * if they do, return the current state as is, if not return the mutates state (to the setCurrentState setter) */
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
  }, [data, currentState, error, loading, setChannels, setCurrentState])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // empty arrays to store our users private and public conversations
  const conversationsPublic = []
  const conversationsPrivate = []

  /* filter messages and push them to the private or public arrays based on their status
   * show our conversation for a users selected channel */
  try {
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
    // user has no conversations in the selected channel
  }

  const publicMessages = conversationsPublic.map(({ name, id }) => (
    <ListItem
      button
      key={id}
      selected={currentState.conversation === id}
      onClick={() => setClickedSidebarOption(id, setCurrentState)}
    >
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  ))

  const privateMessages = conversationsPrivate.map(({ name, id }) => (
    <ListItem
      button
      key={name}
      onClick={() => setClickedSidebarOption(id, setCurrentState)}
      selected={currentState.conversation === id}
    >
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  ))
  // return the component to render the sidebar. when a sidebar option is clicked, update the current state to record the last click
  return (
    <>

      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='left'
      >
        {currentState.channel ? (
          <>
            <List>
              <ListItem>
                <CreateTextSingleLine
                  currentUser={currentUser}
                  currentState={currentState}
                  placeholder='New Thread'
                />
              </ListItem>
              {publicMessages}
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
              {privateMessages}
              {/* private */}
              {/* currentState.channel && currentState.conversation */}
            </List>
            <Divider />
          </>
        ) : (
          <p>You don't have any channels selected.</p>
        )}
      </Drawer>
    </>
  )
}

export default Sidebar
