/* global localStorage */
import { useState } from 'react'
import Header from '../Header'
import ChatRoom from '../ChatRoom'
import SignIn from '../SignIn'
import SignUp from '../Signup'

/* application component which acts as a window into our application
 * conditionally renders the login page and ChatRoom application based on if a userToken is true or not
 * https://reactjs.org/docs/conditional-rendering.html */
const sessionUid = localStorage.getItem('Uid')

const Application = () => {
  /* store our currently logged in username and password in this components state to keep track
   * of currently logged in and authenticated user */
  const [currentUser, setCurrentUser] = useState({ user_uuid: sessionUid || null })
  const [register, setRegister] = useState(false)

  // conditionally render components of our app here
  if (!currentUser.user_uuid && !register) {
    return (
      <div>
        <Header
          buttonStatus='Register'
          setRegister={setRegister}
          setCurrentUser={setCurrentUser}
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
        />
        <section>
          <ChatRoom
            uuid={currentUser.user_uuid}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </section>
      </div>
    )
  }
}

export default Application
