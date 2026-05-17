# TodoFull

Full-stack task management application with JWT authentication and CRUD operations, built with Angular standalone components.

## Tech Stack

- **Angular 21** (standalone components, SFC)
- **Tailwind CSS 4**
- **RxJS**

## Features

- User authentication (login / register) with JWT
- Task CRUD (create, read, update, delete)
- Lazy-loaded feature modules
- Route guards for protected views

## Folder Structure

```
src/app/
├── core/                    # Singleton services, guards, interceptors
│   ├── guards/              # auth.guard.ts (functional CanActivateFn)
│   ├── interceptors/        # auth.interceptor.ts (JWT token injection)
│   └── services/            # storage.service.ts (localStorage wrapper)
├── features/
│   ├── auth/                # Authentication feature (lazy-loaded)
│   │   ├── pages/           # login.ts, register.ts
│   │   ├── auth.service.ts
│   │   └── auth.routes.ts
│   └── tasks/               # Tasks CRUD feature (lazy-loaded)
│       ├── pages/           # board.ts (dashboard), task-form.ts
│       ├── task.service.ts
│       └── tasks.routes.ts
├── layout/                  # App shell components
│   └── components/          # main-layout.ts, header.ts, footer.ts
├── shared/                  # Reusable UI components
│   └── components/          # button.ts, modal.ts
├── app.ts                   # Root component (SFC)
├── app.routes.ts            # Top-level routes (loadChildren)
└── app.config.ts            # Providers (router, HTTP, interceptors)
```

Each component is a **Single File Component (SFC)**: template and styles inlined in the `.ts` file. No external `.html` or `.css` files.

## Quick Start

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200/`.

## Build

```bash
ng build
```

Output goes to `dist/`.


