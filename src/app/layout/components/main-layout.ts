import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main class="min-h-[calc(100vh-128px)]">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [],
})
export class MainLayoutComponent {}
