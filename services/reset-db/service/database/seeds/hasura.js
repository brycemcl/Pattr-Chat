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
  const jsonObjectToPost = {
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
  jsonObjectToPost.args[0].args.table.name = table
  return metadataApi.post('/', jsonObjectToPost)
}
const trackFkRelationship = async ({
  foreign_table_name,
  table_schema,
  foreign_table_schema,
  table_name,
  column_name
}) => {
  const query = {
    type: 'bulk',
    source: 'default',
    args: [
      {
        type: 'pg_create_array_relationship',
        args: {
          name: 'placeholder',
          table: { name: 'placeholder', schema: 'placeholder}' },
          using: {
            foreign_key_constraint_on: {
              table: { name: 'placeholder', schema: 'placeholder}' },
              column: 'placeholder'
            }
          },
          source: 'default'
        }
      }
    ]
  }
  query.args[0].args.name = table_name
  query.args[0].args.table.name = foreign_table_name
  query.args[0].args.table.schema = table_schema
  query.args[0].args.using.foreign_key_constraint_on.table.name = table_name
  query.args[0].args.using.foreign_key_constraint_on.table.schema = foreign_table_schema
  query.args[0].args.using.foreign_key_constraint_on.column = column_name
  return await metadataApi.post('/', query)
}

const setupHasura = async (tables, fks) => {
  await reloadMetadata()

  for (const table of tables) {
    await trackTable(table)
  }
  for (const fk of fks) {
    await trackFkRelationship(fk)
  }
}
module.exports = { setupHasura }

/* eslint-disable camelcase */
