/* eslint-disable multiline-ternary */
import CreateTextSingleLine from '../CreateTextSingleLine'
import { useEffect, useState } from 'react'
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
import Spinner from '../Spinner'
import UserSelector from '../UserSelector'

// graphql query to get public channels for users to display to the client
const GET_PUBLIC_CHANNELS = gql`
subscription($userId: Int!) {
  users_by_pk(id: $userId) {
    id
  users_channels(order_by: { id: desc }){
    channel{
      name
      id
      conversations(where: {public: {_eq: true}} order_by: { id: desc }) {
        id
        name
        public
      }
    }
  }
}
}
`

// graphql query to get private channels for users to display to the client
const GET_PRIVATE_CHANNELS = gql`
subscription ($userId: Int!) {
  users_by_pk(id: $userId) {
    id
    users_conversations(where: {conversation: {public: {_eq: false}}}, order_by: {id: desc}) {
      id
      conversation {
        channel_id
        id
        name
      }
    }
  }
}
`

// style this component
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%'
  },
  drawer: {
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  company: {
    height: '79px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  companyName: {
    justifyContent: 'center',
    fontSize: '20px',
    color: '#343333'
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

// helper function to return a found channel
const selectedChannel = (channelsArr, currentStateChannel) => {
  let foundChannel

  channelsArr.users_by_pk.users_channels.forEach((channel) => {
    if (currentStateChannel === channel.channel.id) {
      foundChannel = channel.channel.name
    }
  })

  return foundChannel
}

// sidebar component - dis hurt my brain brain :((
const Sidebar = ({ currentUser, currentState, setCurrentState, setChannels, channels }) => {
  const classes = useStyles()
  let foundChannelName

  const [foundName, setFoundName] = useState('')

  // grab this hook, which stores the data back from graphql with live data of users current public channels and conversations
  const { loading, error, data } = useSubscription(GET_PUBLIC_CHANNELS, {
    variables: { userId: currentUser.id }
  })

  // grab this hook, which stores the data back from graphql with live data of users current private channels and conversations
  const { loading: loadingPrivate, error: errorPrivate, data: dataPrivate } = useSubscription(GET_PRIVATE_CHANNELS, {
    variables: { userId: currentUser.id }
  })

  /* useEffect called in this component. fires off after our data changes OR our currenState changes - fixes this issue:
   * https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning */
  useEffect(() => {
    if (!loading && !error && !loadingPrivate && !errorPrivate) {
      // setter for organization switcher component, to show all public orgs to switch between
      setChannels(data)

      /* use setCurrentState setter, passed from props to update the currentState, use a callback to modify this.
       * spread the current state tied to setCurrentState. store its contents as a copy into 'mutatedState'.
       * check if a user is removed from any channels, if they are on this component, re-render it to reflect that.
       * map through the entire array of data.users_by_pk.channels, for each channel in the array, return each channel id includes
       * goes through the array of returned channel ids. checks if the array includes currentState.channel in our mutated state. */
      setCurrentState((cs) => {
        const mutatedState = { ...cs }
        try {
          if (
            !data.users_by_pk.users_channels
              .map(({ channel }) => {
                return channel.id
              })
              .includes(mutatedState.channel)
          ) {
          /* if above evals to true, we reach this code. we check if that users data.users_by_pk.channels.length is more than 0
           * if it is, we then set the mutated states .channel property to = data.users_by_pk.channels[0].id, setting a default channel
           * else this logged in user is removed from the last channel they can see in their list */
            if (data.users_by_pk.users_channels.length > 0) {
              mutatedState.channel = data.users_by_pk.users_channels[0].channel.id
            } else {
              mutatedState.channel = null
            }
          }

          /* this is an empty array that will store current (public) Conversations first (and private conversations second)
          * both private and public conversations for this client will be stored in this single variable
          * for the users selected channel in the application state */
          let currentConversations = []

          /* keep track of a clients valid PUBLIC (only) conversations in their sidebar
           * filter the conversations a user selects by the organization that is stored for this user in currentState
           * dump these public conversations into the currentConversations array */
          try {
            currentConversations = data.users_by_pk.users_channels.find(
              ({ channel }) => {
                return channel.id === mutatedState.channel
              }
            ).channel.conversations
          } catch {

          }

          /* this block takes the found conversations from an orgabization the user is currently looking at above
          * then it spreads these conversations (to not mutate the original data)
          * loop through each conversation in the dataPrivate.users_by_pk.users_conversations data structure and push each private conversation
          * to our currentConversations arr */
          try {
            const currentConversationsPrivate = dataPrivate.users_by_pk.users_conversations.map(({ conversation }) => {
              return conversation
            }).filter(conversation => { return conversation.channel_id === mutatedState.channel })
            currentConversations = [...currentConversations, ...currentConversationsPrivate]

            // get the users currently selected channel name, u[date our hook
            foundChannelName = selectedChannel(channels, currentState.channel)
            setFoundName(foundChannelName)
          } catch {

          }

          /* this is to handle an instance where a user might delete a conversation
           * map through currentConversations array we collected above, on each iteration, return the conversation.id
           * on each passthrough of the loop in this map, ensure the conversation.id is included with the mutatedStates conversation */
          if (
            !currentConversations
              .map((conversation) => {
                return conversation.id
              })
              .includes(mutatedState.conversation)
          ) {
            /* if above evaluates to false, check if they have any valid conversations.
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
  }, [data, currentState, error, loading, setChannels, setCurrentState, dataPrivate, errorPrivate, loadingPrivate])

  if (loading) return <Spinner />
  if (error) return <p>Error :(</p>
  if (loadingPrivate) return <p>Loading...</p>
  if (errorPrivate) return <p>Error :(</p>

  /* filter messages and push them to the private or public arrays based on their status
   * show our conversation for a users selected channel */
  let publicMessages = []

  try {
    publicMessages = data.users_by_pk.users_channels
      .find(({ channel }) => {
        return channel.id === currentState.channel
      }).channel
      .conversations.map(({ name, id }) => (
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
  } catch {
  // user has no conversations in the selected channel
  }

  // array that stores our private messages
  let privateMessages = []

  try {
    privateMessages = dataPrivate.users_by_pk.users_conversations.map(({ conversation }) => conversation)
      .filter((conversation) => {
        return conversation.channel_id === currentState.channel
      })
      .map(({ name, id }) => (
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
          <UserSelector
            currentState={currentState}
          />
        </ListItem>
      ))
  } catch {
  // user has no conversations in the selected channel
  }

  // return the component to render the sidebar. when a sidebar option is clicked, update the current state to record the last click
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        PaperProps={{
          style: { position: 'absolute', height: '100%', width: '100%' }
        }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: document.getElementById('drawer-container'),
          style: { position: 'absolute' }
        }}
      >
        {currentState.channel ? (
          <>
            <div className={classes.company}>
              <h2 className={classes.companyName}>{foundName}</h2>
            </div>
            <Divider />
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
            </List>
            <Divider />
          </>
        ) : (
          <p>You don't have any channels selected.</p>
        )}
      </Drawer>
    </div>
  )
}

export default Sidebar
