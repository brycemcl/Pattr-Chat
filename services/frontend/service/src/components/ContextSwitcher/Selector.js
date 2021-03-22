import SelectorChannel from './SelectorChannel'
import SelectorConversation from './SelectorConversation'
import { useState } from 'react'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Selector = ({
  channels,
  publicConversations,
  privateConversations,
  setCurrentChannel,
  setCurrentConversation,
  currentState,
  currentUser
}) => {
  const [value, setValue] = useState(false)
  const currentChannel = channels.filter((channel) => {
    return channel.id === currentState.channel
  })?.[0]
  const toggleChannelSelectorOpen = () => {
    setValue((cs) => !cs)
  }
  return (
    <div>
      <AppBar position='static' color='default'>
        <Tabs
          value={0}
          onChange={() => toggleChannelSelectorOpen()}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          <Tab
            label={
              <div>
                {value ? 'Select a Channel' : `${currentChannel?.name} Channel`}
                &nbsp;
                <SwapHorizIcon fontSize='inherit' />
              </div>
            }
          />
        </Tabs>
      </AppBar>
      {value && (
        <SelectorChannel
          channels={channels}
          setCurrentChannel={setCurrentChannel}
          currentState={currentState}
          currentUser={currentUser}
          toggleChannelSelectorOpen={toggleChannelSelectorOpen}
        />
      )}
      {!value && (
        <SelectorConversation
          publicConversations={publicConversations}
          privateConversations={privateConversations}
          setCurrentConversation={setCurrentConversation}
          currentState={currentState}
          currentUser={currentUser}
        />
      )}
    </div>
  )
}

export default Selector
