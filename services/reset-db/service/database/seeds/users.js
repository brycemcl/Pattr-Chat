// import the scale constants
const { numberOfUsers, fakerSeed } = require('../../scale')
// setup faker
const faker = require('faker')
faker.seed(fakerSeed)
// reuse api settings
const { graphqlApi } = require('../apiConnection')
// we are going to be exporting this
const users = []
const createUser = async (displayname) => {
  const objectToPost = {
    query: `mutation($displayname: String!) {
      insert_users_one(object: {display_name: $displayname}) {
        id
        display_name
        user_uuid
      }
    }
    `,
    variables: { displayname }
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
