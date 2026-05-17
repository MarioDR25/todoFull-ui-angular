import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TaskService } from '../task.service';
import { TaskResponse } from '../models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [RouterLink, DatePipe],
  template: `
    <div class="mx-auto max-w-4xl p-6">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">My Tasks</h1>
        <a
          routerLink="/tasks/form"
          class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + New Task
        </a>
      </div>

      @if (tasks().length === 0) {
        <p class="text-center text-gray-500">No tasks yet. Create one!</p>
      } @else {
        <ul class="space-y-3">
          @for (task of tasks(); track task.id) {
            <li
              class="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
            >
              <div>
                <h3
                  class="text-lg font-semibold"
                  [class.line-through]="task.isCompleted"
                >
                  {{ task.title }}
                </h3>
                <p>
                  {{task.description}}
                </p>
                <p class="text-sm text-gray-500">
                  {{ task.createdAt | date: 'medium' }}
                </p>
              </div>
              <div class="flex gap-2">
                <a
                  [routerLink]="['/tasks/form', task.id]"
                  class="text-blue-600 hover:underline"
                >
                  Edit
                </a>
                <button
                  (click)="deleteTask(task.id!)"
                  class="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [],
})
export class BoardComponent implements OnInit {
  private readonly taskService = inject(TaskService);

  tasks = signal<TaskResponse[]> ([]);

  ngOnInit(): void {
    this.loadTasks();
    console.log('Cargo el componente board', this.tasks());
    
  }

  loadTasks(): void {
    this.taskService.getAll()
    .pipe(
      tap(data => console.log(data)
      )
    ).subscribe({
      next: (data) => (this.tasks.set(data) ),
      error: (err) => console.error('Failed to load tasks', err),
    });
  }

  deleteTask(id: number): void {
    this.taskService.delete(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Failed to delete task', err),
    });
  }
}
