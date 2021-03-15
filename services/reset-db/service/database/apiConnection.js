const axios = require('axios')
const xHasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET

const metadataApi = axios.create({
  baseURL: 'http://graphql-engine:8080/v1/metadata/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': xHasuraAdminSecret
  }
})
const graphqlApi = axios.create({
  baseURL: 'http://graphql-engine:8080/v1/graphql/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': xHasuraAdminSecret
  }
})

module.exports = { metadataApi, graphqlApi }
