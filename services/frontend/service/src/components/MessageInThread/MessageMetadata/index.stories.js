// import { action } from '@storybook/addon-actions';
import MessageMetadata from '.'

const story = {
  title: 'MessageMetaData',
  component: MessageMetadata
}

const staticDate = new Date('2021-03-12T22:04:32.285Z')

const dataWithNameAndTime = () => (
  <MessageMetadata name='Bob Runs Wild' date={staticDate} />
)

export default story
export { dataWithNameAndTime }
