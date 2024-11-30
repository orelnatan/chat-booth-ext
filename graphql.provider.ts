import { ApplicationConfig, inject } from '@angular/core';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { lastValueFrom } from 'rxjs';

import { environment } from '@chat-booth/env/environment';
import { ChromeLocalStorageService } from '@chat-booth/core/services';
import { AuthCredentials } from '@chat-booth/auth/models';

interface ApolloOptionsFactoryConfig {
  link: ApolloLink,
  cache: InMemoryCache
}

export function apolloOptionsFactory(): ApolloOptionsFactoryConfig {
  const chromeLocalStorageService: ChromeLocalStorageService = inject(ChromeLocalStorageService);
  const httpLink: HttpLink = inject(HttpLink);
 
  let credentials: AuthCredentials;

  // Middleware to relove the auth credentials
  const credentialsMiddleware: ApolloLink = setContext(async() => {
    credentials = await lastValueFrom(
      chromeLocalStorageService.get<AuthCredentials>(['uid', 'idToken'])
    );
  });

  // Middleware to attach the authorization idToken
  const idTokenMiddleware: ApolloLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: credentials?.idToken ? `Bearer ${credentials.idToken}` : '',
      }
    };
  });

  // Middleware to attach the uid variable
  const uidMiddleware: ApolloLink = new ApolloLink((operation, forward) => {    
    operation.variables = {
      ...operation.variables,
      userId: credentials.uid || null,
    };

    return forward(operation);
  });

  // Combine all middlewares along with httpLink
  const link: ApolloLink = ApolloLink.from([
    credentialsMiddleware,
    idTokenMiddleware,
    uidMiddleware, 
    httpLink.create({ uri: environment.baseUrl }), 
  ]);

  return {
    link,
    cache: new InMemoryCache(),
  };
}

export const graphQLProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];