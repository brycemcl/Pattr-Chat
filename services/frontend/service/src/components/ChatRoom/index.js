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

function ChatRoom ({ uuid, currentUser, setCurrentUser }) {
  const classes = useStyles()
  // useQuery hook which uses our above graphql query we wrote
  // const [fetchUser] = useMutation(FETCH_USER)
  const { loading, error, data } = useQuery(FETCH_USER, {
    variables: { uuid }
  })

  // this useeffect on this component will only fire off when the value of "data" from our useQuery changes
  useEffect(() => {
    // console.log('here123', data);
    if (data && Array.isArray(data.users)) {
      setCurrentUser(data.users[0])
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.log('chatroom: ', currentUser)
  return (
    <section>
      <div>
        <Sidebar className={classes.sidebar} display='flex' />
      </div>
      <div>
        <MessagesBody className={classes.messagesBody} display='flex' />
      </div>
    </section>
  )
}

export default ChatRoom
