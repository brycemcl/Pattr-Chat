import { useState } from 'react'
import Header from '../Header'
import ChatRoom from '../ChatRoom'
import SignIn from '../SignIn'
import SignUp from '../Signup'

/* application component which acts as a window into our application
 * conditonally renders the login page and ChatRoom application based on if a userToken is true or not
 * https://reactjs.org/docs/conditional-rendering.html */
const Application = () => {
  // store our currently logged in username and password in this components state to keep track
  // of currenty logged in and authnticated user
  const register = false
  const [userToken, setUserToken] = useState(false)
  const [uid, setUid] = useState('')

  console.log('userToken val: ', userToken)
  console.log('userToken uid: ', uid)

  // conditonally render components of our app here
  if (!userToken && !register) {
    return (
      <div>
        <Header
          buttonStatus='Register'
        />
        <section>
          <SignIn
            setUserToken={setUserToken}
            setUid={setUid}
          />
        </section>
      </div>
    )
  } else if (!userToken && register) {
    return (
      <div>
        <Header
          buttonStatus='Login'
        />
        <section>
          <SignUp />
        </section>
      </div>
    )
  } else {
    return (
      <div>
        <Header
          buttonStatus='Logout'
        />
        <section>
          <ChatRoom />
        </section>
      </div>
    )
  }
}

export default Application
