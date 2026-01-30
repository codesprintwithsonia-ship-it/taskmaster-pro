/**
 * Root Application State
 * Defines the shape of the entire application state
 */

import { AuthState } from './auth/auth.state';
import { TasksState } from './tasks/tasks.state';
import { UiState } from './ui/ui.state';

/**
 * Root state interface
 * Each feature has its own slice of state
 */
export interface AppState {
  auth: AuthState;
  tasks: TasksState;
  ui: UiState;
}
