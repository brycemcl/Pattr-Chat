/* global localStorage */
import { useState, useEffect } from 'react'
import Header from '../Header'
import ChatRoom from '../ChatRoom'
import SignIn from '../SignIn'
import SignUp from '../Signup'

/* application component which acts as a window into our application
 * conditionally renders the login page and ChatRoom application based on if a userToken is true or not
 * https://reactjs.org/docs/conditional-rendering.html */
const Application = () => {
  // const { loading, error, data } = useQuery(schema)
  /* store our currently logged in username and password in this components state to keep track
   * of currently logged in and authenticated user */
  const [userToken, setUserToken] = useState(false)
  const [, setUid] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [register, setRegister] = useState(false)

  console.log('currentUser: ', currentUser)

  // useeffect
  useEffect(() => {
    const sessionUid = localStorage.getItem('Uid')

    if (sessionUid) {
      setUserToken(true)
      setUid(sessionUid)
    }
  }, [])

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error :(</p>
  // console.log('here: ', data)

  // conditionally render components of our app here
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
