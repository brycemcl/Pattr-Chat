import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

// style text field in composer component
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    '& .MuiTextField-root': {
      width: '55ch'
    },
    marginLeft: '275px'
  }
}))

// composer component - uses material ui's multiline text/input field
// https://material-ui.com/components/text-fields/#multiline
const Composer = ({ value, setValue }) => {
  const classes = useStyles()

  return (
    <TextField
      id='outlined-multiline-static'
      multiline
      rows={4}
      value={value}
      className={classes.root}
      onChange={(event) => setValue(event.target.value)}
      variant='outlined'
    />
  )
}

export default Composer
