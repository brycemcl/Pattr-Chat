import MessagesBody from '.'

const story = {
  title: 'MessagesBody',
  component: MessagesBody
}

// function that will render out our imported Composer component as a story in storybook
const bodyOfMessages = () => <MessagesBody />

export default story
export { bodyOfMessages }
