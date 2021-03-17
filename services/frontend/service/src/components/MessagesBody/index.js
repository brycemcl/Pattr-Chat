import MessagesPane from '../MessagesPane/index'
import SendMessageForm from '../SendMessageForm'

function MessagesBody ({ currentState, setCurrentState }) {
  return (
    <div>
      <div><MessagesPane /></div>
      <div><SendMessageForm /></div>
    </div>
  )
}

export default MessagesBody
