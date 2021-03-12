import React from 'react'

import MainView from '../components/MainView'

export default {
  component: MainView,
  title: 'MainView'
}

const Template = args => <MainView {...args} />

export const Default = Template.bind({})
Default.args = {
  MainView: {
  }
}

// storiesOf('Button', module)
//   .addParameters({
//     backgrounds: [{ name: 'dark', value: '#222f3e', default: true }],
//   })
//   .add('Base', () => <Button>Base</Button>)
//   .add('Confirm', () => <Button confirm>Confirm</Button>)
//   .add('Danger', () => <Button danger>Cancel</Button>)
//   .add('Clickable', () => (
//     <Button onClick={action('button-clicked')}>Clickable</Button>
//   ))
//   .add('Disabled', () => (
//     <Button disabled onClick={action('button-clicked')}>
//       Disabled
//     </Button>
//   ));
