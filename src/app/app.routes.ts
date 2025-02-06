import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task/task-form.component';

export const appRoutes: Routes = [
  { path: '', component: TaskListComponent }, 
  { path: 'add-task', component: TaskFormComponent }, 
];
