# 🎯 Zen Task Client

> Modern task management web application built with Next.js 15, React 19, and TanStack Query

## 🎯 Overview

A modern, type-safe web interface for Zen Task API. Built with Next.js App Router, featuring automatic token refresh, optimistic updates, and a clean Feature-Sliced Design architecture.

**Current Status:** Foundation Complete — Shared layer implemented, ready for entities/features development

## ✨ Features

### Implemented

- 🏛️ **Feature-Sliced Design (FSD) Architecture**
  - Clear separation of concerns across layers
  - Scalable and maintainable codebase structure
  - Unidirectional dependencies (bottom-up imports)
  - Isolated features and entities
  - Comprehensive documentation and guides

- 🔐 **Authentication Infrastructure**
  - Axios client with auto-refresh interceptors
  - JWT token management (access + httpOnly refresh)
  - Cookie-based secure token storage
  - Request queue during token refresh
  - Automatic redirect on auth errors

- ⚡ **State Management**
  - TanStack Query v5 for server state
  - Nuqs for URL state synchronization
  - Optimized caching and retry logic
  - React Query DevTools in development

- 🎨 **UI Foundation**
  - Shadcn/ui component library
  - Tailwind CSS v4 with custom configuration
  - Responsive design system
  - Dark mode ready (future)

- 🏗️ **Development Experience**
  - TypeScript strict mode
  - ESLint + Prettier with import sorting
  - Hot reload with Turbopack
  - Comprehensive documentation

### Planned

- 📋 **Task Management** - CRUD operations, filters, assignments
- 📊 **Project Management** - Multi-user projects, roles, permissions
- 🏷️ **Categories & Markers** - Organize tasks with custom tags
- 📈 **Statistics Dashboard** - Real-time analytics and insights
- 👥 **Team Collaboration** - Share projects, assign tasks

## 🛠️ Tech Stack

| Layer           | Technology            | Purpose                         |
| --------------- | --------------------- | ------------------------------- |
| **Framework**   | Next.js 15.5.4        | React framework with App Router |
| **UI Library**  | React 19.1.0          | Component-based UI              |
| **Language**    | TypeScript 5.x        | Type-safe development           |
| **State**       | TanStack Query 5.90.2 | Server state management         |
| **HTTP Client** | Axios 1.12.2          | API requests with interceptors  |
| **Styling**     | Tailwind CSS 4        | Utility-first CSS               |
| **UI Comps**    | Shadcn/ui + Radix UI  | Accessible component primitives |
| **URL State**   | Nuqs 2.7.1            | URL state synchronization       |
| **Runtime**     | Bun 1.x               | Fast JavaScript runtime         |

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Next.js App Router              │
│  ┌────────────────────────────────┐    │
│  │    Route Groups                 │    │
│  │  (root) (auth) (workspace)     │    │
│  └───────────┬────────────────────┘    │
│              │                          │
│  ┌───────────▼────────────────────┐    │
│  │      Screens Layer [PLANNED]    │    │
│  │  (Page compositions)            │    │
│  └───────────┬────────────────────┘    │
│              │                          │
│  ┌───────────▼────────────────────┐    │
│  │     Widgets Layer [PLANNED]     │    │
│  │  (Complex UI blocks)            │    │
│  └───────────┬────────────────────┘    │
│              │                          │
│  ┌───────────▼────────────────────┐    │
│  │    Features Layer [PLANNED]     │    │
│  │  (Business logic & hooks)       │    │
│  └───────────┬────────────────────┘    │
│              │                          │
│  ┌───────────▼────────────────────┐    │
│  │    Entities Layer [PLANNED]     │    │
│  │  (Business entities & API)      │    │
│  └───────────┬────────────────────┘    │
│              │                          │
│  ┌───────────▼────────────────────┐    │
│  │     Shared Layer ✅             │    │
│  │  (API, UI, Utils, Hooks)       │    │
│  └───────────┬────────────────────┘    │
└──────────────┼──────────────────────────┘
               │
               ▼
      ┌────────────────┐
      │  Axios Client  │
      │  + Interceptors│
      └────────┬───────┘
               │
               ▼
      ┌────────────────┐
      │   Backend API  │
      │  (zt-server)   │
      └────────────────┘
