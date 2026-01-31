/**
 * Auth Service
 * Handles all authentication-related HTTP requests
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  User,
  UserRole,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ApiResponse
} from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/auth'; // Will be replaced with real API

  /**
   * Login user with email and password
   * @param credentials - Email and password
   * @returns Observable of login response with user and tokens
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    // TODO: Replace with real API call
    // return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/login`, credentials)
    //   .pipe(map(response => response.data!));

    // MOCK IMPLEMENTATION (for learning without backend)
    return this.mockLogin(credentials);
  }

  /**
   * Register new user
   * @param request - User registration details
   * @returns Observable of registration response with user and tokens
   */
  register(request: RegisterRequest): Observable<LoginResponse> {
    // TODO: Replace with real API call
    // return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/register`, request)
    //   .pipe(map(response => response.data!));

    // MOCK IMPLEMENTATION (for learning without backend)
    return this.mockRegister(request);
  }

  /**
   * Logout user (invalidate token on server)
   * @returns Observable of logout confirmation
   */
  logout(): Observable<void> {
    // TODO: Replace with real API call
    // return this.http.post<void>(`${this.API_URL}/logout`, {});

    // MOCK IMPLEMENTATION
    return of(undefined).pipe(delay(300));
  }

  /**
   * Validate token and get current user
   * @param token - JWT token to validate
   * @returns Observable of user data
   */
  validateToken(token: string): Observable<User> {
    // TODO: Replace with real API call
    // return this.http.get<ApiResponse<User>>(`${this.API_URL}/validate`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).pipe(map(response => response.data!));

    // MOCK IMPLEMENTATION
    return this.mockValidateToken(token);
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Refresh token
   * @returns Observable of new tokens
   */
  refreshToken(refreshToken: string): Observable<{ token: string; refreshToken: string }> {
    // TODO: Replace with real API call
    // return this.http.post<ApiResponse<{ token: string; refreshToken: string }>>(
    //   `${this.API_URL}/refresh`,
    //   { refreshToken }
    // ).pipe(map(response => response.data!));

    // MOCK IMPLEMENTATION
    return of({
      token: `new_token_${Date.now()}`,
      refreshToken: `new_refresh_token_${Date.now()}`
    }).pipe(delay(300));
  }

  /**
   * Update user profile
   * @param userId - User ID
   * @param updates - Partial user data to update
   * @returns Observable of updated user
   */
  updateProfile(userId: string, updates: Partial<User>): Observable<User> {
    // TODO: Replace with real API call
    // return this.http.patch<ApiResponse<User>>(`${this.API_URL}/users/${userId}`, updates)
    //   .pipe(map(response => response.data!));

    // MOCK IMPLEMENTATION
    return this.mockUpdateProfile(userId, updates);
  }

  // ==================== MOCK IMPLEMENTATIONS ====================
  // These simulate API responses for learning without a backend
  // Replace with real HTTP calls when you have a backend API

  private mockLogin(credentials: LoginRequest): Observable<LoginResponse> {
    // Simulate API delay
    return of(null).pipe(
      delay(800),
      map(() => {
        // Validate credentials (mock validation)
        if (credentials.email === 'admin@test.com' && credentials.password === 'admin123') {
          return this.createMockLoginResponse('admin@test.com', 'Admin', 'User', UserRole.ADMIN);
        } else if (credentials.email === 'user@test.com' && credentials.password === 'user123') {
          return this.createMockLoginResponse('user@test.com', 'Test', 'User', UserRole.USER);
        } else if (credentials.email && credentials.password) {
          // Accept any email/password for demo purposes
          return this.createMockLoginResponse(credentials.email, 'Demo', 'User', UserRole.USER);
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  private mockRegister(request: RegisterRequest): Observable<LoginResponse> {
    // Simulate API delay
    return of(null).pipe(
      delay(1000),
      map(() => {
        // Simple validation
        if (!request.email || !request.password || !request.firstName || !request.lastName) {
          throw new Error('All fields are required');
        }

        if (request.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        // Create user
        return this.createMockLoginResponse(
          request.email,
          request.firstName,
          request.lastName,
          UserRole.USER
        );
      })
    );
  }

  private mockValidateToken(token: string): Observable<User> {
    // Simulate API delay
    return of(null).pipe(
      delay(500),
      map(() => {
        // Simple token validation (check if it exists and looks valid)
        if (token && token.startsWith('mock_token_')) {
          return this.createMockUser('user@test.com', 'Test', 'User', UserRole.USER);
        } else {
          throw new Error('Invalid token');
        }
      })
    );
  }

  private mockUpdateProfile(userId: string, updates: Partial<User>): Observable<User> {
    // Simulate API delay
    return of(null).pipe(
      delay(600),
      map(() => {
        // Return updated user
        const user = this.createMockUser('user@test.com', 'Test', 'User', UserRole.USER);
        return { ...user, ...updates };
      })
    );
  }

  private createMockLoginResponse(
    email: string,
    firstName: string,
    lastName: string,
    role: UserRole
  ): LoginResponse {
    const user = this.createMockUser(email, firstName, lastName, role);
    return {
      user,
      token: `mock_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`
    };
  }

  private createMockUser(
    email: string,
    firstName: string,
    lastName: string,
    role: UserRole
  ): User {
    return {
      id: `user_${Date.now()}`,
      email,
      firstName,
      lastName,
      role,
      avatar: undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
