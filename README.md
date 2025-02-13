# Planzo Frontend

## Overview
Planzo Frontend is a React-based web application designed to interact seamlessly with the Planzo API, providing a user-friendly interface for managing projects, tasks, and users efficiently.

## Features
- **User Authentication**: Secure login and token-based authentication.
- **Project Management**: Create, view, and manage projects.
- **Task Management**: Assign tasks to projects and track progress.
- **Role-Based Access**: Different UI experiences for different user roles.

## Technologies Used
- **React.js** (Frontend Framework)
- **React Router** (Client-side Routing)
- **Zustand Toolkit** (State Management)
- **Formik & Yup** (Form Validation)
- **Axios** (API Requests)
- **Bootstrap** (Styling)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahtishamhafeez/react_planzo.git
   cd planzo-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3000/api/v1
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure
```
planzo-frontend/
│-- src/
│   │-- components/     # Reusable UI components
│   │-- constants/      # Manage constants
│   │-- pages/          # Main application pages
│   │-- schemas/        # Custom Yup schemas for forms
│   │-- services/       # API integration using Axios
│   │-- store/          # Redux state management
│-- public/
│-- package.json
│-- .env
```

## Running Tests
Run unit tests with:
```bash
npm test
```

## Deployment
Build the production version of the application:
```bash
npm run build
```
Deploy to any static hosting service such as **Vercel**, **Netlify**, or **GitHub Pages**.

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your fork and submit a pull request.

## Contact
For any inquiries, contact [ahtsham232@gmail.com](mailto:ahtsham232@gmail.com).

