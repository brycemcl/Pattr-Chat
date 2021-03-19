import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useEffect } from 'react'

// style text field in composer component
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    '& .MuiTextField-root': {},
    marginLeft: '275px',
    width: '375px'
  }
}))

/* composer component - uses material ui's multiline text/input field
 * https://material-ui.com/components/text-fields/#multiline */
const Composer = ({ value, setValue, currentState, sendMessage }) => {
  // clear message when user clicks on a different conversation (currentState changes) - bug squash
  useEffect(() => {
    setValue('')
  }, [currentState, setValue])

  const classes = useStyles()

  return (
    <TextField
      id='outlined-multiline-static'
      multiline
      autoFocus
      rows={4}
      value={value}
      className={classes.root}
      onChange={(event) => setValue(event.target.value)}
      variant='outlined'
      onKeyUp={(e) => {
        if (e.which === 13) {
          sendMessage(e)
        }
      }}
    />
  )
}

export default Composer
