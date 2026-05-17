import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  template: `
    <header class="flex items-center justify-between bg-gray-800 px-6 py-4 text-white">
      <a routerLink="/tasks/board" class="text-xl font-bold">
        TodoFull, {{username | titlecase}}
      </a>
      <nav class="flex items-center gap-4">
        <a routerLink="/tasks/board" class="hover:underline">Tasks</a>
        <button (click)="logout()" class="hover:underline">Logout</button>
      </nav>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  private readonly auth = inject(AuthService);
  readonly storage = inject(StorageService);
  username: string  = JSON.parse(this.storage.get('name') ?? 'Invitado' )

  logout(): void {
    this.auth.logout();
  }
}
