import MessageInThead from '../MessageInThread'
import { messagesForClickedUser } from '../../helpers/selectors'

// component to handle all the messages in the message pane
function MessagesPane () {
  // test id in this component to emulate the ID of the user clicked on in the sidebar, this will eventually have to come in as props dynamically?
  const clickedUserId = 1

  // helper function will have to be called here, that will get the messages for the person who was clicked on in the sidebar
  const filteredMessages = messagesForClickedUser(clickedUserId)

  /* map out filtered messages, then loop through them and make new messages for each one
   * passing down props when necessary */
  const mappedMessages = filteredMessages.map((message) => {
    return (
      <MessageInThead
        key={`${message.sender_id}${message.date}${message.name}${message.text}`}
        messageText={message.text}
        messageName={message.name}
      />
    )
  })

  // render out the array of messages from this MessagesPane component
  return (
    <main className='layout'>
      <section className='messaged'>
        {mappedMessages}
      </section>
    </main>
  )
};

export default MessagesPane
