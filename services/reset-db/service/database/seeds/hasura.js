const axios = require('axios');
const xHasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

const metadataApi = axios.create({
  baseURL: 'http://graphql-engine:8080/v1/metadata/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': xHasuraAdminSecret,
  },
});

const reloadMetadata = async () => {
  const jsonObjectToPost = {
    type: 'reload_metadata',
    args: {
      reload_remote_schemas: true,
    },
  };
  return metadataApi.post('/', jsonObjectToPost);
};

const trackTable = async (table) => {
  const jsonObjectToPost = {
    type: 'bulk',
    args: [
      {
        type: 'pg_track_table',
        args: {
          table: {
            name: 'users_channels',
          },
        },
      },
    ],
  };
  jsonObjectToPost.args[0].args.table.name = table;
  return metadataApi.post('/', jsonObjectToPost);
};





const setupHasura = async (tables) => {
  await reloadMetadata();
  tables.map((table) => trackTable(table));
  await Promise.all(tables);

};

module.exports = { setupHasura };
