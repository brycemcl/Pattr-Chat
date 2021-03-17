import MessagesPane from '../MessagesPane/index'
import SendMessageForm from '../SendMessageForm'

function MessagesBody ({ currentState, setCurrentState, currentUser }) {
  return (
    <div>
      <div>
        <MessagesPane
          currentState={currentState}
          currentUser={currentUser}
        />
      </div>
      <div><SendMessageForm /></div>
    </div>
  )
}

export default MessagesBody
