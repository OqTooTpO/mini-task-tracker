import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';
import { Task } from '../model/task.model';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectTaskById = (taskId: string) =>
  createSelector(
    selectTaskState,
    (state: TaskState) => state.tasks.find(task => task.id === taskId)
  );

export const selectTasksByStatus = (status: string) =>
  createSelector(
    selectTaskState,
    (state: TaskState) => state.tasks.filter(task => task.status === status)
  );

export const selectTasksByPriority = (priority: string) =>
  createSelector(
    selectTaskState,
    (state: TaskState) => state.tasks.filter(task => task.priority === priority)
  );

export const selectTaskAssignees = createSelector(
  selectAllTasks,
  (tasks: Task[]) => tasks.map(task => task.assignee).filter((v, i, a) => a.indexOf(v) === i)
);