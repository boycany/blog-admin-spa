# Blog Admin SPA

A comprehensive blog management system built with Angular 20, providing complete article management features including create, edit, delete, view, and status management functionality.

## 📋 Project Features

- **Authentication System**: Login/logout functionality with route guard protection
- **Article Management**:
  - Article list display (with pagination, sorting, search)
  - Create articles
  - Edit articles
  - Delete articles (with confirmation dialog)
  - Article preview
  - Article status management (draft/published)

## 🛠 Development Frameworks & Tool Versions

### Core Framework

- **@angular/core**: 20.3.0
- **@angular/cli**: 20.3.2
- **typescript**: 5.9.2
- **node.js**: 22.19.0 (Controlled by `.nvmrc` file. Please ensure nvm is installed before running this project)

### UI Framework

- **@angular/material**: 20.2.5
- **@angular/cdk**: 20.2.5

### Main Dependencies

- **rxjs**: 7.8.0 (Reactive programming)
- **luxon**: 3.7.2 (Date and time handling)
- **uuid**: 13.0.0 (Unique identifier generation)
- **angular-in-memory-web-api**: 0.20.0 (Mock backend API)

### Development Tools

- **angular-eslint**: 20.3.0
- **eslint**: 9.35.0 (Code linting)
- **prettier**: 3.6.2 (Code formatting)
- **husky + lint-staged**: Git hooks
- **Karma + Jasmine**: Unit testing framework

## 🚀 Build / Run Commands

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` to view the application

### Build Project

```bash
npm run build
# or
ng build
```

Build artifacts will be stored in the `dist/` directory

### Testing Commands

```bash
# Run unit tests
npm test
# or
ng test

# Code linting
npm run lint

# Code formatting
npm run format

# Check code format
npm run check
```

### Watch Mode

```bash
npm run watch
# or
ng build --watch --configuration development
```

## 🔐 Test Login Credentials

The system provides the following test account for login:

- **Email**: `admin@example.com`
- **Password**: `1QAZ2wsx`
- **Role**: Administrator

> Note: This uses mock data with In-Memory Web API. Data will reset after page refresh.

## 📝 Additional Information

### Design Philosophy

1. **Modern Angular Architecture**
   - Adopts Angular 20+ latest features
   - Uses Standalone Components to reduce module dependencies
   - Implements Signals for state management
   - Adopts Zoneless Change Detection for performance improvement

2. **Modular Design**
   - Clear folder structure hierarchy
   - Reusable shared components
   - Separation of service layer and business logic

3. **User Experience**
   - Modern interface with Material Design style
   - Clear operation feedback and notifications
   - Smooth page transition effects when route changed

### Technical Highlights

1. **State Management**
   - Uses Angular Signals for reactive state management
   - Computed signals automatically calculate derived states
   - RxJS handles asynchronous operations

2. **Routing & Security**
   - Implements Route Guards for permission control
   - Lazy Loading improves application loading performance
   - Prevents unauthorized access

3. **Development Experience**
   - ESLint + Prettier ensures code quality
   - Husky + lint-staged automated code checking
   - TypeScript strict type checking

4. **Theme Color Customization**
   - Custom SCSS variables system (`_vars.scss`) that extracts Material Design theme colors
   - Converts Material theme colors into reusable CSS custom properties
   - Provides consistent color variables across the entire application
   - Enables easy theme switching and color management

### Architecture Features

1. **Core**
   - Centralized authentication service management
   - Unified error handling mechanism
   - Route guard implementation

2. **Shared**
   - Reusable UI components (Table, Dialog, SnackBar, Button)
   - Utility functions and helpers

3. **Feature**
   - Article management functionality independently encapsulated
   - Clear data flow and state management

### Development Challenges & Solutions

1. **Signal & RxJS Integration**
   - Uses `toObservable()` for conversion between Signal and Observable
   - Proper use of `computed()` to avoid unnecessary recalculations

2. **Material Design Customization**
   - Customizes themes through SCSS variables
   - Uses Angular Material's Theming API

3. **Type Safety**
   - Strict TypeScript configuration
   - Interface definitions ensure data structure consistency

## 📁 Project Structure

```
src/
├── app/
│   ├── article/          # Article management features
│   ├── auth/             # Authentication
│   ├── core/             # Core services and guards
│   │   ├── guards/       # Route guards
│   │   └── services/     # Core services
│   ├── shared/           # Shared components
│   │   ├── components/   # Reusable components
│   │   └── helpers/      # Utility functions
│   └── mock-data/        # Mock data
└── styles/               # Global styles
```

## 🌟 Additional Features

### Data Persistence

- Uses LocalStorage to store login state
- Maintains login state after page refresh

### Performance Optimization

- Lazy Loading routes reduce initial loading time
- Uses Zoneless Change Detection

### User Interaction Optimization

- Loading state indicators
- Form validation and error hints
- Confirmation dialogs prevent accidental deletion
- Clear success/failure operation notifications

### Development Quality Assurance

- Complete TypeScript type definitions
- ESLint rules for automatic code checking
- Prettier unified code formatting
- Git commit hooks automatic checking

---

This project demonstrates modern Angular application best practices, including complete development toolchain setup, type-safe code architecture, and excellent user experience design.
