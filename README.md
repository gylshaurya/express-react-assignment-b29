# MoviePuzzler

A web app where you guess movies from brutally honest descriptions of their plots.

## What it does

You get shown a one line description of a movie written as literally as possible. You type in your answer and see if you are right. There are three difficulty levels. After three wrong attempts a hint button shows up.

## Tech Stack

- React for the frontend
- Node and Express for the backend
- MongoDB for the database
- JWT for authentication

## Project Structure

```
MoviePuzzler/
  client/        React frontend
  server/        Express backend
```

## How to run it

You need Node.js and a MongoDB Atlas account before starting.

**Set up the server**

```
cd server
npm install
```

Create a .env file inside the server folder with these two values:

```
MONGO_URI=your mongodb connection string here
JWT_SECRET=any random string here
```

Seed the database with puzzles:

```
node puzzles.js
```

Start the server:

```
npm start
```

**Set up the client**

```
cd client
npm install
npm run dev
```

The app will be running at http://localhost:3000

## API Routes

**Auth**

- POST /api/auth/signup - create a new account
- POST /api/auth/login - log in to an existing account

**Puzzles**

- GET /api/puzzles/random - get a random puzzle
- GET /api/puzzles/random?difficulty=easy - get a puzzle filtered by difficulty (easy, medium, hard)

## Features

- Sign up and log in
- Get random movie puzzles
- Filter puzzles by difficulty
- Hint system that unlocks after 3 wrong attempts
