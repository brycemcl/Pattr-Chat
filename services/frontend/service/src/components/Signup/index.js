import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { ToastContainer, toast } from 'react-toastify'
import Container from '@material-ui/core/Container'
import firebase from '../../firebase'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

// mutator graphql query which when used, will add a newly registered user into our users table of our PG db
const MAKE_USER = gql`
  mutation createUser($displayName: String!, $uuid: String!) {
    insert_users_one(object: { display_name: $displayName, user_uuid: $uuid }) {
      id
      display_name
      user_uuid
    }
  }
`

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '120px',
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

// helper function that can render the login component conditonally when the "need an account?" link is clicked
const renderLogin = function (event, setRegister) {
  event.preventDefault()
  setRegister(false)
}

/* helper function to set the users token, uid and display name in our applications state,
 * also makes the user in our db with graphql, apollo + postgress
 * makeUser returns a promise after it inserts the user into our postgress db, in the .then
 * we update our currentUsr state with setCurrentUser + set our local storages uid to the uid the makeUseer function
 * returns in its .then */
const registerAuth = function (
  email,
  password,
  displayname,
  setCurrentUser,
  makeUser
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user

      return makeUser({
        variables: {
          displayName: displayname,
          uuid: user.uid
        }
      })
    })
    .then(({ data }) => {
      setCurrentUser(data.insert_users_one)
      window.localStorage.setItem('Uid', data.insert_users_one.user_uuid)
    })
    .catch((error) => {
      const errorMessage = error.message
      toast.error(errorMessage)
    })
}

// sign up component in this app
const SignUp = ({ setRegister, setCurrentUser }) => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [password, setPassword] = useState('')

  // makeUser/mutation hook which uses our above mutation and stores it in our components state
  // makeUser is a function we destructure from useMutation(), its a function that returns a promise
  const [makeUser] = useMutation(MAKE_USER)

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div>
        <ToastContainer position='bottom-center' />
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='dname'
                name='displayname'
                variant='outlined'
                required
                fullWidth
                id='displayname'
                label='Display Name'
                autoFocus
                value={displayname}
                onChange={(event) => {
                  setDisplayname(event.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={() =>
              registerAuth(
                email,
                password,
                displayname,
                setCurrentUser,
                makeUser
              )}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link
                href='#'
                variant='body2'
                onClick={(e) => renderLogin(e, setRegister)}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} />
    </Container>
  )
}

export default SignUp
