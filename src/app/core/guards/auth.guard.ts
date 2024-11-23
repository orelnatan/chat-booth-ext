import { Injectable, } from '@angular/core';
import { Router, UrlTree, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ApolloError } from 'apollo-server-errors';

import { ChromeLocalStorageService, UserStateService } from '@chat-booth/core/services';
import { AuthCredentials } from '@chat-booth/auth/models';

import { User } from '../models';

const REDIRECT_TO_LOGIN: string = "/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private readonly router: Router,
    private readonly userStateService: UserStateService,
    private readonly chromeLocalStorageService: ChromeLocalStorageService,
  ) {}

  canActivateChild(routeSnapshot: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<UrlTree | boolean> {
    return this.chromeLocalStorageService.get<AuthCredentials>(['idToken', 'uid']).pipe(
      switchMap((credentials: AuthCredentials): Observable<UrlTree | boolean> => {
        if(!credentials.idToken) return of(this.router.createUrlTree([ REDIRECT_TO_LOGIN ]));

        return this.userStateService.fetchUserByCredentials(credentials).pipe(
          map((user: User): boolean => {
            this.userStateService.user = user;

            return true;
          }),
          catchError((error: ApolloError): Observable<UrlTree> => {
            return of(this.router.createUrlTree([ REDIRECT_TO_LOGIN ]));
          })
        )
      }),
    )
  }
}