```

**Architecture Pattern:** Feature-Sliced Design (FSD)

## 📦 Project Structure

```
zt-client/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (root)/            # Public routes
│   │   ├── (auth)/            # Auth routes (login, register)
│   │   ├── (workspace)/       # Private routes (dashboard, tasks)
│   │   ├── providers/         # React providers
│   │   └── layout.tsx         # Root layout
│   │
│   ├── screens/               # Page compositions [PLANNED]
│   ├── widgets/               # Complex UI blocks [PLANNED]
│   ├── features/              # Business features [PLANNED]
│   ├── entities/              # Business entities [PLANNED]
│   │
│   └── shared/                # Shared resources ✅
│       ├── api/               # API infrastructure
│       │   ├── axios.ts       # Axios instance
│       │   ├── auth-interceptors.ts
│       │   ├── query-client.ts
│       │   └── api-routes.ts
│       ├── components/        # UI components
│       │   └── ui/           # Shadcn/ui components
│       ├── constants/        # App constants
│       ├── hooks/            # Shared React hooks
│       ├── lib/              # Library utilities
│       ├── types/            # TypeScript types
│       └── utils/            # Utility functions
│
├── public/                    # Static assets
├── docs/                      # Documentation (gitignored)
├── AGENTS.md                  # AI context (gitignored)
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- **Bun** 1.x or higher ([install](https://bun.sh))
- **Node.js** 18.x or higher (if not using Bun)
- **zt-server** running on `http://localhost:4000`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd zt-client

# Install dependencies
bun install

# Create environment file
cp .env.example .env.local

# Configure environment
# Edit .env.local and set NEXT_PUBLIC_API_URL
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000  # Backend API URL
```

### Development

```bash
# Start development server with Turbopack
bun dev

# Open http://localhost:3000
```

### Build

```bash
# Production build
bun build

# Start production server
bun start
```

### Code Quality

```bash
# Run ESLint
bun lint

# Format code with Prettier
bun format

# Check formatting without changes
bun format:check
```

## 📚 Code Standards & Architecture

This project follows **Feature-Sliced Design (FSD)** methodology with strict code standards:

- **TypeScript strict mode** - full type safety, no `any`
- **Arrow functions** - consistent code style
- **Named exports** - better tree-shaking
- **Kebab-case files** - unified naming convention
- **Layer isolation** - clear dependency rules (shared → entities → features → screens)
- **Comments in English** - all JSDoc and inline comments
- **Import sorting** - automatic with Prettier

For detailed patterns and examples, review existing code in `src/shared/` and follow the established structure.

## 🔧 Available Scripts

| Command            | Description                             |
| ------------------ | --------------------------------------- |
| `bun dev`          | Start development server with Turbopack |
| `bun build`        | Build for production                    |
| `bun start`        | Start production server                 |
| `bun lint`         | Run ESLint                              |
| `bun format`       | Format all files with Prettier          |
| `bun format:check` | Check formatting without changes        |

## 🎨 Code Style

### Naming Conventions

- **Files**: kebab-case (`auth-cookies.ts`, `use-login.ts`)
- **Components**: PascalCase (`TaskCard`, `LoginForm`)
- **Functions**: camelCase (`createTask`, `getUserById`)
- **Constants (primitive)**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **Constants (object)**: camelCase with `as const` (`apiRoutes`)

### Import Order

```typescript
// 1. React and external libraries
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
// 4. Features
import { useCreateTask } from '@/features/task'
// 3. Entities
import { taskApi } from '@/entities/task'
// 2. Shared modules
import { Button } from '@/shared/components/ui/button'
import { logError } from '@/shared/utils'
// 5. Local imports
import { TaskCard } from './task-card'
```

### Component Example

```typescript
/**
 * Task card component with main information
 */
interface Props {
  /** Task object to display */
  task: Task
  /** Edit callback */
  onEdit?: () => void
}

export const TaskCard = ({ task, onEdit }: Props) => {
  return (
    <div className="task-card">
      {/* Content */}
    </div>
  )
}
```

## 🔐 Authentication Flow

1. **Login** → User enters credentials
2. **Backend Response** → Access token (JSON) + Refresh token (httpOnly cookie)
3. **Client Storage** → Access token in client cookie, Refresh in httpOnly cookie
4. **API Request** → Interceptor adds `Authorization: Bearer {access_token}`
5. **401 Error** → Interceptor calls `/auth/refresh` automatically
6. **Token Refresh** → New access token returned, original request retried
7. **Critical Error** → Clear cookies, redirect to `/login`

## 📊 Current Status

### ✅ Completed

- [x] Project setup with Next.js 15 + React 19
- [x] Tailwind CSS 4 configuration
- [x] Shadcn/ui integration
- [x] Axios client with base configuration
- [x] Auth interceptors with auto-refresh
- [x] TanStack Query setup
- [x] Cookie management utilities
- [x] ESLint + Prettier configuration
- [x] Route groups structure
- [x] Comprehensive documentation

### 🔄 In Progress

- [ ] Auth entity (API, types, query keys)
- [ ] Task entity
- [ ] Project entity

### 📋 Planned

- [ ] Auth features (useLogin, useRegister, useLogout)
- [ ] Task CRUD features
- [ ] Project management features
- [ ] Dashboard screen
- [ ] Task list screen with filters
- [ ] Project list screen
- [ ] Statistics widgets
- [ ] Middleware for route protection

## 🤝 Contributing

### Before Starting

1. Review project structure and architecture patterns
2. Follow Feature-Sliced Design architecture
3. Write comments in English
4. Use TypeScript strict mode
5. No `any` types allowed

### Pull Request Checklist

- [ ] Code follows project standards
- [ ] Imports are sorted correctly (Prettier handles this)
- [ ] No ESLint errors
- [ ] TypeScript types are correct
- [ ] Comments in English, docs in Russian
- [ ] Named exports used (except Next.js pages)
- [ ] Arrow functions everywhere
- [ ] Prettier formatted

## 🔗 Related Projects

- **[zt-server](../zt-server)** - Backend REST API (NestJS + PostgreSQL)

## 📄 License

This project is part of Zen Task suite.

---

**Built with ❤️ using Next.js 15, React 19, and modern web technologies**
