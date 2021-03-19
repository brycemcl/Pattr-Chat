import UserSelector from '.'

const story = {
  title: 'UserSelector',
  component: UserSelector
}

// function that will render out our imported Composer component as a story in storybook
const SelectingUsers = () => <UserSelector />

export default story
export { SelectingUsers }
