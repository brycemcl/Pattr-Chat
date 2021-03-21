import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { gql, useQuery } from '@apollo/client'
import SimpleDialog from './SimpleDialog'
/* step 1
 * first query to find all users in a channel
 * this needs to refer to currentStates .users elected channel to show the user all users ONLY in the currently selected organization
 * they can add to the desired conversation */
const GET_USERS_IN_CHANNEL = gql`
  query($channelId: Int!, $conversationId: Int!) {
    users_channels(
      where: {
        channels_id: { _eq: $channelId }
        _and: {
          _not: {
            user: {
              users_conversations: { conversation_id: { _eq: $conversationId } }
            }
          }
        }
      }
    ) {
      id
      user {
        display_name
        id
      }
    }
  }
`

// DataWrapper component nested inside of UserSelector component
const DataWrapper = ({ currentState, setOpen, open }) => {
  // grab this hook, which stores the data back from graphql with users that are in the users orginzation
  const { loading, error, data } = useQuery(GET_USERS_IN_CHANNEL, {
    variables: {
      channelId: currentState.channel,
      conversationId: currentState.conversation
    },
    fetchPolicy: 'network-only'
  })

  /* this hook is either null or an array, it stores all of the users that come back from our network call
   * into an array, in this hook to be referenced to later */
  const [usersForChats, setUsersForChats] = useState(null)

  // this useEffect hook in this component only fires off when the data changes come back from graphql (error, data, loading)
  // collects an array of users in the selected channel but not conversation
  useEffect(() => {
    if (!loading && !error) {
      try {
        setUsersForChats(data.users_channels.map(({ user }) => user))
      } catch { }
    }
  }, [data, error, loading])

  // this second useEffect hook ONLY triggers when the usersForChats array val changes from above, or setOpen val changes
  // (or if SetOpen status changes)
  useEffect(() => {
    if (usersForChats && usersForChats.length === 0) {
      toast.error('No users left in this channel to add to conversation!')
      setOpen(false)
    }
  }, [usersForChats, setOpen])

  if (!loading && !error && usersForChats && usersForChats.length > 0) {
    return (
      <>
        {open && (
          <SimpleDialog
            setOpen={setOpen}
            open={open}
            usersForChats={usersForChats}
            currentState={currentState}
          />
        )}
      </>
    )
  } else {
    return <div />
  }
}

export default DataWrapper
