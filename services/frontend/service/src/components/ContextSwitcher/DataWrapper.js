import Selector from './Selector'
import Spinner from '../Spinner'
import useChannels from './useChannels'

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
  if (loading) return <Spinner />
  if (error) return <p>Error :(</p>
  return (
    <Selector
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
