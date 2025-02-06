import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { Task } from '../model/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatOptionModule,
    RouterModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    trigger('transitionMessages', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter, :leave', [
        animate('300ms ease-in-out')
      ]),
    ]),
  ],
})
export class TaskListComponent {
  tasks: Task[] = [];
  statusFilter = '';
  sortBy: 'deadline' | 'priority' | 'assignee' = 'deadline';

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(newTask: Task) {
    this.taskService.addTask(newTask);
  }

  filteredTasks() {
    return this.tasks
      .filter((task) => !this.statusFilter || task.status === this.statusFilter)
      .sort((a, b) => {
        if (this.sortBy === 'deadline') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        } else if (this.sortBy === 'priority') {
          return a.priority.localeCompare(b.priority);
        } else if (this.sortBy === 'assignee') {
          return a.assignee.localeCompare(b.assignee);
        }
        return 0;
      });
  }
}