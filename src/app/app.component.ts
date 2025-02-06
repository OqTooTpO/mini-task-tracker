import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTasks } from './state/task.actions';
import { TaskState } from './state/task.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'

})
export class AppComponent {
  constructor(private store: Store<TaskState>) {
    this.store.dispatch(loadTasks());
  }
}