const resetSchema = (db) => {
  return db.query(`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  -- DROP TABLE IF EXISTS "users_channels" CASCADE;
  -- DROP TABLE IF EXISTS "users_conversations" CASCADE;
  -- DROP TABLE IF EXISTS "conversations" CASCADE;
  -- DROP TABLE IF EXISTS "channels" CASCADE;
  -- DROP TABLE IF EXISTS "messages" CASCADE;
  -- DROP TABLE IF EXISTS "users" CASCADE;

  CREATE TABLE "users"( "id" SERIAL PRIMARY KEY NOT NULL, "user_uuid" VARCHAR(255) DEFAULT uuid_generate_v4 () NOT NULL, "display_name" VARCHAR(255) NOT NULL );
  CREATE TABLE "messages"( "id" SERIAL PRIMARY KEY NOT NULL, "conversation_id" INTEGER NOT NULL, "user_id" INTEGER NOT NULL, "message" JSON NOT NULL, "date_sent" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE "channels"( "id" SERIAL PRIMARY KEY NOT NULL, "user_id" INTEGER NOT NULL, "name" VARCHAR(255) NOT NULL );
  CREATE TABLE "conversations"( "id" SERIAL PRIMARY KEY NOT NULL, "name" VARCHAR(255) NOT NULL, "public" BOOLEAN NOT NULL, "channel_id" INTEGER NOT NULL );
  CREATE TABLE "users_conversations"( "id" SERIAL PRIMARY KEY NOT NULL, "user_id" INTEGER NOT NULL, "conversation_id" INTEGER NOT NULL );
  CREATE TABLE "users_channels"( "id" SERIAL PRIMARY KEY NOT NULL, "channels_id" INTEGER NOT NULL, "users_id" INTEGER NOT NULL );
  
  ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_foreign" FOREIGN KEY("conversation_id") REFERENCES "conversations"("id");
  ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
  ALTER TABLE "conversations" ADD CONSTRAINT "conversations_channel_id_foreign" FOREIGN KEY("channel_id") REFERENCES "channels"("id");
  ALTER TABLE "users_channels" ADD CONSTRAINT "users_channels_users_id_foreign" FOREIGN KEY("users_id") REFERENCES "users"("id");
  ALTER TABLE "channels" ADD CONSTRAINT "channels_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
  ALTER TABLE "users_channels" ADD CONSTRAINT "users_channels_channels_id_foreign" FOREIGN KEY("channels_id") REFERENCES "channels"("id");
  ALTER TABLE "users_conversations" ADD CONSTRAINT "users_conversations_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
  ALTER TABLE "users_conversations" ADD CONSTRAINT "users_conversations_conversation_id_foreign" FOREIGN KEY("conversation_id") REFERENCES "conversations"("id");
  `)
}

module.exports = { resetSchema }
