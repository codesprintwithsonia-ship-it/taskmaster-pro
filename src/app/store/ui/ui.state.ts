/**
 * UI State
 * Manages global UI state (theme, sidebar, notifications, etc.)
 */

export interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  isOnline: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  timestamp: Date;
}

export const initialUiState: UiState = {
  theme: 'light',
  sidebarOpen: true,
  notifications: [],
  isOnline: true
};
