// generated from the api request from the track all button on the data page of the console
module.exports = {
  type: 'bulk',
  source: 'default',
  args: [
    {
      type: 'pg_create_array_relationship',
      args: {
        name: 'channels',
        table: { name: 'users', schema: 'public' },
        using: {
          foreign_key_constraint_on: {
            table: { name: 'channels', schema: 'public' },
            column: 'user_id'
          }
        },
        source: 'default'
      }
    },
    {
      type: 'pg_create_array_relationship',
      args: {
        name: 'messages',
        table: { name: 'users', schema: 'public' },
        using: {
          foreign_key_constraint_on: {
            table: { name: 'messages', schema: 'public' },
            column: 'user_id'
          }
        },
        source: 'default'
      }
    },
    {
      type: 'pg_create_array_relationship',
      args: {
        name: 'users_channels',
        table: { name: 'users', schema: 'public' },
        using: {
          foreign_key_constraint_on: {
            table: { name: 'users_channels', schema: 'public' },
            column: 'users_id'
          }
        },
        source: 'default'
      }
    },
    {
      type: 'pg_create_array_relationship',
      args: {
        name: 'users_conversations',
        table: { name: 'users', schema: 'public' },
        using: {
          foreign_key_constraint_on: {
            table: { name: 'users_conversations', schema: 'public' },
            column: 'user_id'
          }
        },
        source: 'default'
      }
    },
    {
      type: 'pg_create_object_relationship',
      args: {
        name: 'conversation',
        table: { name: 'messages', schema: 'public' },
        using: { foreign_key_constraint_on: 'conversation_id' },
        source: 'default'
      }
    },
    {
      type: 'pg_create_object_relationship',
      args: {
        name: 'user',
        table: { name: 'messages', schema: 'public' },
        using: { foreign_key_constraint_on: 'user_id' },
        source: 'default'
      }
    },
    {
      type: 'pg_create_object_relationship',
      args: {
        name: 'user',
        table: { name: 'channels', schema: 'public' },
        using: { foreign_key_constraint_on: 'user_id' },
        source: 'default'
      }
    },
    {
      type: 'pg_create_array_relationship',
      args: {
        name: 'conversations',
        table: { name: 'channels', schema: 'public' },
        using: {
          foreign_key_constraint_on: {
            table: { name: 'conversations', schema: 'public' },
            column: 'channel_id'
          }
        },
        source: 'default'
      }
    },
    {
      type: 'pg_create_array_relationship',
      args: {
        name: 'users_channels',
        table: { name: 'channels', schema: 'public' },
        using: {
          foreign_key_constraint_on: {
            table: { name: 'users_channels', schema: 'public' },
            column: 'channels_id'
          }
        },
        source: 'default'
      }
    },
    {
      type: 'pg_create_object_relationship',
      args: {
        name: 'channel',
        table: { name: 'conversations', schema: 'public' },
        using: { foreign_key_constraint_on: 'channel_id' },
        source: 'default'
      }
    },
    {
      type: 'pg_create_array_relationship',
      args: {
        name: 'messages',
        table: { name: 'conversations', schema: 'public' },
        using: {
          foreign_key_constraint_on: {
            table: { name: 'messages', schema: 'public' },
            column: 'conversation_id'
          }
        },
        source: 'default'
      }
    },
    {
      type: 'pg_create_array_relationship',
      args: {
        name: 'users_conversations',
        table: { name: 'conversations', schema: 'public' },
        using: {
          foreign_key_constraint_on: {
            table: { name: 'users_conversations', schema: 'public' },
            column: 'conversation_id'
          }
        },
        source: 'default'
      }
    },
    {
      type: 'pg_create_object_relationship',
      args: {
        name: 'conversation',
        table: { name: 'users_conversations', schema: 'public' },
        using: { foreign_key_constraint_on: 'conversation_id' },
        source: 'default'
      }
    },
    {
      type: 'pg_create_object_relationship',
      args: {
        name: 'user',
        table: { name: 'users_conversations', schema: 'public' },
        using: { foreign_key_constraint_on: 'user_id' },
        source: 'default'
      }
    },
    {
      type: 'pg_create_object_relationship',
      args: {
        name: 'channel',
        table: { name: 'users_channels', schema: 'public' },
        using: { foreign_key_constraint_on: 'channels_id' },
        source: 'default'
      }
    },
    {
      type: 'pg_create_object_relationship',
      args: {
        name: 'user',
        table: { name: 'users_channels', schema: 'public' },
        using: { foreign_key_constraint_on: 'users_id' },
        source: 'default'
      }
    }
  ]
}
