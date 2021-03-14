import React from 'react'
import MessagesPane from '../MessagesPane/index'
import SendMessageForm from '../SendMessageForm'

function MessagesBody (props) {
  return (
    <div>
      <div><MessagesPane /></div>
      <div><SendMessageForm /></div>
    </div>
  )
}

export default MessagesBody
