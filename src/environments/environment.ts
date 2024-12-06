import { Environment } from "@chat-booth/core/models";

export const environment: Environment = {
  production: false,
 // baseUrl: "http://localhost:3001/graphql", 
  baseUrl: "https://us-central1-chat-booth-server-v0.cloudfunctions.net/graphqlServer/graphql",
 // baseUrl: "https://3e62-105-74-13-96.ngrok-free.app/chat-booth-server-v0/us-central1/graphqlServer/graphql"
};

/*
Generate Env files: 
  https://stackoverflow.com/questions/78629253/angular-v18-missing-the-environments-folder
  ng g environments
*/
