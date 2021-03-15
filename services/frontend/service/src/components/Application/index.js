/* global localStorage */
import { useState, useEffect } from 'react'
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
  const [userToken, setUserToken] = useState(false)
  const [uid, setUid] = useState('')
  const [register, setRegister] = useState(false)

  // make auto linter happy lmao
  console.log('Yee: ', uid)

  // useeffect
  useEffect(() => {
    const sessionUid = localStorage.getItem('Uid')

    if (sessionUid) {
      setUserToken(true)
      setUid(sessionUid)
    }
  }, [])

  // conditonally render components of our app here
  if (!userToken && !register) {
    return (
      <div>
        <Header
          buttonStatus='Register'
          setUserToken={setUserToken}
          setRegister={setRegister}
        />
        <section>
          <SignIn
            setUserToken={setUserToken}
            setUid={setUid}
            setRegister={setRegister}
          />
        </section>
      </div>
    )
  } else if (!userToken && register) {
    return (
      <div>
        <Header
          buttonStatus='Login'
          setUserToken={setUserToken}
          setRegister={setRegister}
        />
        <section>
          <SignUp
            setUserToken={setUserToken}
            setUid={setUid}
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
          setUserToken={setUserToken}
          setRegister={setRegister}
        />
        <section>
          <ChatRoom />
        </section>
      </div>
    )
  }
}

export default Application
