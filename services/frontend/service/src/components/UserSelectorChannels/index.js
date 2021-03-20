import { useState } from 'react'
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
import { gql, useQuery, useMutation } from '@apollo/client'

/* step 1
 * first query to find all users in Pattr
 * they can add to the desired conversation */
const GET_ALL_USERS = gql`
  query {
    users {
      id
      display_name
    }
  }
`

/* step 2
  * second mutator to add a selected user to a desired channel */
const ADD_USERS_TO_CHANNEL = gql`
  mutation ($userId: Int!, $channelId: Int!) {
    insert_users_channels_one(object: {users_id: $userId, channels_id: $channelId}) {
      id
    }
  }
`

// appling styles to component
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
})

// simple dialog component to render the user click options
function SimpleDialog ({ onClose, selectedValue, open, allUsers, channel }) {
  // declare our useMutation to add users to conversations here, pass the setter down later
  const [addUserChannel] = useMutation(ADD_USERS_TO_CHANNEL)

  const classes = useStyles()

  const handleClose = () => {
    onClose(selectedValue)
  }

  // helper function to handle a user click and add a person to a conversation
  const handleListItemClick = (userId, channel, addUserChannel) => {
    // call addUserConversation adding the current conversation selected in state to the
    addUserChannel({
      variables: {
        userId: userId,
        channelId: channel.id
      }
    })
    onClose(userId)
  }

  // jsx returned from SimpleDialog component
  return (
    <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
      <DialogTitle id='simple-dialog-title'>Add user</DialogTitle>
      <List>
        {allUsers.map((user) => (
          <ListItem button onClick={(e) => handleListItemClick(user.id, channel, addUserChannel)} key={user.id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.display_name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

// exportour UserSelector component
export default function UserSelectorChannels ({ channel }) {
  const allUsers = []

  // usestate in this component that
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  // grab this hook, which stores the data back from graphql with users that are in the users orginzation
  const { loading, error, data } = useQuery(GET_ALL_USERS)

  // useEffect in this component that should only fire off whenever data changes and comes back from
  // out graphQL db
  if (!loading && !error) {
    data.users.map((user) => {
      return allUsers.push(user)
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    setSelectedValue(value)
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
  return (
    <div>
      {/* <Typography variant="subtitle1">Selected: {selectedValue}</Typography> */}
      <br />
      <Button onClick={(event) => {
        event.stopPropagation()
        handleClickOpen()
      }}
      >
        <PersonAddIcon />
      </Button>
      <SimpleDialog
        allUsers={allUsers}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        channel={channel}
      />
    </div>
  )
}
