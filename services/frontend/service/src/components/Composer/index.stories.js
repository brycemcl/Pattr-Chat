import Composer from '.'

const story = {
  title: 'Composer',
  component: Composer
}

// function that will render out our imported Composer component as a story in storybook
const Text = () => <Composer />

export default story
export { Text }
