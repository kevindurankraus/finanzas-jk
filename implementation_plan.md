# Implementation Plan - MongoDB & User Authentication + UI Redesign

This plan outlines the steps to transition the application from local storage to a full MERN stack architecture with MongoDB, User Authentication, and a professional Tailwind CSS UI.

## User Stories
1. As a user, I want to create an account and log in so that my finance and inventory data is saved in a database and accessible from any device.
2. As a user, I want a modern, professional, minimalist dark interface that's easy to navigate.

## Architecture Changes
- **Backend**: Node.js + Express server.
- **Database**: MongoDB (using Mongoose).
- **Authentication**: JWT (JSON Web Tokens) + bcrypt for password hashing.
- **Frontend**: React + Tailwind CSS with Context API consuming backend APIs.
- **Design System**: Professional dark theme with Zinc color palette, minimalist aesthetics.

## Proposed Steps

### Phase 1: UI Redesign with Tailwind CSS
> **Goal**: Transform the existing vanilla CSS application to use Tailwind CSS with the professional design from `UI.txt`.

1. **Install Tailwind CSS**: Set up Tailwind CSS in the Vite project.
2. **Configure Theme**: Update Tailwind config with custom zinc-based dark theme.
3. **Login/Register Pages**: Create professional login and registration components matching the design.
4. **Sidebar Navigation**: Implement collapsible sidebar with responsive design.
5. **Update Components**: Redesign Dashboard, Inventory, Appointments, and Calculator components.
6. **Dark Mode Toggle**: Implement theme switching functionality.

### Phase 2: Backend Setup & Authentication ✅ COMPLETED
1. **Initialize Server** ✅: Created `server` directory, set up Express, and connected to MongoDB.
2. **User Model & Auth**  ✅: Implemented `User` schema and `auth` routes (register, login) with JWT generation.
3. **Middleware** ✅: Created `authMiddleware` to protect private routes and extract `userId`.

### Phase 3: Data Models & API Routes
4. **Transaction API** ✅: Created `Transaction` model and CRUD routes.
5. **Inventory API**: Create `Inventory` model and CRUD routes.
6. **Appointment API**: Create `Appointment` model and CRUD routes.
   - *Note*: All data will be associated with the `userId` to ensure privacy.

### Phase 4: Frontend Authentication Integration
7. **Auth Context**: Create `AuthContext.jsx` to manage user session (login, logout, token storage).
8. **Protected Routes**: Update `App.jsx` to show Login/Register when not authenticated.
9. **API Client**: Set up axios or fetch with authentication headers.

### Phase 5: Frontend Data Integration
10. **Refactor Contexts**: Update `TransactionContext`, `InventoryContext`, and `AppointmentContext` to fetch data from the API instead of `localStorage`.
11. **Error Handling**: Add comprehensive error handling for network requests.
12. **Loading States**: Implement loading indicators for async operations.

## Tech Stack Additions
**Backend:**
- `express`, `mongoose`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs` ✅ Installed

**Frontend:**
- `tailwindcss`, `postcss`, `autoprefixer` (for styling)
- `lucide-react` (for icons, matching UI.txt design)
- `axios` (optional, for API calls)

## Design System (from UI.txt)
- **Colors**: Zinc palette (bg-zinc-50, dark:bg-black)
- **Font**: Inter
- **Components**: Rounded corners (lg, xl), subtle shadows, hover states
- **Dark Mode**: Class-based (`dark:` prefix)
- **Icons**: Lucide icons
- **Typography**: Tight tracking, medium font weights
- **Accent Colors**: Indigo (primary), Emerald (income), Rose (expense)

## Verification Plan
- ✅ Backend server running on port 5000
- ✅ MongoDB connection established
- ✅ User registration and login endpoints working
- [ ] UI matches the professional dark theme from UI.txt
- [ ] User can register, login, and logout
- [ ] Data persists after refresh (JWT stored in localStorage)
- [ ] Data is isolated per user (create two accounts and verify)
- [ ] All features work with backend API (transactions, inventory, appointments)
