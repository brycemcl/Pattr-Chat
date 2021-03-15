/* global localStorage */
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import firebase from '../../firebase'

// style our component
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

/* helper function - takes in button status and setUserToken setter
 * has a saftey check - the trigger for the firebase SignOut can only be called if the current buttonStatus == logout
 * also handle button clicks for switching between login and register pages */
const buttonClick = function (buttonStatus, setUserToken, setRegister) {
  if (buttonStatus === 'Logout') {
    firebase.auth().signOut().then(() => {
      setUserToken(false)
      setRegister(false)
      localStorage.removeItem('Uid')
    }).catch((error) => {
      console.log('error inside header.js for logout feature', error)
    })
  } else if (buttonStatus === 'Login') {
    setUserToken(false)
    setRegister(false)
  } else if (buttonStatus === 'Register') {
    setUserToken(false)
    setRegister(true)
  }
}

function Header ({ buttonStatus, setUserToken, setRegister }) {
  const classes = useStyles()
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Pattr
          </Typography>
          <Button
            color='inherit'
            onClick={() => buttonClick(buttonStatus, setUserToken, setRegister)}
          >{buttonStatus}
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

// export our default Button component we declared above
export default Header
