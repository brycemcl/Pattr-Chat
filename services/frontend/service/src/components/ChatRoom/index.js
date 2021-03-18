import { useEffect } from 'react'
import Sidebar from '../Sidebar'
import MessagesBody from '../MessagesBody'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'

// fetch graphql query which when used, will retrieve a user who just logged in
const FETCH_USER = gql`
  query($uuid: String!) {
    users(where: { user_uuid: { _eq: $uuid } }) {
      id
      user_uuid
      display_name
    }
  }
`

const useStyles = makeStyles(() => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  messagesBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '100px'
  }
}))

/* chatroom component
 * also has a useQuery hook which uses our above graphql query we wrote */
function ChatRoom ({
  currentUser,
  setCurrentUser,
  setChannels,
  currentState,
  setCurrentState
}) {
  const classes = useStyles()
  const { loading, error, data } = useQuery(FETCH_USER, {
    variables: { uuid: currentUser.user_uuid }
  })

  // this useeffect on this component will only fire off when the value of "data" from our useQuery changes
  useEffect(() => {
    if (data && Array.isArray(data.users) && data.users.length > 0) {
      setCurrentUser(data.users[0])
    }
  }, [data, setCurrentUser])

  // error checking
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data && Array.isArray(data.users) && data.users.length === 0) {
    return <p>I cant verify who you are man :(</p>
  }

  return (
    <section>
      <div>
        {currentUser.id && (
          <Sidebar
            className={classes.sidebar}
            currentUser={currentUser}
            display='flex'
            currentState={currentState}
            setCurrentState={setCurrentState}
            setChannels={setChannels}
          />
        )}
      </div>
      <div>
        {currentState.channel && currentState.conversation && (
          <MessagesBody
            className={classes.messagesBody}
            display='flex'
            currentState={currentState}
            setCurrentState={setCurrentState}
            currentUser={currentUser}
          />
        )}
      </div>
    </section>
  )
}

export default ChatRoom
