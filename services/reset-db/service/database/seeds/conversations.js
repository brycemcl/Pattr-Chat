// import the scale constants
const {
  numberOfUsers,
  numberOfConversationsPerUser,
  fakerSeed,
  numberOfChannels
} = require('../../scale')
// setup faker
const faker = require('faker')
faker.seed(fakerSeed)
// reuse api settings
const { graphqlApi } = require('../apiConnection')
// we are going to be exporting this
const conversations = []
const conversationProto = []

Array.from({ length: numberOfUsers }).forEach((_, index) => {
  for (let i = 0; i < numberOfConversationsPerUser; i++) {
    conversationProto.push({
      userId: index,
      conversationName: faker.fake(
        '{{commerce.productAdjective}} {{company.catchPhraseNoun}}'
      ),
      publicConversation: faker.random.boolean(),
      channelId: faker.random.number({ min: 1, max: numberOfChannels })
    })
  }
})

const createConversation = async ({
  userId,
  conversationName,
  publicConversation,
  channelId
}) => {
  const objectToPost = {
    query: `
    mutation(
      $userId: Int!
      $conversationName: String!
      $publicConversation: Boolean!
      $channelId: Int!
    ) {
      insert_users_conversations_one(
        object: {
          user_id: $userId
          conversation: {
            data: {
              name: $conversationName
              public: $publicConversation
              channel_id: $channelId
            }
          }
        }
      ) {
        id
        user_id
        conversation {
          name
          id
          public
          channel_id
        }
      }
    }    
    `,
    variables: {
      userId: userId + 1,
      conversationName,
      publicConversation,
      channelId
    }
  }
  const channel = await graphqlApi
    .post('/', objectToPost)
    .then((result) => result.data.data.insert_users_conversations_one)
    .catch((err) => {
      console.log(err)
    })
  return channel
}

const seedConversations = async () => {
  for (const channel of conversationProto) {
    conversations.push(await createConversation(channel))
  }
}
module.exports = { seedConversations, conversations }
