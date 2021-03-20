/* eslint-disable multiline-ternary */
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Check from '@material-ui/icons/Check'
import CircularProgress from '@material-ui/core/CircularProgress'
import { gql, useMutation } from '@apollo/client'
const MAKE_CONVERSATION = gql`
  mutation(
    $conversationName: String!
    $conversationPublic: Boolean!
    $channelId: Int!
    $userId: Int!
  ) {
    insert_users_conversations_one(
      object: {
        conversation: {
          data: {
            name: $conversationName
            public: $conversationPublic
            channel_id: $channelId
          }
        }
        user_id: $userId
      }
    ) {
      conversation {
        id
        name
        public
        channel_id
      }
    }
  }
`
const MAKE_CHANNEL = gql`
  mutation($channelName: String!, $userId: Int!) {
    insert_users_channels_one(
      object: {
        users_id: $userId
        channel: { data: { name: $channelName, user_id: $userId } }
      }
    ) {
      channel {
        id
        user_id
        name
      }
    }
  }
`

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  }
}))

const CreateTextSingleLine = ({
  type = 'conversation',
  currentUser,
  currentState,
  placeholder,
  conversationPublic = true
}) => {
  const classes = useStyles()
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [makeConversation] = useMutation(MAKE_CONVERSATION)
  const [makeChannel] = useMutation(MAKE_CHANNEL)
  // used for testing without using apollo
  // const makeConversation = async () => {
  //   await new Promise((resolve) => {
  //     setTimeout(resolve, 1000);
  //   });
  // };

  const submit = async (text) => {
    setSubmitting(true)
    if (type === 'conversation') {
      // await makeConversation();
      await makeConversation({
        variables: {
          conversationName: text,
          conversationPublic: conversationPublic,
          channelId: currentState.channel,
          userId: currentUser.id
        }
      })
    }
    if (type === 'channel') {
      // await makeConversation();
      await makeChannel({
        variables: { channelName: text, userId: currentUser.id }
      })
    }
    setSubmitting(false)
    setText('')
  }
  return (
    <FormControl variant='outlined' className={classes.root}>
      <InputLabel>{placeholder}</InputLabel>
      <OutlinedInput
        disabled={submitting}
        type='text'
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyUp={(e) => {
          if (e.which === 13) {
            submit(text)
          }
        }}
        endAdornment={
          !submitting ? (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
                  submit(text)
                }}
                edge='end'
              >
                <Check />
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position='end'>
              <CircularProgress />
            </InputAdornment>
          )
        }
        labelWidth={placeholder.length * 9}
      />
    </FormControl>
  )
}
export default CreateTextSingleLine
