import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { environment } from '@chat-booth/env/environment';

export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  const httpLink = inject(HttpLink);
  
  return {
    link: httpLink.create({ uri: environment.baseUrl }),
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