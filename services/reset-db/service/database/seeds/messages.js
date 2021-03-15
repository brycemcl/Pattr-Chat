// import the scale constants
const {
  fakerSeed,
  numberOfMessagesPerConversationPerPerson
} = require('../../scale')
// setup faker
const faker = require('faker')
faker.seed(fakerSeed)
// reuse api settings
const { graphqlApi } = require('../apiConnection')
// we are going to be exporting this
const messages = []

const getConversations = async () => {
  const objectToPost = {
    query: `
    query {
      conversations {
        users_conversations {
          user_id
        }
        id
      }
    }
    `
  }
  const conversations = await graphqlApi
    .post('/', objectToPost)
    .then((result) => result.data.data.conversations)
    .catch((err) => {
      console.log(err)
    })

  const conversationProto = conversations.map((conversation) => {
    return {
      conversationId: conversation.id,
      userId: conversation.users_conversations[0].user_id
    }
  })
  return conversationProto
}

const createMessage = async ({ conversationId, userId, messageText }) => {
  const objectToPost = {
    query: `
    mutation($conversationId: Int!, $userId: Int!, $messageText: json!) {
      insert_messages_one(
        object: {
          conversation_id: $conversationId
          user_id: $userId
          message: $messageText
        }
      ) {
        id
        conversation_id
        user_id
        message
        date_sent
      }
    }
    
    `,
    variables: {
      conversationId,
      userId,
      messageText
    }
  }
  const message = await graphqlApi
    .post('/', objectToPost)
    .then((result) => result.data.data.insert_messages_one)
    .catch((err) => {
      console.log(err)
    })
  return message
}

const seedMessages = async () => {
  const conversations = await getConversations()
  for (const conversation of conversations) {
    for (let i = 0; i < numberOfMessagesPerConversationPerPerson; i++) {
      messages.push(
        await createMessage({
          conversationId: conversation.conversationId,
          userId: conversation.userId,
          messageText: faker.fake('{{commerce.productDescription}}')
        })
      )
    }
  }
}
module.exports = { seedMessages, messages }
