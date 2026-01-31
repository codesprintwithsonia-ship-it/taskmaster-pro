/**
 * Auth Reducer
 * Handles all auth state changes based on dispatched actions
 */

import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  // ==================== LOGIN ====================

  /**
   * Handle login request
   * Set loading state, clear any previous errors
   */
  on(AuthActions.login, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null
  })),

  /**
   * Handle successful login
   * Store user, tokens, set authenticated flag
   */
  on(AuthActions.loginSuccess, (state, { user, token, refreshToken }): AuthState => ({
    ...state,
    user,
    token,
    refreshToken,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),

  /**
   * Handle failed login
   * Store error message, clear loading
   */
  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false
  })),

  // ==================== REGISTER ====================

  /**
   * Handle registration request
   * Set loading state, clear any previous errors
   */
  on(AuthActions.register, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null
  })),

  /**
   * Handle successful registration
   * Store user, tokens, set authenticated flag
   */
  on(AuthActions.registerSuccess, (state, { user, token, refreshToken }): AuthState => ({
    ...state,
    user,
    token,
    refreshToken,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),

  /**
   * Handle failed registration
   * Store error message, clear loading
   */
  on(AuthActions.registerFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false
  })),

  // ==================== LOGOUT ====================

  /**
   * Handle logout
   * Clear all user data, reset to initial state
   */
  on(AuthActions.logout, (): AuthState => ({
    ...initialAuthState
  })),

  /**
   * Handle logout complete
   * Ensure state is fully reset
   */
  on(AuthActions.logoutComplete, (): AuthState => ({
    ...initialAuthState
  })),

  // ==================== AUTO LOGIN ====================

  /**
   * Handle load user from token request
   * Set loading state while checking token
   */
  on(AuthActions.loadUserFromToken, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null
  })),

  /**
   * Handle successful token validation
   * Restore user session from token
   */
  on(AuthActions.loadUserFromTokenSuccess, (state, { user, token, refreshToken }): AuthState => ({
    ...state,
    user,
    token,
    refreshToken,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),

  /**
   * Handle failed token validation
   * Token expired or invalid, reset to logged out state
   */
  on(AuthActions.loadUserFromTokenFailure, (state): AuthState => ({
    ...state,
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  })),

  // ==================== USER UPDATE ====================

  /**
   * Handle user update request
   * Set loading state
   */
  on(AuthActions.updateUser, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null
  })),

  /**
   * Handle successful user update
   * Merge updated user data with existing
   */
  on(AuthActions.updateUserSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
    isLoading: false,
    error: null
  })),

  /**
   * Handle failed user update
   * Store error, clear loading
   */
  on(AuthActions.updateUserFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error
  })),

  // ==================== ERROR HANDLING ====================

  /**
   * Clear error state
   * Used when dismissing error messages
   */
  on(AuthActions.clearError, (state): AuthState => ({
    ...state,
    error: null
  }))
);
