// import { action } from '@storybook/addon-actions';
import Header from '.'

const story = {
  title: 'Header',
  component: Header
}

const Text = () => <Header>Hello hot reload</Header>

export default story
export { Text }
