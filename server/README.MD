# Server 

User Authentication Express App Server.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a user authentication Express app server that provides registration, login, logout, and user details functionality.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [License](#license)


## Features

- User registration with email, password, username, and user details
- User login with authentication
- Password hashing for security
- Session-based authentication with cookies
- JWT-based refresh and access tokens for improved security
- Automatic token refreshing
- Logout functionality


## Installation

1. Navigate to the project directory:

```sh
cd server
```

2. Install the dependencies:

```sh
npm install
```

3. Set up environment variables:

- Add the `.env` file in the root.
- Add the below values in the `.env` file with your own configuration.
  - PORT
  - ALLOWED_ORIGINS
  - ACCESS_TOKEN_SECRET
  - REFRESH_TOKEN_SECRET
  - CONNECTION_STRING

4. Start the server:

```sh
npm run dev
```

## Usage

1. Register a new user by providing an email and password.
2. Login with the registered email and password.
3. Access protected routes or perform actions that require authentication.
4. Get the user data with all the details.
5. The app automatically manages token refreshing in the background to ensure uninterrupted user sessions.
6. Logout to end the session and clear the authentication state.


## API Documentation

The app exposes the following API endpoints:

- `POST /api/auth/register`: Register a new user. Required fields: `email` (string), `password` (string), `confirm_password` (string), `username` (string), `first_name` (string), `last_name` (string).
- `POST /api/auth/login`: Log in with an existing user. Required fields: `email` (string), `password` (string).
- `POST /api/auth/logout`: Log out and end the session.
- `POST /api/auth/refresh`: Refresh the access token using a valid refresh token.
- `GET /api/auth/user`: Get the user data with the protected route.

Note: Make sure to include the appropriate headers (e.g., `Content-Type: application/json`) when making API requests.


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
