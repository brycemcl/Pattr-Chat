import { gql, useSubscription, useQuery } from '@apollo/client'
import Avatar from '../MessageInThread/Avatar'

// query to find out if a selected conversation is public or private
const IS_PUBLIC_OR_PRIVATE = gql`
  query ($conversationId: Int!) {
    conversations(where: {id: {_eq: $conversationId}}) {
      public
    }
  }
`

// subscription to get all users in a currently selected private chat
const GET_USERS_IN_PRIVATE_CHATS = gql`
  subscription ($conversationId: Int!) {
    users(where: {users_conversations: {conversation_id: {_eq: $conversationId}}}) {
      id
      display_name
    }
  }
`
// subscription to get all users in the public chats (basically the channel users)
const GET_USERS_IN_PUBLIC_CHATS = gql`
  subscription ($channelId: Int!) {
    users(where: {users_channels: {channels_id: {_eq: $channelId}}}) {
      id
      display_name
    }
  }
`

// sign up component in this app
const UsersInChatsBar = ({ currentState, avatarColor, setAvatarColor }) => {
  // array to store the users in a chat
  const usersInChat = []

  // hook to check if user is selected a public or private chat
  const { loading: loadingPubOrPriv, error: errorPubOrPriv, data: dataPubOrPriv } = useQuery(IS_PUBLIC_OR_PRIVATE, {
    variables: {
      conversationId: currentState.conversation
    }
  })

  // hook to collect the users in a selected public chat
  const { loading: loadingPublic, error: errorPublic, data: dataPublic } = useSubscription(GET_USERS_IN_PUBLIC_CHATS, {
    variables: {
      channelId: currentState.channel
    }
  })

  // hook to collect the users in a selected private chat
  const { loading, error, data } = useSubscription(GET_USERS_IN_PRIVATE_CHATS, {
    variables: {
      conversationId: currentState.conversation
    }
  })

  // conditonally handle the users to show in a chat based on if the chat is private or public
  if (!loadingPubOrPriv && !errorPubOrPriv) {
    const isPublicData = dataPubOrPriv.conversations[0].public
    if (isPublicData) {
      if (!errorPublic && !loadingPublic) {
        dataPublic.users.forEach((user) => {
          usersInChat.push(user)
        })
      }
    } else {
      if (!loading && !error) {
        data.users.forEach((user) => {
          usersInChat.push(user)
        })
      }
    }
  }

  // return all of our mapped icons to a div
  const mappedUsersInChat = usersInChat.map((user) => {
    return (
      <div style={{ padding: '15px' }} key={user.id}>
        <Avatar
          name={user.display_name}
          avatarColor={avatarColor}
          setAvatarColor={setAvatarColor}
        />
      </div>
    )
  })
  return mappedUsersInChat
}

export default UsersInChatsBar
