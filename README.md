# Restaurant Management System – Backend API

This project is a RESTful backend API for a Restaurant Management System built using Node.js and Express.js.
The API manages restaurant operations such as menu items, bookings, contact messages, and user authentication.

The system uses MongoDB for data storage and follows a modular architecture separating routes, controllers, services, and models.
It also includes JWT authentication, role-based authorization, image upload functionality, and interactive API documentation using Swagger.
🔗 **Swagger Link:** [restaurant-project-node-js.vercel.app/api-docs/](https://restaurant-project-node-js.vercel.app/api-docs/)

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


```text
restaurant_project/
├── src/
│   ├── middleware/
│   │   └── globalErrorHandler.js
│   ├── modules/
│   │   ├── auth/
│   │   ├── booking/
│   │   │   ├── controllers/
│   │   │   │   └── booking.controller.js
│   │   │   ├── routes/
│   │   │   │   └── booking.route.js
│   │   │   ├── services/
│   │   │   │   └── booking.service.js
│   │   │   └── index.js
│   │   ├── category/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   └── menu/
│   ├── utils/
│   │   ├── errorCodes.js
│   │   └── response.js
│   └── images/               # Folder storing uploaded menu images
├── .env
├── index.js                  # App entry point (Server configuration)
└── package.json

Each module follows a modular structure separating business logic from routing.
```
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

*Authentication (Register / Login)

*Categories (Menu classification)

*Menu / Products (Dishes management & Image uploads)

*Bookings (Reservations workflow & status updates)

*Dashboard (Admin analytics & business stats)

*Contact messages (Customer inquiries & feedback)

These endpoints are designed to be consumed by a frontend application -Angular- .

---

## Swagger Documentation Preview
<img width="1804" height="796" alt="129" src="https://github.com/user-attachments/assets/1252cef0-6df9-43be-8ad9-08eed5cebb08" />
<img width="1799" height="586" alt="وة9" src="https://github.com/user-attachments/assets/a9d3e13b-ba94-4f44-95b8-d36ee686aafa" />
<img width="1810" height="667" alt="Capture1236" src="https://github.com/user-attachments/assets/db7fcec1-c63f-4710-aeec-5b00436a0ce9" />





Basmala Abouelseoud
