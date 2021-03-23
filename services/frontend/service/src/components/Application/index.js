import React, { useState, Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../Header'
import SignIn from '../SignIn'
import SignUp from '../Signup'
const ChatRoom = React.lazy(() => import('../ChatRoom'))

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  },
  body: {
    flex: 1
  }
}))
/* application component which acts as a window into our application
 * conditionally renders the login page and ChatRoom application based on if a userToken is true or not
 * https://reactjs.org/docs/conditional-rendering.html */
const sessionUid = window.localStorage.getItem('Uid')

const Application = () => {
  const classes = useStyles()
  /* store our currently logged in username and password in this components state to keep track
   * of currently logged in and authenticated user */
  const [currentUser, setCurrentUser] = useState({
    user_uuid: sessionUid || null
  })
  const [register, setRegister] = useState(false)

  // usestate hook - keeps track of the currently selected channels + conversations
  const [currentState, setCurrentState] = useState({
    channel: null,
    conversation: null
  })

  // conditionally render components of our app here
  if (!currentUser.user_uuid && !register) {
    return (
      <div className={classes.root}>
        <Header
          buttonStatus='Register'
          setRegister={setRegister}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
        <section>
          <SignIn setRegister={setRegister} setCurrentUser={setCurrentUser} />
        </section>
      </div>
    )
  } else if (!currentUser.user_uuid && register) {
    return (
      <div className={classes.root}>
        <Header
          buttonStatus='Login'
          setRegister={setRegister}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
        <section>
          <SignUp setCurrentUser={setCurrentUser} setRegister={setRegister} />
        </section>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <Header
          buttonStatus='Logout'
          setRegister={setRegister}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />

        <div className={classes.body}>
          <Suspense fallback={<></>}>
            <ChatRoom
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentState={currentState}
              setCurrentState={setCurrentState}
            />
          </Suspense>
        </div>
      </div>
    )
  }
}

export default Application
