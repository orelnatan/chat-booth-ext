import { Environment } from "@chat-booth/core/models";

export const environment: Environment = {
  production: false,
  baseUrl: "https://us-central1-chat-booth-server-v0.cloudfunctions.net/graphqlServer/graphql",
//  baseUrl: "https://1f04-105-71-135-58.ngrok-free.app/chat-booth-server-v0/us-central1/graphqlServer/graphql",
 // baseUrl: "https://0aa9-41-142-31-241.ngrok-free.app/chat-booth-server-v0/us-central1/graphqlServer/graphql"
};

/*
Generate Env files: 
  https://stackoverflow.com/questions/78629253/angular-v18-missing-the-environments-folder
  ng g environments
*/
