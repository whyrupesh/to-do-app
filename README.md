# To-Do App

This is a simple To-Do application built with React for the frontend and JSON Server for the backend.

## Installation and Setup

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   - The frontend will run on port **5173**.

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the JSON Server:
   ```sh
   npx json-server db.json
   ```
   - The backend will run on port **3000**.

## Features
- Add, edit, delete, and mark tasks as complete.
- Pagination support (5 todos per page).
- Persistent storage using JSON Server.

## Tech Stack
- **Frontend:** React, Tailwind CSS, FontAwesome Icons
- **Backend:** JSON Server

## Notes
- Ensure that both the frontend and backend are running simultaneously for the app to function correctly.
- Modify `db.json` to add or modify tasks manually if needed.

## License
This project is open-source and free to use.

