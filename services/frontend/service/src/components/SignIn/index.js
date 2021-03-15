import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'// Firebase App (the core Firebase SDK) is always required and must be listed first
import { useState } from 'react'
import firebase from '../../firebase'

// helper function that can render the register component conditonally when the "need an account?" link is clicked
const renderRegister = function (event, setRegister) {
  event.preventDefault()
  setRegister(true)
}

// helper function that will be called when the user submits the form for the sign in button with email + pw info
// Firebase auth to sign in then set the userToken in the parent component to true
// otherwise catch and display errors - using material UI?
const loginAuth = function (email, password, setUserToken, setUid) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('user: ', user)
      setUserToken(true)
      setUid(user.uid)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('errorCode', errorCode)
      console.log('errorCode', errorMessage)
    })
}

// style our component
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

/* render sign in component this uses firebase to authenticate and login a user with firebase with their inputted
 * email and password we need to store the email and password in state in this grandparent component to do this
 * https://stackoverflow.com/questions/57810595/material-ui-how-to-extract-the-value-of-the-text-field */
const SignIn = ({ setUserToken, setUid, setRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='Email'
            label='Email Address'
            name='Email'
            autoComplete='email'
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(event) => { setPassword(event.target.value) }}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            // type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={() => loginAuth(email, password, setUserToken, setUid)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={(e) => renderRegister(e, setRegister)}
                href='#'
                variant='body2'
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8} />
    </Container>
  )
}

export default SignIn
