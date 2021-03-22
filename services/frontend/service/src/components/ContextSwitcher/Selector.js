import SelectorChannel from './SelectorChannel'
import SelectorConversation from './SelectorConversation'
import { useState, useEffect } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  channelSelector: {
    height: '80px',
    fontSize: '18px'
  }
}))

const Selector = ({
  channels,
  publicConversations,
  privateConversations,
  setCurrentChannel,
  setCurrentConversation,
  currentState,
  currentUser
}) => {
  const classes = useStyles()
  const [value, setValue] = useState(false)
  const currentChannel = channels.filter((channel) => {
    return channel.id === currentState.channel
  })?.[0]
  const toggleChannelSelectorOpen = () => {
    if (currentChannel) {
      setValue((cs) => !cs)
    } else {
      setValue(true)
    }
  }
  useEffect(() => {
    if (!currentChannel) {
      setValue(true)
    }
  }, [currentChannel])
  return (
    <div>
      <AppBar position='static' color='default'>
        <Tabs
          className={classes.channelSelector}
          value={0}
          onChange={() => toggleChannelSelectorOpen()}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          <Tab
            disabled={!currentChannel}
            className={classes.channelSelector}
            label={
              <div>
                {value
                  ? currentChannel
                      ? 'Select a Channel'
                      : 'Create a Channel'
                  : `${currentChannel?.name} Channel`}
                &nbsp;
                <ExpandMoreIcon fontSize='inherit' />
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
