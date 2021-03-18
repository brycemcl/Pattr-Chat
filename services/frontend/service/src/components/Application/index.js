import { useState } from 'react'
import Header from '../Header'
import ChatRoom from '../ChatRoom'
import SignIn from '../SignIn'
import SignUp from '../Signup'

/* application component which acts as a window into our application
 * conditionally renders the login page and ChatRoom application based on if a userToken is true or not
 * https://reactjs.org/docs/conditional-rendering.html */
const sessionUid = window.localStorage.getItem('Uid')

const Application = () => {
  /* store our currently logged in username and password in this components state to keep track
   * of currently logged in and authenticated user */
  const [currentUser, setCurrentUser] = useState({ user_uuid: sessionUid || null })
  const [register, setRegister] = useState(false)
  const [channels, setChannels] = useState(null)
  // usestate hook which will keep track of the currently selected conversation
  const [currentState, setCurrentState] = useState({
    channel: null,
    conversation: null
  })
  // conditionally render components of our app here
  if (!currentUser.user_uuid && !register) {
    return (
      <div>
        <Header
          buttonStatus='Register'
          setRegister={setRegister}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          channels={channels}
          setCurrentState={setCurrentState}
          currentState={currentState}
        />
        <section>
          <SignIn
            setRegister={setRegister}
            setCurrentUser={setCurrentUser}
          />
        </section>
      </div>
    )
  } else if (!currentUser.user_uuid && register) {
    return (
      <div>
        <Header
          buttonStatus='Login'
          setRegister={setRegister}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          channels={channels}
          setCurrentState={setCurrentState}
          currentState={currentState}
        />
        <section>
          <SignUp
            setCurrentUser={setCurrentUser}
            setRegister={setRegister}
          />
        </section>
      </div>
    )
  } else {
    return (
      <div>
        <Header
          buttonStatus='Logout'
          setRegister={setRegister}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          channels={channels}
          setCurrentState={setCurrentState}
          currentState={currentState}
        />
        <section>
          <ChatRoom
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setChannels={setChannels}
            currentState={currentState}
            setCurrentState={setCurrentState}
          />
        </section>
      </div>
    )
  }
}

export default Application
