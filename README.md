# Planify

A modern project management application built with React and Firebase, designed to help teams organize and track their projects efficiently.

![Planify Screenshot](public/planify-screenshot.png)

## Features

- 🔐 User Authentication
- 📋 Project Management
- 📅 Task Tracking
- 👥 Team Collaboration
- 📊 Project Analytics
- 🔔 Real-time Updates

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Routing**: React Router v6
- **Styling**: CSS Modules
- **Development Tools**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/planify.git
cd planify
```

2. Install dependencies

```bash
npm install
```

3. Set up Firebase

- Create a new Firebase project
- Enable Authentication, Firestore, and Storage
- Add your Firebase configuration to the project

4. Start the development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
planify/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── context/     # React context
│   ├── hooks/       # Custom hooks
│   └── utils/       # Utility functions
├── firebase.json    # Firebase configuration
└── vite.config.js   # Vite configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Vite](https://vitejs.dev/)
