// import { action } from '@storybook/addon-actions';
import Sidebar from '.'

const story = {
  title: 'Sidebar',
  component: Sidebar
}

// dummy data back from back end with users conversations they are part of
const conversations = [
  {
    id: 1,
    name: 'memes'
  },
  {
    id: 2,
    name: 'sport'
  },
  {
    id: 3,
    name: 'work'
  }
]

// dummy data back from back end with users dms they are using - this is everyone in their company
// const dms = [];

const Text = () => <Sidebar conversations={conversations} />

export default story
export { Text }
