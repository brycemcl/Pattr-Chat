import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core'
import firebase from '../../firebase'
import ChannelNavigator from '../ChannelNavigator'

// style our component
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 1201,
    height: '64px'
  },
  toolbar: {
    height: '64px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  hello: {
    marginRight: '16px',
    fontSize: '14px'
  }
}))

/* helper function - takes in button status and setUserToken setter
 * has a safety check - the trigger for the firebase SignOut can only be called if the current buttonStatus == logout
 * also handle button clicks for switching between login and register pages */
const buttonClick = function (buttonStatus, setRegister, setCurrentUser) {
  if (buttonStatus === 'Logout') {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser({ user_uuid: null })
        setRegister(false)
        window.localStorage.removeItem('Uid')
      })
      .catch((error) => {
        console.error('error inside header.js for logout feature', error)
      })
  } else if (buttonStatus === 'Login') {
    setRegister(false)
  } else if (buttonStatus === 'Register') {
    setRegister(true)
  }
}

// component for our header
function Header ({
  buttonStatus,
  setRegister,
  setCurrentUser,
  currentUser,
  channels,
  setCurrentState,
  currentState
}) {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.toolbar} />
      <AppBar className={classes.root}>
        <Toolbar className={classes.toolbar}>
          {currentUser.id && (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <ChannelNavigator
                currentUser={currentUser}
                channels={channels}
                setCurrentState={setCurrentState}
                currentState={currentState}
              />
            </IconButton>
          )}
          <Typography variant='h6' className={classes.title}>
            Pattr
          </Typography>
          {currentUser.id && (
            <Typography variant='h8' className={classes.hello}>
              Hello {currentUser.display_name}
            </Typography>
          )}
          <Button
            color='inherit'
            onClick={() =>
              buttonClick(buttonStatus, setRegister, setCurrentUser)}
          >
            {buttonStatus}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

// export our default Button component we declared above
export default Header
