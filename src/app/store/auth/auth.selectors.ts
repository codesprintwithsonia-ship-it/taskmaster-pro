/**
 * Auth Selectors
 * Query functions to read auth state efficiently
 */

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

// ==================== FEATURE SELECTOR ====================

/**
 * Select the entire auth state slice
 * This is the root selector for all auth-related selectors
 */
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// ==================== BASIC SELECTORS ====================

/**
 * Select the current user
 * Returns null if not logged in
 */
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

/**
 * Select the authentication token
 */
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

/**
 * Select the refresh token
 */
export const selectRefreshToken = createSelector(
  selectAuthState,
  (state) => state.refreshToken
);

/**
 * Select authentication status
 * Returns true if user is logged in
 */
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

/**
 * Select loading state
 * Returns true when auth operation is in progress
 */
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);

/**
 * Select error message
 * Returns null if no error
 */
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

// ==================== COMPUTED SELECTORS ====================

/**
 * Select user's full name
 * Returns empty string if user is null
 */
export const selectUserFullName = createSelector(
  selectUser,
  (user) => user ? `${user.firstName} ${user.lastName}` : ''
);

/**
 * Select user's initials
 * Returns first letter of first name + first letter of last name
 * Example: "Sonia Kumar" → "SK"
 */
export const selectUserInitials = createSelector(
  selectUser,
  (user) => {
    if (!user) return '';
    const firstInitial = user.firstName?.charAt(0) || '';
    const lastInitial = user.lastName?.charAt(0) || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }
);

/**
 * Select user's email
 * Returns empty string if user is null
 */
export const selectUserEmail = createSelector(
  selectUser,
  (user) => user?.email || ''
);

/**
 * Select user's role
 * Returns null if user is null
 */
export const selectUserRole = createSelector(
  selectUser,
  (user) => user?.role || null
);

/**
 * Check if user is admin
 * Returns true if user has ADMIN role
 */
export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN'
);

/**
 * Check if user is manager
 * Returns true if user has MANAGER role
 */
export const selectIsManager = createSelector(
  selectUserRole,
  (role) => role === 'MANAGER'
);

/**
 * Check if auth has error
 * Returns true if there's an error message
 */
export const selectHasAuthError = createSelector(
  selectAuthError,
  (error) => error !== null
);

/**
 * Select authentication status with loading
 * Useful for showing loading spinner on protected routes
 */
export const selectAuthStatus = createSelector(
  selectIsAuthenticated,
  selectAuthLoading,
  (isAuthenticated, isLoading) => ({
    isAuthenticated,
    isLoading,
    isReady: !isLoading // Ready when not loading
  })
);

/**
 * Select complete user info for profile display
 * Returns formatted object with all user details
 */
export const selectUserProfile = createSelector(
  selectUser,
  selectUserFullName,
  selectUserInitials,
  (user, fullName, initials) => {
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      fullName,
      initials,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
);
