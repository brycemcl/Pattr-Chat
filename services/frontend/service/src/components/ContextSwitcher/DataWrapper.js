import Selector from './Selector'
import Spinner from '../Spinner'
import useChannels from './useChannels'
import { useState, useEffect } from 'react'
const DataWrapper = ({
  currentUser,
  currentState,
  setCurrentState,
  setCurrentChannel,
  setCurrentConversation
}) => {
  const {
    channels,
    publicConversations,
    privateConversations,
    error,
    loading
  } = useChannels({ currentUser, currentState, setCurrentState })

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
    } else {
      setValue(false)
    }
  }, [currentChannel])

  if (loading) return <Spinner />
  if (error) return <p>Error :(</p>

  return (
    <Selector
      value={value}
      currentChannel={currentChannel}
      toggleChannelSelectorOpen={toggleChannelSelectorOpen}
      channels={channels}
      publicConversations={publicConversations}
      privateConversations={privateConversations}
      setCurrentChannel={setCurrentChannel}
      setCurrentConversation={setCurrentConversation}
      currentState={currentState}
      currentUser={currentUser}
    />
  )
}

export default DataWrapper
