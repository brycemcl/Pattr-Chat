// import { action } from '@storybook/addon-actions';
import Button from '.'

const story = {
  title: 'Button',
  component: Button
}
const Text = () => <Button>Hello hot reload</Button>

export default story
export { Text }
