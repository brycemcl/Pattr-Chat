import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { gql, useQuery } from '@apollo/client'
import SimpleDialog from './SimpleDialog'
/* step 1
 * first query to find all users in a channel
 * this needs to refer to currentStates .users elected channel to show the user all users ONLY in the currently selected organization
 * they can add to the desired conversation */
const GET_USERS_IN_CHANNEL = gql`
query ($channelId: Int!, $conversationId: Int!) {
  users_channels(where: {channels_id: {_eq: $channelId}, _and: {_not: {user: {users_conversations: {conversation_id: {_eq: $conversationId}}}}}}) {
    id
    user {
      display_name
      id
    }
  }
}
`

// higher order component
const DataWrapper = ({ currentState, setOpen, open }) => {
  // grab this hook, which stores the data back from graphql with users that are in the users orginzation
  const { loading, error, data } = useQuery(GET_USERS_IN_CHANNEL, {
    variables: { channelId: currentState.channel, conversationId: currentState.conversation },
    fetchPolicy: 'network-only'
  })
  const [usersForChats, setUsersForChats] = useState(null)
  useEffect(() => {
    if (!loading && !error) {
      try {
        setUsersForChats(data.users_channels.map(({ user }) => user))
      } catch {}
    }
  }, [data, error, loading])
  useEffect(() => {
    if (!loading && !error) {
      if (usersForChats && usersForChats.length === 0) {
        toast.error('No users left in this channel to add to conversation!')
        setOpen(false)
      }
    }
  }, [error, loading, setOpen, usersForChats])

  if (!loading && !error && usersForChats && usersForChats.length > 0) {
    return (
      <>

        {open && <SimpleDialog
          setOpen={setOpen}
          open={open}
          usersForChats={usersForChats}
          currentState={currentState}
                 />}
      </>
    )
  } else {
    return (
      <div />
    )
  }
}

export default DataWrapper
