import SignIn from '.'

const story = {
  title: 'SignIn',
  component: SignIn
}

// function that will render out our imported Composer component as a story in storybook
const Text = () => <SignIn />

export default story
export { Text }
