# Veyro API Documentation

Full-stack ride-booking platform built with React, Node.js, Express, MongoDB, and Socket.IO.

---

## User Endpoints

### Register User

Creates a new user account, hashes the password, saves user details in MongoDB, and generates an authentication JWT token.

- **URL:** `/users/register`
- **Method:** `POST`
- **Access / Auth Required:** Public (`No`)
- **Content-Type:** `application/json`

---

### Request Body

| Field                | Type     | Required                    | Description             | Validation Rules                                                |
| :------------------- | :------- | :-------------------------- | :---------------------- | :-------------------------------------------------------------- |
| `fullname.firstname` | `string` | **Yes**                     | User's first name       | Minimum 3 characters long                                       |
| `fullname.lastname`  | `string` | **No** (Optional) / **Yes** | User's last name        | Must be at least 3 characters if provided (Schema minlength: 3) |
| `email`              | `string` | **Yes**                     | User's email address    | Must be a valid email format and unique                         |
| `password`           | `string` | **Yes**                     | User's account password | Minimum 6 characters long                                       |

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

### Responses

#### 1. Success (`201 Created`)

Returned when the user is successfully validated, created, and an auth token is generated.

> **Note:** The `password` field is omitted from the user object response (`select: false`).

---

#### 2. Validation Error (`400 Bad Request`)

Returned when required fields are missing or do not satisfy validation constraints.

**Response Body:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "j",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

---

#### 3. Internal Server Error (`500 Internal Server Error`)

Returned if an unhandled error or database failure occurs during registration (e.g., duplicate email key violation or database connection failure).

---

### Login User

Authenticates an existing user with email and password, returning user data and an authentication JWT token.

- **URL:** `/users/login`
- **Method:** `POST`
- **Access / Auth Required:** Public (`No`)
- **Content-Type:** `application/json`

---

### Request Body

| Field      | Type     | Required | Description             | Validation Rules             |
| :--------- | :------- | :------- | :---------------------- | :--------------------------- |
| `email`    | `string` | **Yes**  | User's registered email | Must be a valid email format |
| `password` | `string` | **Yes**  | User's account password | Minimum 6 characters long    |

#### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

### Responses

#### 1. Success (`200 OK`)

Returned when email and password match an existing registered user.

**Response Body:**

> **Note:** The `password` field is omitted from the user object response.

---

#### 2. Validation Error (`400 Bad Request`)

Returned when the provided fields fail validation rules.

**Response Body:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

---

#### 3. Authentication Failed (`401 Unauthorized`)

Returned when email does not exist or password does not match.

**Response Body:**

```json
{
  "message": "Invalid credentials"
}
```

---

#### 4. Internal Server Error (`500 Internal Server Error`)

Returned if an unexpected server error occurs during the login process.

---

### Get User Profile

Retrieves the authenticated user's profile details. Requires a valid JWT token passed either via cookies or the `Authorization` bearer header.

- **URL:** `/users/profile`
- **Method:** `GET`
- **Access / Auth Required:** Authenticated (`Yes` - `authUser` middleware)
- **Headers:**
  - `Authorization`: `Bearer <token>` (Optional if cookie is present)
  - `Cookie`: `token=<token>` (Optional if header is present)

---

### Responses

#### 1. Success (`200 OK`)

Returned when a valid, non-blacklisted token is provided.

#### 2. Authentication Error (`401 Unauthorized`)

Returned when no token is provided, the token has expired/is invalid, the token has been blacklisted (logged out), or the user no longer exists.

**Response Body:**

```json
{
  "message": "Unauthorized"
}
```

---

### Logout User

Logs out the authenticated user by clearing the `token` cookie and adding the token to the database blacklist so it can no longer be used.

- **URL:** `/users/logout`
- **Method:** `GET`
- **Access / Auth Required:** Authenticated (`Yes` - `authUser` middleware)
- **Headers:**
  - `Authorization`: `Bearer <token>` (Optional if cookie is present)
  - `Cookie`: `token=<token>` (Optional if header is present)

---

### Responses

#### 1. Success (`200 OK`)

Returned when the user is logged out, the auth cookie is cleared, and the token is saved into the blacklist collection.

**Response Body:**

```json
{
  "message": "Logout successful"
}
```

---

#### 2. Authentication Error (`401 Unauthorized`)

Returned when no token is present or the provided token is already invalid/blacklisted.

**Response Body:**

```json
{
  "message": "Unauthorized"
}
```

---

## Captain Endpoints

### Register Captain

Creates a new captain (driver) account with personal and vehicle information, hashes the password, saves captain details in MongoDB, and generates an authentication JWT token.

- **URL:** `/captains/register`
- **Method:** `POST`
- **Access / Auth Required:** Public (`No`)
- **Content-Type:** `application/json`

---

### Request Body

| Field                 | Type     | Required                    | Description                               | Validation Rules                                       |
| :-------------------- | :------- | :-------------------------- | :---------------------------------------- | :----------------------------------------------------- |
| `fullname.firstname`  | `string` | **Yes**                     | Captain's first name                      | Minimum 3 characters long                              |
| `fullname.lastname`   | `string` | **No** (Optional) / **Yes** | Captain's last name                       | Minimum 3 characters if provided (Schema minlength: 3) |
| `email`               | `string` | **Yes**                     | Captain's email address                   | Must be a valid email format and unique                |
| `password`            | `string` | **Yes**                     | Captain's account password                | Minimum 6 characters long                              |
| `vehicle.color`       | `string` | **Yes**                     | Color of the vehicle                      | Minimum 3 characters long                              |
| `plate`               | `string` | **Yes**                     | Vehicle registration/license plate number | Minimum 3 characters long                              |
| `vehicle.capacity`    | `number` | **Yes**                     | Passenger seating capacity of the vehicle | Integer, minimum value 1                               |
| `vehicle.vehicleType` | `string` | **Yes**                     | Type of the vehicle                       | Must be one of: `Car`, `Bike`, `auto`                  |

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "captain@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "UP 12 XY 6204",
    "capacity": 4,
    "vehicleType": "Car"
  }
}
```

---

### Responses

#### 1. Success (`201 Created`)

Returned when the captain and vehicle details are successfully validated, saved, and an auth token is generated.

**Response Body:**

> **Note:** The `password` field is omitted from the captain object response (`select: false`).

---

#### 2. Validation Error (`400 Bad Request`)

Returned when required fields are missing, invalid, or do not satisfy validation constraints.

**Response Body:**

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "truck",
      "msg": "Vehicle type must be at least 1",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

---

#### 3. Duplicate Captain (`400 Bad Request`)

Returned when a captain with the provided email already exists.

**Response Body:**

```json
{
  "message": "Captain already exist"
}
```

---

#### 4. Internal Server Error (`500 Internal Server Error`)

Returned if an unexpected server error or database failure occurs during registration.
