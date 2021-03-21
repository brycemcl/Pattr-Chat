import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { blue } from '@material-ui/core/colors'
import { ToastContainer } from 'react-toastify'
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

const UserSelector = ({ currentState }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  return (
    <>
      <br />
      <Button onClick={() => setOpen(true)} className={classes.button}>
        <PersonAddIcon />
        <div>
          <ToastContainer position='bottom-center' />
        </div>
      </Button>
      {open &&
        <DataWrapper open={open} setOpen={setOpen} currentState={currentState} />}
    </>
  )
}

export default UserSelector
