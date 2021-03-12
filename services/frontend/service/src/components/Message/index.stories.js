// import { action } from '@storybook/addon-actions';
import Message from '.'

const story = {
  title: 'Message',
  component: Message
}
const text = () => (
  <Message>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam cupiditate
    veritatis aspernatur eveniet laborum sint ea excepturi officia hic ipsum
    debitis perspiciatis modi, suscipit iure iusto quo, ipsa repellat dolorum
    quod provident sit! Quia iure excepturi recusandae asperiores autem minus!
  </Message>
)

export default story
export { text }
