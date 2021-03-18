// import { action } from '@storybook/addon-actions';
import CreateTextSingleLine from '.'

const story = {
  title: 'CreateTextSingleLine',
  component: CreateTextSingleLine
}

const newConversation = () => <CreateTextSingleLine placeholder='New Channel' />

export default story
export { newConversation }
