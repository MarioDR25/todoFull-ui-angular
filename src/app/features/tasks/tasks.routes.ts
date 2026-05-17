import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layout/components/main-layout';

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'board',
        loadComponent: () =>
          import('./pages/board').then((m) => m.BoardComponent),
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./pages/task-form').then((m) => m.TaskFormComponent),
      },
      {
        path: 'form/:id',
        loadComponent: () =>
          import('./pages/task-form').then((m) => m.TaskFormComponent),
      },
      { path: '', redirectTo: 'board', pathMatch: 'full' },
    ],
  },
];
