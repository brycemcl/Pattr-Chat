import MessagesPane from '../MessagesPane/index'
import SendMessageForm from '../SendMessageForm'

function MessagesBody ({ currentState, currentUser }) {
  return (
    <div>
      <div>
        <MessagesPane
          currentState={currentState}
          currentUser={currentUser}
        />
      </div>
      <div>
        <SendMessageForm
          currentUser={currentUser}
          currentState={currentState}
        />
      </div>
    </div>
  )
}

export default MessagesBody
