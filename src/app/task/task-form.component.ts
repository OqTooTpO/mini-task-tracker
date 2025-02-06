import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { Task } from '../model/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
    @Output() taskAdded = new EventEmitter<Task>();
  
    taskForm: FormGroup;
  
    constructor(private fb: FormBuilder, private taskService: TaskService) {
      this.taskForm = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        deadline: ['', Validators.required],
        priority: ['', Validators.required],
        status: ['', Validators.required],
        assignee: ['', Validators.required],
      });
    }
  
    onSubmit() {
      if (this.taskForm.valid) {
        const newTask: Task = { id: Date.now().toString(), ...this.taskForm.value };
        this.taskService.addTask(newTask);
        this.taskForm.reset();
      }
    }
  }