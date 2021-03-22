import SelectorConversationPrivate from './SelectorConversationPrivate'
import SelectorConversationPublic from './SelectorConversationPublic'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useState } from 'react'
import Divider from '@material-ui/core/Divider'

const SelectorConversation = ({
  publicConversations,
  privateConversations,
  setCurrentConversation,
  currentState,
  currentUser
}) => {
  const [value, setValue] = useState(0)
  return (
    <>
      <div>
        <AppBar position='static' color='default' elevation={0}>
          <Tabs
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
          >
            <Tab label='Public' />
            <Tab label='Private' />
          </Tabs>
          <Divider />
        </AppBar>
        {value === 0 && (
          <SelectorConversationPublic
            publicConversations={publicConversations}
            setCurrentConversation={setCurrentConversation}
            currentState={currentState}
            currentUser={currentUser}
          />
        )}
        {value === 1 && (
          <SelectorConversationPrivate
            privateConversations={privateConversations}
            setCurrentConversation={setCurrentConversation}
            currentState={currentState}
            currentUser={currentUser}
          />
        )}
      </div>
    </>
  )
}

export default SelectorConversation
