/* eslint-disable camelcase */
const { metadataApi } = require('../apiConnection')

const reloadMetadata = async () => {
  const jsonObjectToPost = {
    type: 'reload_metadata',
    args: {
      reload_remote_schemas: true
    }
  }
  return metadataApi.post('/', jsonObjectToPost)
}

const trackTable = async (table) => {
  const objectToPost = {
    type: 'bulk',
    args: [
      {
        type: 'pg_track_table',
        args: {
          table: {
            name: 'users_channels'
          }
        }
      }
    ]
  }
  objectToPost.args[0].args.table.name = table
  return metadataApi.post('/', objectToPost)
}
const trackFkRelationship = async () => {
  return await metadataApi.post('/', require('./hasuraFkRelationships'))
}

const setupHasura = async (tables) => {
  await reloadMetadata()

  for (const table of tables) {
    await trackTable(table)
  }
  await trackFkRelationship()
}
module.exports = { setupHasura }

/* eslint-disable camelcase */
