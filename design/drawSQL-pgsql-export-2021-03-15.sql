CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "user_uuid" UUID NOT NULL,
    "display_name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "messages"(
    "id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "message" JSON NOT NULL,
    "date_sent" DATE NOT NULL
);
ALTER TABLE
    "messages" ADD PRIMARY KEY("id");
CREATE TABLE "channels"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "channels" ADD PRIMARY KEY("id");
CREATE TABLE "conversations"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "public" BOOLEAN NOT NULL,
    "channel_id" INTEGER NOT NULL
);
ALTER TABLE
    "conversations" ADD PRIMARY KEY("id");
CREATE TABLE "users_conversations"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "conversation_id" INTEGER NOT NULL
);
ALTER TABLE
    "users_conversations" ADD PRIMARY KEY("id");
CREATE TABLE "users_channels"(
    "id" INTEGER NOT NULL,
    "channels_id" INTEGER NOT NULL,
    "users_id" INTEGER NOT NULL
);
ALTER TABLE
    "users_channels" ADD PRIMARY KEY("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_conversation_id_foreign" FOREIGN KEY("conversation_id") REFERENCES "conversations"("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "conversations" ADD CONSTRAINT "conversations_channel_id_foreign" FOREIGN KEY("channel_id") REFERENCES "channels"("id");
ALTER TABLE
    "users_channels" ADD CONSTRAINT "users_channels_users_id_foreign" FOREIGN KEY("users_id") REFERENCES "users"("id");
ALTER TABLE
    "channels" ADD CONSTRAINT "channels_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "users_channels" ADD CONSTRAINT "users_channels_channels_id_foreign" FOREIGN KEY("channels_id") REFERENCES "channels"("id");
ALTER TABLE
    "users_conversations" ADD CONSTRAINT "users_conversations_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "users_conversations" ADD CONSTRAINT "users_conversations_conversation_id_foreign" FOREIGN KEY("conversation_id") REFERENCES "conversations"("id");