# The Martian Trail

## Overview

The Martian Trail is an Oregon Trail-inspired space adventure game where players manage a spacecraft journey from Earth to Mars. Players must navigate 225 million kilometers over 180 days, making critical decisions about resource management, crew health, and responding to random events. The game features a retro-aesthetic UI with modern usability, drawing inspiration from classic adventure games while maintaining contemporary web standards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management

**UI Component System:**
- Shadcn UI component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Custom theme system supporting light/dark modes with CSS variables

**Design Philosophy:**
The application follows a "nostalgic modernization" approach, combining retro gaming aesthetics (inspired by Oregon Trail, FTL, Banner Saga) with modern UX principles. Typography uses monospace fonts (Courier Prime, IBM Plex Mono) for narrative text and retro gaming fonts (Press Start 2P, VT323) for headers. The layout system uses consistent Tailwind spacing primitives (2, 4, 6, 8 units) with a max-width container approach for focused gameplay.

**State Management:**
- Local component state using React hooks (useState, useEffect)
- Game state managed entirely client-side with no persistence layer currently implemented
- Complex game logic including resource tracking, event systems, crew management, and day/distance progression

**Component Architecture:**
The application is organized into distinct UI layers:
- Page components (`MarsTrail.tsx`) orchestrate game state and flow
- Feature components (MainMenu, MissionSetup, GamePlay, GameOver, Victory) handle different game screens
- UI components (CrewPanel, EventPanel, ShipStatus, SpaceScene) are composable and reusable
- Base UI components from Shadcn provide consistent primitives

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- Vite middleware integration for development with HMR support
- Custom logging middleware for API request tracking
- Session-based architecture prepared (though not currently utilized)

**Current State:**
The backend is minimal with placeholder routes. The storage interface is defined but only implements in-memory storage with a User model. The game currently runs entirely client-side without server persistence.

**API Design:**
Routes are designed to be prefixed with `/api` for clear separation from frontend routes. The storage abstraction (IStorage interface) allows for easy swapping between memory and database implementations.

### Data Storage Solutions

**Database Configuration:**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless driver (`@neondatabase/serverless`)
- Schema defined in `shared/schema.ts` with Zod validation integration
- Migration system configured but minimal schema (only users table exists)

**Current Implementation:**
The application uses in-memory storage (`MemStorage` class) for development. The database infrastructure is prepared but not actively used by the game logic. User authentication schema exists but is not integrated into gameplay.

**Schema Design:**
- Users table with UUID primary keys and username/password fields
- Drizzle-Zod integration for runtime type validation
- Shared types between client and server via `@shared` alias

### External Dependencies

**Core Libraries:**
- React ecosystem: react, react-dom, wouter, @tanstack/react-query
- UI framework: Tailwind CSS with PostCSS, Autoprefixer
- Component libraries: Radix UI primitives (20+ components), Lucide React icons
- Form handling: React Hook Form with @hookform/resolvers, Zod validation
- Date utilities: date-fns
- Carousel: embla-carousel-react
- Styling utilities: clsx, tailwind-merge, class-variance-authority

**Development Tools:**
- Build: Vite with @vitejs/plugin-react
- TypeScript with strict mode enabled
- ESBuild for server bundling
- Replit-specific: vite plugins for runtime error overlay, cartographer, dev banner

**Database & Backend:**
- Drizzle ORM with drizzle-kit for migrations
- PostgreSQL via @neondatabase/serverless
- Express.js with session support (connect-pg-simple)
- Type safety: drizzle-zod for schema validation

**Fonts:**
Google Fonts integration planned for:
- Press Start 2P or VT323 (retro gaming headers)
- Courier Prime or IBM Plex Mono (narrative text)
- Inter (modern UI elements)

**Asset Management:**
Static assets resolved via `@assets` alias pointing to `attached_assets` directory. Currently contains a pasted code snippet suggesting initial game prototype code.