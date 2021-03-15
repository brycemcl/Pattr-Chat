const { numberOfUsers, fakerSeed } = require('../../scale')
const faker = require('faker')
faker.seed(fakerSeed)
const { graphqlApi } = require('../apiConnection')
const users = []
const createUser = async (displayName) => {
  const objectToPost = {
    query: `mutation($displayName: String!) {
      insert_users_one(object: {display_name: $displayName}) {
        id
        display_name
        user_uuid
      }
    }
    `,
    variables: { displayName }
  }
  const user = await graphqlApi
    .post('/', objectToPost)
    .then((result) => result.data.data.insert_users_one)
    .catch(() => {})
  return user
}

const usernames = Array.from({ length: numberOfUsers }, () =>
  faker.fake('{{name.lastName}} {{name.firstName}}')
)

const seedUsers = async () => {
  for (const user of usernames) {
    users.push(await createUser(user))
  }
}
module.exports = { seedUsers, users }
