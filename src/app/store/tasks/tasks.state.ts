/**
 * Tasks State
 * Manages tasks using EntityAdapter for efficient CRUD operations
 */

import { EntityState } from '@ngrx/entity';
import { Task, TaskFilters } from '@app/models';

export interface TasksState extends EntityState<Task> {
  selectedTaskId: string | null;
  filters: TaskFilters;
  isLoading: boolean;
  error: string | null;
}

export const initialTasksState: TasksState = {
  ids: [],
  entities: {},
  selectedTaskId: null,
  filters: {},
  isLoading: false,
  error: null
};
