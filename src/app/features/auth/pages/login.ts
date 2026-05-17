import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        (ngSubmit)="onSubmit()"
        class="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
      >
        <h2 class="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>

        <input
          [(ngModel)]="username"
          name="username"
          type="username"
          placeholder="Username"
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
          Login
        </button>

        <p class="mt-4 text-center text-sm text-gray-600">
          No account?
          <a routerLink="/auth/register" class="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';

  onSubmit(): void {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/tasks/board']),
      error: (err) => console.error('Login failed', err),
    });
  }
}
