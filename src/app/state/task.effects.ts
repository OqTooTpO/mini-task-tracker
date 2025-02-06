import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TaskState } from './task.reducer';
import * as TaskActions from './task.actions';
import { map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { selectAllTasks } from './task.selectors';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private store: Store<TaskState>) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        return of(TaskActions.loadTasksSuccess({ tasks }));
      })
    )
  );

  saveTasks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.addTask, TaskActions.updateTask, TaskActions.deleteTask),
        tap(() => {
          this.store.select(selectAllTasks).subscribe(tasks => {
            localStorage.setItem('tasks', JSON.stringify(tasks));
          });
        })
      ),
    { dispatch: false }
  );
}