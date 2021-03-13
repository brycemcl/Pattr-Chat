import SendMessageForm from '.'

const story = {
  title: 'SendMessageForm',
  component: SendMessageForm
}

// function that will render out our imported Composer component as a story in storybook
const Text = () => <SendMessageForm />

export default story
export { Text }
