import { useState } from 'react'
import Composer from '../Composer'
import { action } from '@storybook/addon-actions'
function SendMessageForm () {
  const [message, setMessage] = useState('')

  // helper function to handle the submission of the form in this controlled component
  const handleSubmitForm = (event) => {
    event.preventDefault()
    console.log('event: ', event)
    console.log('message in state: ', message)
    action('Text submitted!')
  }

  return (
    <form>
      <Composer value={message} setValue={setMessage} />
      <button onClick={(e) => handleSubmitForm(e)}>Submit</button>
    </form>
  )
}

export default SendMessageForm
