import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  addTask(task: Task): Observable<void> {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
    return of(undefined);
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasksSubject.value);
  }

  updateTask(updatedTask: Task): Observable<void> {
    const tasks = this.tasksSubject.value;
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index > -1) {
      tasks[index] = updatedTask;
      this.tasksSubject.next([...tasks]);
    }
    return of(undefined); 
  }

  deleteTask(taskId: string): Observable<void> {
    const tasks = this.tasksSubject.value.filter((task) => task.id !== taskId);
    this.tasksSubject.next(tasks);
    return of(undefined);
  }
}