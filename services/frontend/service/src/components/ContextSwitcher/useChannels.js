import { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { GET_PUBLIC_CHANNELS, GET_PRIVATE_CHANNELS } from './queries'

const useChannels = ({ currentState, setCurrentState, currentUser }) => {
  // grab this hook, which stores the data back from graphql with live data of users current public channels and conversations
  const {
    loading: loadingPublic,
    error: errorPublic,
    data: dataPublic
  } = useSubscription(GET_PUBLIC_CHANNELS, {
    variables: { userId: currentUser.id }
  })

  // grab this hook, which stores the data back from graphql with live data of users current private channels and conversations
  const {
    loading: loadingPrivate,
    error: errorPrivate,
    data: dataPrivate
  } = useSubscription(GET_PRIVATE_CHANNELS, {
    variables: { userId: currentUser.id }
  })
  const error = errorPrivate || errorPublic
  const loading = loadingPrivate || loadingPublic
  const ready = !loading && !error
  const [channels, setChannels] = useState([])
  const [publicConversations, setPublicConversations] = useState([])
  const [privateConversations, setPrivateConversations] = useState([])
  const [currentConversations, setCurrentConversations] = useState([])

  // extracts channels once data is loaded
  useEffect(() => {
    if (ready) {
      setChannels(
        dataPublic.users_by_pk.users_channels.map(({ channel }) => channel)
      )
    }
  }, [ready, setChannels, dataPublic])
  // sets the currently selected channel to be something the user has access to
  useEffect(() => {
    if (ready) {
      setCurrentState((cs) => {
        const mutatedState = { ...cs }
        try {
          if (
            !channels
              .map((channel) => {
                return channel.id
              })
              .includes(mutatedState.channel)
          ) {
            /* if above evals to true, we reach this code. we check if that users data.users_by_pk.channels.length is more than 0
             * if it is, we then set the mutated states .channel property to = data.users_by_pk.channels[0].id, setting a default channel
             * else this logged in user is removed from the last channel they can see in their list */
            if (channels.length > 0) {
              mutatedState.channel = channels[0].id
            } else {
              mutatedState.channel = null
            }
          }
        } catch {}
        if (cs.channel === mutatedState.channel) {
          return cs
        } else {
          return mutatedState
        }
      })
    }
  }, [ready, setCurrentState, channels])
  // sets all the conversations that the user can access
  useEffect(() => {
    if (ready) {
      try {
        setCurrentConversations((cs) => {
          /* this is an empty array that will store current (public) Conversations first (and private conversations second)
           * both private and public conversations for this client will be stored in this single variable
           * for the users selected channel in the application state */
          let conversations = []
          /* keep track of a clients valid PUBLIC (only) conversations in their sidebar
           * filter the conversations a user selects by the organization that is stored for this user in currentState
           * dump these public conversations into the currentConversations array */
          try {
            conversations = channels.find((channel) => {
              return channel.id === currentState.channel
            }).channel.conversations
          } catch {}

          /* this block takes the found conversations from an organization the user is currently looking at above
           * then it spreads these conversations (to not mutate the original data)
           * loop through each conversation in the dataPrivate.users_by_pk.users_conversations data structure and push each private conversation
           * to our currentConversations arr */
          try {
            const conversationsPrivate = dataPrivate.users_by_pk.users_conversations
              .map(({ conversation }) => {
                return conversation
              })
              .filter((conversation) => {
                return conversation.channel_id === currentState.channel
              })
            conversations = [...conversations, ...conversationsPrivate]
          } catch {}
          if (cs.length !== conversations.length) {
            return conversations
          } else {
            return cs
          }
        })
      } catch {}
    }
  }, [ready, channels, currentState, dataPrivate])
  // sets the currently selected conversation to be something the user has access to
  useEffect(() => {
    if (ready) {
      setCurrentState((cs) => {
        const mutatedState = { ...cs }
        try {
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
        } catch {}
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
  }, [setCurrentState, ready, currentConversations])

  useEffect(() => {
    /* show our conversation for a users selected channel */
    if (ready) {
      try {
        setPublicConversations(
          channels.find((channel) => {
            return channel.id === currentState.channel
          }).conversations
        )
      } catch {
        // user has no conversations in the selected channel
        setPublicConversations([])
      }
      try {
        setPrivateConversations(
          dataPrivate.users_by_pk.users_conversations
            .map(({ conversation }) => conversation)
            .filter((conversation) => {
              return conversation.channel_id === currentState.channel
            })
        )
      } catch {
        setPrivateConversations([])
      }
    }
  }, [ready, currentState.channel, dataPrivate, dataPublic, channels])

  return {
    channels,
    publicConversations,
    privateConversations,
    error,
    loading
  }
}

export default useChannels
