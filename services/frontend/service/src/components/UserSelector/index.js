import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { blue } from '@material-ui/core/colors'
import { gql, useQuery } from '@apollo/client'

// graphQL stuff here!

/* step 1
 * first query to find all users in a channel
 * this needs to refer to currentStates .users elected channel to show the user all users ONLY in the currently selected organization
 * they can add to the desired conversation */
const GET_USERS_IN_CHANNEL = gql`
query ($channelId: Int!) {
  users_channels(where: {channels_id: {_eq: $channelId}}) {
    user {
      display_name
      id
    }
  }
}
`

/* step 2
 * second mutator to use currentState.conversation and currentState.channel to add user to the specific conversation selected.
 * this needs to refer to currentStates .users elected conversation to update the selected user into */
const emails = ['bobby@hi.com']

// appling styles to component
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
})

// simple dialog helper function that
function SimpleDialog (props) {
  const classes = useStyles()
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
      <DialogTitle id='simple-dialog-title'>Add user</DialogTitle>
      <List>
        {props.usersForChats.map((user) => (
          <ListItem button onClick={() => handleListItemClick(user.user.id)} key={user.user.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.user.display_name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

// ?
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
}

// exportour UserSelector component
export default function UserSelector ({ currentState }) {
  // an array of fake data
  const usersForChats = []

  // usestate in this component that
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(emails[1])

  // grab this hook, which stores the data back from graphql with users that are in the users orginzation
  const { loading, error, data } = useQuery(GET_USERS_IN_CHANNEL, {
    variables: { channelId: currentState.channel }
  })

  // useEffect in this component that should only fire off whenever data changes and comes back from
  // out graphQL db
  if (!loading && !error) {
    data.users_channels.map((user) => {
      console.log('users HERE', user)
      return usersForChats.push(user)
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <div>
      {/* <Typography variant="subtitle1">Selected: {selectedValue}</Typography> */}
      <br />
      <Button onClick={handleClickOpen}>
        <PersonAddIcon />
      </Button>
      <SimpleDialog
        usersForChats={usersForChats}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  )
}
