/**
 * Auth Actions
 * Define all authentication-related events
 */

import { createAction, props } from '@ngrx/store';
import { User, LoginRequest, RegisterRequest } from '@app/models';

// ==================== LOGIN ====================

/**
 * Dispatched when user submits login form
 */
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

/**
 * Dispatched when login API call succeeds
 */
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; token: string; refreshToken: string }>()
);

/**
 * Dispatched when login API call fails
 */
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// ==================== REGISTER ====================

/**
 * Dispatched when user submits registration form
 */
export const register = createAction(
  '[Auth] Register',
  props<{ request: RegisterRequest }>()
);

/**
 * Dispatched when registration API call succeeds
 */
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User; token: string; refreshToken: string }>()
);

/**
 * Dispatched when registration API call fails
 */
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// ==================== LOGOUT ====================

/**
 * Dispatched when user clicks logout
 */
export const logout = createAction('[Auth] Logout');

/**
 * Dispatched after logout is complete (cleanup done)
 */
export const logoutComplete = createAction('[Auth] Logout Complete');

// ==================== AUTO LOGIN ====================

/**
 * Dispatched on app init to check if user has valid token
 */
export const loadUserFromToken = createAction('[Auth] Load User From Token');

/**
 * Dispatched when token is valid and user is loaded
 */
export const loadUserFromTokenSuccess = createAction(
  '[Auth] Load User From Token Success',
  props<{ user: User; token: string; refreshToken: string }>()
);

/**
 * Dispatched when token is invalid or expired
 */
export const loadUserFromTokenFailure = createAction(
  '[Auth] Load User From Token Failure'
);

// ==================== ERROR HANDLING ====================

/**
 * Dispatched to clear any auth errors
 */
export const clearError = createAction('[Auth] Clear Error');

/**
 * Dispatched to update user profile
 */
export const updateUser = createAction(
  '[Auth] Update User',
  props<{ user: Partial<User> }>()
);

/**
 * Dispatched when user profile update succeeds
 */
export const updateUserSuccess = createAction(
  '[Auth] Update User Success',
  props<{ user: User }>()
);

/**
 * Dispatched when user profile update fails
 */
export const updateUserFailure = createAction(
  '[Auth] Update User Failure',
  props<{ error: string }>()
);
