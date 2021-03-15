// import the scale constants
const { numberOfChannels, fakerSeed } = require('../../scale')
// const { users } = require('./users');
// setup faker
const faker = require('faker')
faker.seed(fakerSeed)
// reuse api settings
const { graphqlApi } = require('../apiConnection')
// we are going to be exporting this
const channels = []

const channelsProto = Array.from({ length: numberOfChannels }).map(
  (_, index) => {
    return {
      userId: index,
      channelName: faker.fake(
        '{{commerce.productAdjective}} {{company.catchPhraseNoun}}'
      )
    }
  }
)

const createChannel = async ({ userId, channelName }) => {
  const objectToPost = {
    query: `
    mutation($userId: Int!, $channelName:String!) {
      insert_users_channels_one(object: {users_id: $userId, channel: {data: {name: $channelName, user_id: $userId}}}) {
        id
        users_id
        channel {
          user_id
          name
          id
        }
      }
    }
    `,
    variables: { userId: userId + 1, channelName }
  }
  const channel = await graphqlApi
    .post('/', objectToPost)
    .then((result) => result.data.data.insert_users_channels_one)
    .catch(() => {})
  return channel
}

const seedChannels = async () => {
  for (const channel of channelsProto) {
    channels.push(await createChannel(channel))
  }
}
module.exports = { seedChannels, channels }
