import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskRequest } from '../models';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="mx-auto max-w-2xl p-6">
      <a routerLink="/tasks/board" class="text-blue-600 hover:underline">
        &larr; Back
      </a>

      <h1 class="mb-6 mt-4 text-2xl font-bold text-gray-800">
        {{ isEditing ? 'Edit Task' : 'New Task' }}
      </h1>

      <form
        (ngSubmit)="onSubmit()"
        class="rounded-lg border bg-white p-6 shadow-sm"
      >
        <input
          [(ngModel)]="task().title"
          name="title"
          placeholder="Title"
          required
          class="mb-4 w-full rounded border px-3 py-2"
        />

        <textarea
          [(ngModel)]="task().description"
          name="description"
          placeholder="Description"
          rows="4"
          class="mb-4 w-full rounded border px-3 py-2"
        ></textarea>

        <!-- <label class="mb-6 flex items-center gap-2">
          <input
            [(ngModel)]="task.completed"
            name="completed"
            type="checkbox"
          />
          Completed
        </label> -->

        <button
          type="submit"
          class="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          {{ isEditing ? 'Update' : 'Create' }}
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class TaskFormComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  task =  signal<TaskRequest>({ title: '', description: '', completed: false });

  isEditing = false;

  ngOnInit(): void {
    const id : number = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditing = true;
      this.taskService.getById(id).subscribe({
        next: (data: TaskRequest) => this.task.set(data),
        error: (err) => console.error('Failed to load task', err),
      });
    }
  }

  onSubmit(): void {
    const id : number = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Enviando', this.task);
    
    const request = id
      ? this.taskService.update(id, this.task())
      : this.taskService.create({title : this.task().title, description: this.task().description });

    request.subscribe({
      next: () => this.router.navigate(['/tasks/board']),
      error: (err) => console.error('Failed to save task', err),
    });
  }
}
