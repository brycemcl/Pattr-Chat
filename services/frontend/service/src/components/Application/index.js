import Header from '../Header'
import ChatRoom from '../ChatRoom'
import SignIn from '../SignIn'
import SignUp from '../Signup'

/* application component which acts as a window into our application
 * conditonally renders the login page and ChatRoom application based on if a userToken is true or not
 * https://reactjs.org/docs/conditional-rendering.html */
const Application = () => {
  // mock tokens from firebase to indicate if the user is logged in or not & to render the register component or not
  const userToken = true
  const register = false

  // conditonally render components of our app here
  if (!userToken && !register) {
    return (
      <div>
        <Header />
        <section>
          <SignIn />
        </section>
      </div>
    )
  } else if (!userToken && register) {
    return (
      <div>
        <Header />
        <section>
          <SignUp />
        </section>
      </div>
    )
  } else {
    return (
      <div>
        <Header />
        <section>
          <ChatRoom />
        </section>
      </div>
    )
  }
}

export default Application
