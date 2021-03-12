import React from 'react'

import MainView from '../components/MainView'

export default {
  component: MainView,
  title: 'MainView'
}

const Template = args => <MainView {...args} />

export const Default = Template.bind({})
Default.args = {
  // MainView: {
  // },
}
