import MessagesPane from '.'

const story = {
  title: 'MessagesPane',
  component: MessagesPane
}

// function that will render out our imported Composer component as a story in storybook
const Text = () => <MessagesPane />

export default story
export { Text }
