/**
 * Auth Effects
 * Handles side effects for authentication actions (API calls, storage, navigation)
 */

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '@core/services';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  // ==================== LOGIN EFFECT ====================

  /**
   * Login Effect
   * Listens for login action, calls API, dispatches success/failure
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response) => {
            // Store tokens in localStorage for persistence
            localStorage.setItem('token', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));

            return AuthActions.loginSuccess({
              user: response.user,
              token: response.token,
              refreshToken: response.refreshToken
            });
          }),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error.message || 'Login failed'
              })
            )
          )
        )
      )
    )
  );

  /**
   * Login Success Effect
   * Navigate to dashboard after successful login
   */
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          console.log('Login successful, navigating to dashboard');
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false } // This effect doesn't dispatch a new action
  );

  // ==================== REGISTER EFFECT ====================

  /**
   * Register Effect
   * Listens for register action, calls API, dispatches success/failure
   */
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ request }) =>
        this.authService.register(request).pipe(
          map((response) => {
            // Store tokens in localStorage for persistence
            localStorage.setItem('token', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));

            return AuthActions.registerSuccess({
              user: response.user,
              token: response.token,
              refreshToken: response.refreshToken
            });
          }),
          catchError((error) =>
            of(
              AuthActions.registerFailure({
                error: error.message || 'Registration failed'
              })
            )
          )
        )
      )
    )
  );

  /**
   * Register Success Effect
   * Navigate to dashboard after successful registration
   */
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          console.log('Registration successful, navigating to dashboard');
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  // ==================== LOGOUT EFFECT ====================

  /**
   * Logout Effect
   * Calls API to invalidate token, then dispatches logout complete
   */
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => {
            // Clear tokens from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            return AuthActions.logoutComplete();
          }),
          catchError(() => {
            // Even if API call fails, clear local storage and logout
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            return of(AuthActions.logoutComplete());
          })
        )
      )
    )
  );

  /**
   * Logout Complete Effect
   * Navigate to login page after logout
   */
  logoutComplete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutComplete),
        tap(() => {
          console.log('Logout complete, navigating to login');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // ==================== AUTO LOGIN EFFECT ====================

  /**
   * Load User From Token Effect
   * Validates stored token and restores user session
   */
  loadUserFromToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserFromToken),
      switchMap(() => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const userJson = localStorage.getItem('user');

        // No token found
        if (!token || !refreshToken || !userJson) {
          return of(AuthActions.loadUserFromTokenFailure());
        }

        // Validate token with API
        return this.authService.validateToken(token).pipe(
          map((user) =>
            AuthActions.loadUserFromTokenSuccess({
              user,
              token,
              refreshToken
            })
          ),
          catchError(() => {
            // Token invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            return of(AuthActions.loadUserFromTokenFailure());
          })
        );
      })
    )
  );

  // ==================== UPDATE USER EFFECT ====================

  /**
   * Update User Effect
   * Updates user profile information
   */
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      switchMap(({ user }) => {
        const userId = user.id;
        if (!userId) {
          return of(
            AuthActions.updateUserFailure({
              error: 'User ID is required'
            })
          );
        }

        return this.authService.updateProfile(userId, user).pipe(
          map((updatedUser) => {
            // Update user in localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return AuthActions.updateUserSuccess({ user: updatedUser });
          }),
          catchError((error) =>
            of(
              AuthActions.updateUserFailure({
                error: error.message || 'Profile update failed'
              })
            )
          )
        );
      })
    )
  );

  /**
   * Update User Success Effect
   * Show success message (you can add toast notification later)
   */
  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserSuccess),
        tap(() => {
          console.log('Profile updated successfully');
          // TODO: Add toast notification
        })
      ),
    { dispatch: false }
  );
}
