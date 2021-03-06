import SelectorChannel from './SelectorChannel'
import SelectorConversation from './SelectorConversation'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  channelSelector: {
    height: '79px',
    fontSize: '18px'
  }
}))

const Selector = ({
  value,
  currentChannel,
  toggleChannelSelectorOpen,
  channels,
  publicConversations,
  privateConversations,
  setCurrentChannel,
  setCurrentConversation,
  currentState,
  currentUser
}) => {
  const classes = useStyles()

  return (
    <div>
      <AppBar position='static' color='default' elevation={0}>
        <Tabs
          className={classes.channelSelector}
          value={0}
          onChange={() => toggleChannelSelectorOpen()}
          TabIndicatorProps={{
            style: {
              display: 'none'
            }
          }}
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
                  : `${currentChannel?.name}`}
                &nbsp;
                <ExpandMoreIcon fontSize='inherit' />
              </div>
            }
          />
        </Tabs>
        <Divider />
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
