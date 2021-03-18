import { formatRelative } from 'date-fns'

// helper function that takes in the date from props then returns a formatted date
const formatRelativeToNow = (date) => {
  if (!date) {
    return null
  }
  return formatRelative(date, new Date())
}

/* MessageMetadata child component which renders out the date and time for a message
 * call our helper function in our component to render the metadata */
const MessageMetadata = ({ name = null, date = null }) => {
  return (
    <>
      <p>
        <strong>{name}</strong> {formatRelativeToNow(date)}
      </p>
    </>
  )
}

export default MessageMetadata
