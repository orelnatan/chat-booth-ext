import { Injectable, inject, } from '@angular/core';
import { Router, UrlTree, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ApolloError } from 'apollo-server-errors';

import { ChromeLocalStorageService as StorageService, UserStateService } from '@chat-booth/core/services';
import { AuthCredentials } from '@chat-booth/auth/models';

import { User } from '../models';

const REDIRECT_TO_LOGIN: string = "/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  storageService: StorageService = inject(StorageService);
  userStateService: UserStateService = inject(UserStateService);
  router: Router = inject(Router);

  canActivateChild(routeSnapshot: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<UrlTree | boolean> {
    return this.storageService.get<AuthCredentials>(['idToken', 'uid']).pipe(
      switchMap((credentials: AuthCredentials): Observable<UrlTree | boolean> => {
        if(!credentials.idToken) return of(this.router.createUrlTree([ REDIRECT_TO_LOGIN ]));

        return this.userStateService.fetchCurrentActiveUser().pipe(
          map((user: User): boolean => {
            this.userStateService.user = user;
          
            return true;
          }),
          catchError((error: ApolloError): Observable<UrlTree> => {
            console.error(error);
            
            return of(this.router.createUrlTree([ REDIRECT_TO_LOGIN ]));
          })
        )
      })
    )
  }
}