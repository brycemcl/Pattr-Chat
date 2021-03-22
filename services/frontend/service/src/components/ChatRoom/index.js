import { useEffect } from 'react'
import ContextSwitcher from '../ContextSwitcher'
import MessagesBody from '../MessagesBody'
import { makeStyles } from '@material-ui/core/styles'
import { gql, useQuery, useMutation } from '@apollo/client'
import Spinner from '../Spinner'

/*
    ⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⣠⣤⣶⣶
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⢰⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿75⣿⣿⣿⣿⣿⣿⣧⣀⣀⣾⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⡏⠉⠛37⢿px⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
    ⣿⣿⣿⣿⣿⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
    ⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿
    ⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿

    > me when I find another instant messaging bug
*/

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
const MAKE_USER = gql`
  mutation createUser($displayName: String!, $uuid: String!) {
    insert_users_one(object: { display_name: $displayName, user_uuid: $uuid }) {
      id
      display_name
      user_uuid
    }
  }
`
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%'
  },

  sidebar: {
    minWidth: '350px',
    maxWidth: '350px',
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center'
  },
  body: {
    flex: '1 1 auto'
  }
}))

/* chatroom component
 * also has a useQuery hook which uses our above graphql query we wrote */
function ChatRoom ({
  currentUser,
  setCurrentUser,
  currentState,
  setCurrentState
}) {
  const classes = useStyles()

  const { loading, error, data, refetch } = useQuery(FETCH_USER, {
    variables: { uuid: currentUser.user_uuid }
  })

  const [makeUser] = useMutation(MAKE_USER)

  // this useeffect on this component will only fire off when the value of "data" from our useQuery changes
  useEffect(() => {
    if (data && Array.isArray(data.users) && data.users.length > 0) {
      setCurrentUser(data.users[0])
    }
  }, [data, setCurrentUser])

  // error checking
  if (loading) return <Spinner />
  if (error) return <p>Error :(</p>
  if (data && Array.isArray(data.users) && data.users.length === 0) {
    makeUser({
      variables: {
        displayName: 'Unknown',
        uuid: currentUser.user_uuid
      }
    }).then(() => refetch())
    return null
  }

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        {currentUser.id && (
          <>
            <ContextSwitcher
              currentUser={currentUser}
              currentState={currentState}
              setCurrentState={setCurrentState}
            />
          </>
        )}
      </div>
      <div className={classes.body}>
        {currentState.channel && currentState.conversation && (
          <MessagesBody currentState={currentState} currentUser={currentUser} />
        )}
      </div>
    </div>
  )
}

export default ChatRoom
