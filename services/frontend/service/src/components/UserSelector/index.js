import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { blue } from '@material-ui/core/colors'
import DataWrapper from './DataWrapper'
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  button: {
    height: '32px',
    width: '56px'
  }
})

// UserSelector component - has open/Setopen hook which stores a boolean value
// this component returns the user selector button, which when clicked, conditionally
// returns a component inside, to pull up a list of users to add to a chat (if avalible)
const UserSelector = ({ currentState }) => {
  // this hook keeps track of if the user selector dialog box should open or not conditonally
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  return (
    <>
      <br />
      <Button onClick={() => setOpen(true)} className={classes.button}>
        <PersonAddIcon />
      </Button>
      {/* conditonally render the DataWrapper component when open === true, to avoid it rendering all the time in this component */}
      {open && (
        <DataWrapper
          open={open}
          setOpen={setOpen}
          currentState={currentState}
        />
      )}
    </>
  )
}

export default UserSelector
