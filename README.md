# Restaurant Management System – Backend API

This project is a RESTful backend API for a Restaurant Management System built using Node.js and Express.js.
The API manages restaurant operations such as menu items, bookings, contact messages, and user authentication.

The system uses MongoDB for data storage and follows a modular architecture separating routes, controllers, services, and models.
It also includes JWT authentication, role-based authorization, image upload functionality, and interactive API documentation using Swagger.

---

## Features

* RESTful API for restaurant management
* User authentication using JWT (Register / Login)
* Role-based authorization (Admin / User)
* CRUD operations for menu products
* Image upload for menu items
* Booking management system
* Contact message handling
* Modular architecture (controllers, routes, services, models)
* Middleware for authentication and authorization
* API documentation using Swagger
* Environment variable configuration

---

## Technologies Used

* Node.js – JavaScript runtime environment
* Express.js – Backend framework
* MongoDB – NoSQL database
* Mongoose – ODM for MongoDB
* JWT – Authentication and authorization
* Multer – Image upload handling
* Swagger – API documentation
* dotenv – Environment variables management

---

## Project Structure

```
auth/
booking/
contact/
menu/

controllers/
middleware/
models/
routes/
services/

images/        → folder storing uploaded menu images

.env
index.js
package.json
```

Each module follows a modular structure separating business logic from routing.

---

## Installation

Clone the repository:

```
git clone https://github.com/Basmala-Abouelseoud/restaurant_project-Node.js-.git
```

Install dependencies:

```
npm install
```

Create a `.env` file and add:

```
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

Run the server:

```
npm start
```

The server will run on:

```
http://localhost:3000
```

---

## API Documentation (Swagger)

The API documentation is available through Swagger UI.

After running the server, open:

```
http://localhost:3000/api-docs
```

Swagger provides interactive testing for all endpoints including authentication, menu management, bookings, and contact messages.

---

## API Modules

The API includes endpoints for:

* Authentication (Register / Login)
* Menu / Products management
* Bookings
* Contact messages
* User management

These endpoints are designed to be consumed by a frontend application such as Angular.

---

## Swagger Documentation Preview

<img width="1865" height="675" alt="image" src="https://github.com/user-attachments/assets/02924ce3-4639-4b05-b247-7752324bd447" />
<img width="1883" height="586" alt="image" src="https://github.com/user-attachments/assets/bf9833d0-1a84-4654-acc5-18c359ae1d84" />


Example:

* Authentication endpoints
* Menu endpoints
* Booking endpoints
* Contact endpoints



Basmala Abouelseoud
