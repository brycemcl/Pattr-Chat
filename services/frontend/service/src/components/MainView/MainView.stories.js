// import { action } from '@storybook/addon-actions';
import MainView from '.'

const story = {
  title: 'MainView',
  component: MainView
}
const Text = () => <MainView>Hello Button</MainView>

export default story
export { Text }
