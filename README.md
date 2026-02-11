# Kanux Frontend Mobile

Mobile application for the Kanux platform, built with React Native, Expo, and TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Code Conventions](#code-conventions)
- [Available Scripts](#available-scripts)
- [Technologies](#technologies)

## Prerequisites

Before starting, make sure you have installed:

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22.x
- **Git**
- **Expo CLI** (optional, but recommended)
- **iOS Simulator** (for macOS) or **Android Studio** (for Android development)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/AaronMatarrita/kanux-frontend-mobile.git
cd kanux-frontend-mobile
```

### 2. Navigate to the project directory

```bash
cd kanux-mobile
```

### 3. Install dependencies

```bash
npm install
# or
yarn install
```

## Configuration

### Environment Variables

Create a `.env` file in the root of the `kanux-mobile/` directory based on `.env.example`:

```env
# Default URL for all environments (if defined, takes precedence)
# EXPO_PUBLIC_API_URL=http://192.168.1.129:3000

# Physical Device (same network as the backend)
EXPO_PUBLIC_API_URL_DEVICE=192.168.1.129:3000

# Android Emulator (PC host)
EXPO_PUBLIC_API_URL_ANDROID_EMULATOR=10.0.2.2:3000

# iOS Simulator
EXPO_PUBLIC_API_URL_IOS_SIMULATOR=localhost:3000

# WebSocket URL for messages (same as API but with ws://)
EXPO_PUBLIC_MESSAGES_WS_URL=10.0.2.2:3000
```

> **Note**: Variables starting with `EXPO_PUBLIC_` will be available on the client side. Adjust the IP addresses and ports according to your local development environment.

### Platform-Specific Configuration

The application automatically selects the appropriate API URL based on the platform:
- **Physical Device**: Uses `EXPO_PUBLIC_API_URL_DEVICE`
- **Android Emulator**: Uses `EXPO_PUBLIC_API_URL_ANDROID_EMULATOR`
- **iOS Simulator**: Uses `EXPO_PUBLIC_API_URL_IOS_SIMULATOR`

## Running the Application

### Development Mode

Start the Expo development server:

```bash
npm start
# or
yarn start
```

This will open the Expo DevTools in your browser. From there, you can:
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator
- Scan the QR code with the Expo Go app on your physical device

### Platform-Specific Commands

```bash
# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## Project Structure

```
kanux-mobile/
├── assets/                      # Static assets (images, fonts, etc.)
├── src/                         # Source code
│   ├── app/                     # Application configuration
│   │   ├── navigation/          # Navigation configuration
│   │   └── store/               # Global state management (Zustand)
│   │
│   ├── components/              # Reusable UI components
│   │   ├── Billing/             # Billing-related components
│   │   ├── messages/            # Message components
│   │   ├── navigations/         # Navigation components
│   │   ├── ui/                  # Generic UI components
│   │   └── index.ts             # Component barrel exports
│   │
│   ├── context/                 # React Context providers
│   │
│   ├── lib/                     # Third-party library configurations
│   │
│   ├── screens/                 # Application screens
│   │   ├── auth/                # Authentication screens
│   │   ├── billing/             # Billing screens
│   │   ├── challenges/          # Challenges screens
│   │   ├── feed/                # Feed screens
│   │   ├── home/                # Home screens
│   │   ├── messages/            # Messaging screens
│   │   ├── onboarding/          # Onboarding screens
│   │   ├── profile/             # Profile screens
│   │   ├── skills/              # Skills screens
│   │   └── splash/              # Splash screen
│   │
│   ├── services/                # API services and HTTP clients
│   │   ├── http/                # HTTP client configuration
│   │   ├── analytics.service.ts
│   │   ├── auth.service.ts
│   │   ├── challenges.service.ts
│   │   ├── feed.service.ts
│   │   ├── messages.service.ts
│   │   ├── profiles.service.ts
│   │   ├── socket.service.ts
│   │   ├── subscriptions.service.ts
│   │   └── index.ts
│   │
│   ├── theme/                   # Theme configuration (colors, typography, spacing)
│   │
│   ├── types/                   # TypeScript type definitions
│   │   └── navigation/          # Navigation type definitions
│   │
│   └── utils/                   # Utility functions and helpers
│
├── .env                         # Environment variables (not committed)
├── .env.example                 # Environment variables template
├── App.tsx                      # Application entry point
├── app.json                     # Expo configuration
├── babel.config.js              # Babel configuration
├── index.ts                     # Root index file
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Architecture

### Module Organization

The project follows a feature-based architecture where screens are organized by functionality:

#### **`/screens`** - Feature Screens

- Organized by feature domain (auth, challenges, feed, profile, etc.)
- Each screen folder contains related screens and components
- Screens are connected to navigation and services

#### **`/components`** - Reusable Components

- Shared UI components across the application
- Organized by category (ui, messages, navigations, billing)
- "Dumb" components without business logic
- Exported through `index.ts` for easier imports

#### **`/services`** - Service Layer

- Communication with external APIs
- Centralized HTTP calls using Axios
- WebSocket connections for real-time features (messages)
- Error handling and data transformation
- One service per entity/domain

#### **`/app`** - Application Core

- Navigation configuration
- Global state management with Zustand
- Application-wide settings

#### **`/context`** - React Context

- React Context providers for shared state
- Cross-cutting concerns (auth, theme, etc.)

#### **`/theme`** - Design System

- Color palette
- Typography definitions
- Spacing and layout constants
- Consistent styling across the app

#### **`/types`** - Type Definitions

- TypeScript interfaces and types
- Navigation type safety
- API response types
- Domain models

#### **`/lib`** - Third-Party Integrations

- Library configurations
- Third-party service wrappers

#### **`/utils`** - Utilities

- Helper functions
- Validators
- Formatters
- Date, text helpers, etc.

### Data Flow

```
User → Screen → Service → API
         ↓
      Context/Store (global state)
         ↓
    Components (UI)
```

### Real-Time Communication

The application uses **Socket.IO** for real-time messaging features:
- WebSocket connection managed by `socket.service.ts`
- Real-time message delivery
- Connection state management
- Automatic reconnection handling

## Code Conventions

### Naming

- **Components**: PascalCase (`UserProfile.tsx`)
- **Screens**: PascalCase (`LoginScreen.tsx`)
- **Utility files**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Interfaces/Types**: PascalCase with `I` or `T` prefix (`IUser`, `TUserRole`)

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of: import { Button } from '../../../components/ui/Button'
import { Button } from '@components/ui/Button';

// Available aliases:
// @/*           → src/*
// @assets/*     → assets/*
// @screens/*    → src/screens/*
// @components/* → src/components/*
// @theme        → src/theme
// @navigation   → src/types/navigation
// @app/*        → src/app/*
// @services/*   → src/services/*
// @context/*    → src/context/*
// @types/*      → src/types/*
// @lib/*        → src/lib/*
```

### Imports

```typescript
// 1. External libraries
import React from 'react';
import { View, Text } from 'react-native';

// 2. Navigation
import { useNavigation } from '@react-navigation/native';

// 3. Services
import { authService } from '@services';

// 4. Context/Store
import { useAuthStore } from '@app/store';

// 5. Components
import { Button } from '@components/ui';

// 6. Types
import type { IUser } from '@types';

// 7. Theme
import { colors, spacing } from '@theme';
```

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm start`     | Start the Expo development server    |
| `npm run android` | Run on Android emulator/device     |
| `npm run ios`   | Run on iOS simulator/device          |
| `npm run web`   | Run on web browser                   |

## Technologies

### Core

- **[React Native 0.81](https://reactnative.dev/)** - Mobile framework
- **[React 19](https://react.dev/)** - UI library
- **[Expo ~54](https://expo.dev/)** - Development platform
- **[TypeScript 5](https://www.typescriptlang.org/)** - Static typing

### Navigation

- **[React Navigation 7](https://reactnavigation.org/)** - Navigation library
  - Native Stack Navigator
  - Bottom Tabs Navigator
  - Stack Navigator

### State Management

- **[Zustand 5](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[React Context](https://react.dev/reference/react/useContext)** - Built-in state sharing

### UI & Styling

- **[Lucide React Native](https://lucide.dev/)** - Icon library
- **[Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)** - Animations
- **[@expo/vector-icons](https://icons.expo.fyi/)** - Icon sets

### Networking

- **[Axios 1.13](https://axios-http.com/)** - HTTP client
- **[Socket.IO Client 4.8](https://socket.io/)** - Real-time communication

### Storage & Utilities

- **[@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)** - Local storage
- **[@react-native-clipboard/clipboard](https://github.com/react-native-clipboard/clipboard)** - Clipboard access
- **[expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)** - Image selection
- **[react-native-toast-message](https://github.com/calintamas/react-native-toast-message)** - Toast notifications
- **[react-native-markdown-display](https://github.com/iamacup/react-native-markdown-display)** - Markdown rendering
- **[@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/)** - Bottom sheet component

### Development

- **[Babel](https://babeljs.io/)** - JavaScript compiler
- **[babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)** - Path aliasing
