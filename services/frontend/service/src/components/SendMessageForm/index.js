import { useState } from 'react'
import Composer from '../Composer'
import { action } from '@storybook/addon-actions'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

// style our  material UI button
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  }

}))

function SendMessageForm () {
  const [message, setMessage] = useState('')
  const classes = useStyles()

  // helper function to handle the submission of the form in this controlled component
  const handleSubmitForm = (event) => {
    event.preventDefault()
    // console.log('event: ', event)
    // console.log('message in state: ', message)
    console.log('Sent!')
    action('Text submitted!')
  }

  return (
    <form>
      <Composer value={message} setValue={setMessage} />
      <Button
        onClick={(e) => handleSubmitForm(e)}
        variant='contained'
        color='primary'
        className={classes.button}
      >Send
      </Button>
    </form>
  )
}

export default SendMessageForm
