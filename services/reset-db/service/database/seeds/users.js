const faker = require('faker');
faker.seed(56546213231564);
const axios = require('axios');
const xHasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

const createUser = async (displayName) => {
  return await axios({
    method: 'post',
    url: 'graphql-engine:8080/v1/graphql',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': xHasuraAdminSecret,
    },
    data: `mutation {
      insert_users_one(object: {display_name: ${displayName}}) {
        id
        display_name
        user_uuid
      }
    }`,
  })
    .then((response) => {
      // console.log('here');
      // console.log(response);
    })
    .catch((error) => {
      // console.log('here:error');
      // console.log(error);
    });
};

const usernames = Array.from({ length: 5000 }, () =>
  faker.fake('{{name.lastName}} {{name.firstName}}')
);
// console.log(usernames);

const seedUsers = async () => {
  usernames.map((username) => {
    return createUser(username);
  });
  return Promise.all(usernames);
};
module.exports = { seedUsers };
