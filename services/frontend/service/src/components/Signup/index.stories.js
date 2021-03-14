import SignUp from '.'

const story = {
  title: 'SignUp',
  component: SignUp
}

// function that will render out our imported Composer component as a story in storybook
const SignUpForm = () => <SignUp />

export default story
export { SignUpForm }
