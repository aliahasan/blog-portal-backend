# Blogging Platform Backend

## Overview

This project is a backend system for a blogging platform, supporting two distinct roles: Admin and User. It allows users to create, update, and delete blogs while providing admins with the ability to manage users and their blogs. The system ensures secure authentication, role-based access control, and a public API for viewing blogs with search, sorting, and filtering functionalities.

---

## Features

### User Roles

#### Admin:

- Can delete any blog.
- Can block users by setting their `isBlocked` property.
- Cannot update any blog.

#### User:

- Can register and log in.
- Can create, update, and delete their own blogs.
- Cannot perform admin-level actions.

---

### Authentication & Authorization

- **Authentication**: Secure login for all users to perform blog operations.
- **Authorization**: Role-based access control ensures only admins and authorized users perform specific actions.

---

### Blog API (Public)

- Exposes a public API to fetch all blogs with support for:
  - **Search**: By blog title or content.
  - **Sort**: By specific fields (e.g., `title`, `createdAt`).
  - **Filter**: By author ID.

---

## Technologies Used

- **Programming Language**: TypeScript
- **Framework**: Node.js with Express.js
- **Database**: MongoDB (with Mongoose for ODM)
- **Authentication**: JWT-based authentication
- **Validation**: Zod for schema validation

---

## Models

### User Model

```typescript
{
  name: string; // Full name of the user
  email: string; // Email for authentication and communication
  password: string; // Securely hashed password
  role: 'admin' | 'user'; // Access level of the user
  isBlocked: boolean; // Indicates if the user is blocked (default: false)
  createdAt: Date; // Timestamp of user creation
  updatedAt: Date; // Timestamp of the last update
}
```

### Blog Model

```typescript
{
  title: string; // Blog post title
  content: string; // Main body of the blog post
  author: ObjectId; // Reference to the User model
  isPublished: boolean; // Indicates publication status (default: true)
  createdAt: Date; // Timestamp of blog creation
  updatedAt: Date; // Timestamp of the last update
}
```

---

## API Endpoints

### Authentication

#### Register User

`POST /api/auth/register`

- Registers a new user.
- Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login User

`POST /api/auth/login`

- Authenticates a user and provides a JWT token.
- Request Body:

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Blog Management

#### Create Blog

`POST /api/blogs`

- Allows a logged-in user to create a blog.
- Requires Bearer token in the header.

#### Update Blog

`PATCH /api/blogs/:id`

- Allows a logged-in user to update their own blog.
- Requires Bearer token in the header.

#### Delete Blog

`DELETE /api/blogs/:id`

- Allows a logged-in user to delete their own blog.
- Requires Bearer token in the header.

#### Get All Blogs (Public)

`GET /api/blogs`

- Fetches all blogs with options for search, sort, and filter.

### Admin Actions

#### Block User

`PATCH /api/admin/users/:userId/block`

- Blocks a user by updating their `isBlocked` status.

#### Delete Blog

`DELETE /api/admin/blogs/:id`

- Deletes any blog by its ID.

---

## Error Handling

- Consistent error response format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional details" },
  "stack": "Error stack trace"
}
```

### Common Errors

- **ZOD_ERROR**: Validation errors from Zod schema.
- **NOT_FOUND_ERROR**: Resource not found.
- **VALIDATION_ERROR**: Missing or invalid input.
- **AUTH_ERROR**: Authentication failure.
- **AUTHORIZATION_ERROR**: Unauthorized access.
- **INTERNAL_SERVER_ERROR**: Unhandled server errors.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aliahasan/blog-portal-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file with the following variables:
     ```env
     PORT=5000
     DATABASE_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     JWT_SECRET_EXPIRES_IN=your_jwt_secret_expires
     ```
4. Start the server:
   ```bash
   npm run dev
   ```

---
