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
