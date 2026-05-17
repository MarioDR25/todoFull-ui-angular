import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterRequest } from '../models';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        (ngSubmit)="onSubmit()"
        class="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
      >
        <h2 class="mb-6 text-center text-2xl font-bold text-gray-800">
          Register
        </h2>
        <input
          [(ngModel)]="name"
          name="name"
          type="text"
          placeholder="Name"
          required
          class="mb-4 w-full rounded border px-3 py-2"
        />

        <input
          [(ngModel)]="username"
          name="username"
          type="text"
          placeholder="Username"
          required
          class="mb-4 w-full rounded border px-3 py-2"
        />

        <input
          [(ngModel)]="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          class="mb-4 w-full rounded border px-3 py-2"
        />

        <input
          [(ngModel)]="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          class="mb-6 w-full rounded border px-3 py-2"
        />

        <button
          type="submit"
          class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Register
        </button>

        <p class="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <a routerLink="/auth/login" class="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  `,
  styles: [],
})


export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  name = '';
  username = '';
  email = '';
  password = '';

  onSubmit(): void {
    const data : RegisterRequest = { name: this.name, username: this.username, email: this.email, password: this.password };
    this.auth.register(data).subscribe({
      next: () => this.router.navigate(['/tasks/board']),
      error: (err) => console.error('Register failed', err),
    });
  }
}
