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

---

### Login Captain

Authenticates an existing captain using email and password, returning the captain data, an authentication JWT token, and setting an HTTP `token` cookie.

- **URL:** `/captains/login`
- **Method:** `POST`
- **Access / Auth Required:** Public (`No`)
- **Content-Type:** `application/json`

---

### Request Body

| Field      | Type     | Required | Description                | Validation Rules             |
| :--------- | :------- | :------- | :------------------------- | :--------------------------- |
| `email`    | `string` | **Yes**  | Captain's registered email | Must be a valid email format |
| `password` | `string` | **Yes**  | Captain's account password | Minimum 6 characters long    |

#### Example Request Body

```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

---

### Responses

#### 1. Success (`200 OK`)

Returned when credentials are valid. Sets a `token` cookie.

**Response Body:**

```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "status": "Active",
    "vehicle": {
      "color": "Red",
      "plate": "UP 12 XY 6204",
      "capacity": 4,
      "vehicleType": "Car"
    },
    "_id": "670e4a79",
    "__v": 0
  },
  "token":
}
```

> **Note:** The `password` field is omitted from the captain object response.

---

#### 2. Validation Error (`400 Bad Request`)

Returned when email or password fail validation rules.

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

#### 3. Captain Not Found (`404 Not Found`)

Returned when no captain is registered with the provided email.

**Response Body:**

```json
{
  "message": "Captain not found"
}
```

---

#### 4. Invalid Credentials (`401 Unauthorized`)

Returned when the provided password does not match.

**Response Body:**

```json
{
  "message": "Invalid credentials"
}
```

---

#### 5. Internal Server Error (`500 Internal Server Error`)

Returned if an unexpected server error occurs during login.

---

### Get Captain Profile

Retrieves the authenticated captain's profile and vehicle information. Requires a valid JWT token via cookies or the `Authorization` header.

- **URL:** `/captains/profile`
- **Method:** `GET`
- **Access / Auth Required:** Authenticated (`Yes` - `authCaptain` middleware)
- **Headers:**
  - `Authorization`: `Bearer <token>` (Optional if cookie is present)
  - `Cookie`: `token=<token>` (Optional if header is present)

---

### Responses

#### 1. Success (`200 OK`)

Returned when a valid, non-blacklisted captain token is supplied.

**Response Body:**

```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "status": "Active",
    "vehicle": {
      "color": "Red",
      "plate": "UP 12 XY 6204",
      "capacity": 4,
      "vehicleType": "Car"
    },
    "_id": "670e4a7",
    "__v": 0
  }
}
```

---

#### 2. Authentication Error (`401 Unauthorized`)

Returned when the token is missing, expired, invalid, blacklisted, or if the captain account no longer exists.

**Response Body:**

```json
{
  "message": "Unauthorized"
}
```

---

### Logout Captain

Logs out the authenticated captain by clearing the `token` cookie and blacklisting the JWT token in MongoDB.

- **URL:** `/captains/logout`
- **Method:** `GET`
- **Access / Auth Required:** Authenticated (`Yes` - `authCaptain` middleware)
- **Headers:**
  - `Authorization`: `Bearer <token>` (Optional if cookie is present)
  - `Cookie`: `token=<token>` (Optional if header is present)

---

### Responses

#### 1. Success (`200 OK`)

Returned when logout is successful, the `token` cookie is cleared, and the token is added to the blacklist.

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

# Frontend Documentation

The frontend client is built with **React 19**, **Vite**, **Tailwind CSS v4** (`@tailwindcss/vite`), and **React Router v7** (`react-router-dom`).

---

## Tech Stack & Setup

- **Framework:** React 19 (`react`, `react-dom`)
- **Bundler & Dev Server:** Vite (`@vitejs/plugin-react`)
- **Styling:** Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`)
- **Animations:** GSAP & `@gsap/react`
- **Iconography:** Remix Icon (`remixicon`)
- **Routing:** React Router DOM v7 (`react-router-dom`)
- **Linting:** ESLint

---

## Routing Architecture

Routing is configured in `frontend/src/App.jsx` wrapped inside `<BrowserRouter>` in `frontend/src/main.jsx`.

| Route Path        | Component       | Description                                                                                                              |
| :---------------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `/`               | `Start`         | Landing splash screen with background cover, Veyro logo, and CTA linking to `/login`.                                    |
| `/login`          | `UserLogin`     | User login screen with axios POST to `/users/login`, token storage in `localStorage`, and redirect to `/home`.           |
| `/signup`         | `UserSignUp`    | User registration screen with axios POST to `/users/register`, token storage in `localStorage`, and redirect to `/home`. |
| `/captain-login`  | `CaptainLogin`  | Sign-in page for captains with axios POST to `/captains/login`, token storage in `localStorage`, and redirect to `/captain-home`. |
| `/captain-signup` | `CaptainSignUp` | Full registration page for new captains with personal & vehicle info, axios POST to `/captains/register`.                 |
| `/home`           | `Home`          | Protected user homepage wrapped with `<UserProtectWrapper>`.                                                             |
| `/user/logout`    | `UserLogout`    | User logout component calling `/users/logout`, clearing local token, and redirecting to `/login`.                         |
| `/captain-home`   | `CaptainHome`   | Protected captain dashboard wrapped with `<CaptainProtectWrapper>`.                                                      |
| `/captain/logout` | `CaptainLogout` | Captain logout component calling `/captains/logout`, clearing local token, and redirecting to `/captain-login`.           |

---

## Pages & Components Breakdown

### 1. Start Page (`Start.jsx`)

- **Path:** `/`
- **File:** `frontend/src/pages/Start.jsx`
- **Features:**
  - Full-screen background cover layout using Unsplash imagery (`bg-cover`, `bg-center`, `h-screen`).
  - Top branding logo using `Veyro_logo.png`.
  - Bottom call-to-action sheet with rounded top corners (`rounded-t-2xl`) featuring the `"Get started with Veyro"` headline and a full-width `"Continue"` button routing directly to `/login`.

---

### 2. User Login Page (`UserLogin.jsx`)

- **Path:** `/login`
- **File:** `frontend/src/pages/UserLogin.jsx`
- **Features:**
  - Responsive column layout with top branding and bottom captain switcher.
  - Controlled inputs for **Email** (`email`) and **Password** (`password`) via React `useState`.
  - **API Integration:** Sends `POST` request to `${VITE_BASE_URL}/users/login` with credentials.
  - **State & Storage Handling:** On successful response (`200` / `201`), updates `UserDataContext` (`setUser`), stores authentication token in `localStorage.setItem("token", data.token)`, and navigates to `/home`.
  - Navigation links:
    - `"Create new Account"` ➔ routes to `/signup`.
    - `"Sign in as Captain"` (Green CTA `#10b461`) ➔ routes to `/captain-login`.

---

### 3. User Sign Up Page (`UserSignUp.jsx`)

- **Path:** `/signup`
- **File:** `frontend/src/pages/UserSignUp.jsx`
- **Features:**
  - Controlled inputs for `firstName`, `lastName`, `email`, and `password`.
  - **API Integration:** Sends `POST` request to `${VITE_BASE_URL}/users/register` with payload `{ fullname: { firstname, lastname }, email, password }`.
  - **State & Storage Handling:** On `201` status, updates `user` in `UserDataContext`, saves `token` in `localStorage`, and redirects to `/home`.
  - Navigation links:
    - `"Already have an account? Login here"` ➔ routes to `/login`.
  - Legal disclaimer footer regarding Google Privacy Policy and Terms of Service.

---

### 4. Captain Login Page (`CaptainLogin.jsx`)

- **Path:** `/captain-login`
- **File:** `frontend/src/pages/CaptainLogin.jsx`
- **Features:**
  - Dedicated captain branding using `Veyro_captain_logo.png`.
  - Controlled inputs for captain **Email** and **Password**.
  - **API Integration:** Sends `POST` request to `${VITE_BASE_URL}/captains/login`.
  - **State & Storage Handling:** Updates `CaptainDataContext` (`setCaptain`), stores auth token in `localStorage.setItem("token", data.token)`, and navigates to `/captain-home`.
  - Navigation links:
    - `"Register as a Captain"` ➔ routes to `/captain-signup`.
    - `"Sign in as User"` (Orange CTA `#d5622d`) ➔ routes to `/login`.

---

### 5. Captain Sign Up Page (`CaptainSignUp.jsx`)

- **Path:** `/captain-signup`
- **File:** `frontend/src/pages/CaptainSignUp.jsx`
- **Features:**
  - Dedicated captain branding (`Veyro_captain_logo.png`).
  - Controlled form inputs for captain personal and vehicle details:
    - **Captain's Name**: `firstname` and `lastname`.
    - **Captain's Email**: `email`.
    - **Password**: `password`.
    - **Vehicle Information**: `color`, `plate`, `capacity`, and `vehicleType` (Car, Bike, Auto).
  - **API Integration:** Sends `POST` request to `${VITE_BASE_URL}/captains/register`.
  - Stores auth token in `localStorage`, sets global captain state, and redirects to `/captain-home`.
  - Navigation links:
    - `"Already have an account? Login here"` ➔ routes to `/captain-login`.

---

### 6. User Home Page (`Home.jsx`)

- **Path:** `/home`
- **File:** `frontend/src/pages/Home.jsx`
- **Access:** Protected (`UserProtectWrapper`)
- **Features & Implementation:**
  - **Full-Screen Map Viewport:** Background cover showcasing the interactive map area (`w-screen h-screen object-cover`).
  - **Floating Veyro Logo:** Positioned at `top-3 left-4` for branding.
  - **Interactive "Find a Trip" Search Panel:**
    - Form inputs for **Pickup location** and **Dropoff location** with custom connector line graphics.
    - Controlled state for `pickupLocation` and `dropoffLocation`.
  - **GSAP Animated Sheet Transitions (`useGSAP`):**
    - Clicking into either location input triggers `setPanelOpen(true)`.
    - Animates the sliding search results panel (`panelRef`) from `0%` to `70%` height with smooth easing (`duration: 0.2s`, `padding: 27px`).
    - Animates down-arrow close button (`panelCloseRef`) opacity from `0` to `1`.
    - Tapping the collapse arrow (`ri-arrow-down-wide-line`) resets `panelOpen` to `false`, smoothly tucking the panel back down.
  - **Embedded Search Results:** Houses `<LocationSearchPanel />` within the animated drawer container.

---

### 7. Location Search Panel (`LocationSearchPanel.jsx`)

- **File:** `frontend/src/components/LocationSearchPanel.jsx`
- **Features & Implementation:**
  - **Dynamic Location List:** Renders an array of sample/suggested pickup and dropoff destinations using JavaScript `.map()`.
  - **Map Pin Iconography:** Stylized Remix Icon map marker (`ri-map-pin-fill`) encapsulated in a circular background (`rounded-full bg-[#eeeeee]`).
  - **Interactive Selection Cards:** Each location option is formatted as a responsive card with rounded corners (`rounded-xl`), custom border states (`border-gray-50 active:border-black`), and flex layout for quick destination selection.

---

### 8. Captain Home Page (`CaptainHome.jsx`)

- **Path:** `/captain-home`
- **File:** `frontend/src/pages/CaptainHome.jsx`
- **Access:** Protected (`CaptainProtectWrapper`)
- **Description:** Main driver dashboard showing active availability and ride requests.

---

### 9. User Logout Component (`UserLogout.jsx`)

- **Path:** `/user/logout`
- **File:** `frontend/src/pages/UserLogout.jsx`
- **Features:**
  - Extracts stored token from `localStorage.getItem("token")`.
  - Calls `GET ${VITE_BASE_URL}/users/logout` with Bearer token authorization header.
  - Clears `token` from `localStorage` (`localStorage.removeItem("token")`) and navigates back to `/login`.
  - Gracefully cleans storage and redirects even if the backend returns an error.

---

### 10. Captain Logout Component (`CaptainLogout.jsx`)

- **Path:** `/captain/logout`
- **File:** `frontend/src/pages/CaptainLogout.jsx`
- **Features:**
  - Extracts stored token from `localStorage.getItem("token")`.
  - Calls `GET ${VITE_BASE_URL}/captains/logout` with Bearer token authorization header.
  - Clears `token` from `localStorage` (`localStorage.removeItem("token")`) and redirects to `/captain-login`.
  - Handles token invalidation and fallback navigation cleanly.

---

## Route Protection & Security

### User Protection Wrapper (`UserProtectWrapper.jsx`)

- **File:** `frontend/src/pages/UserProtectWrapper.jsx`
- **Purpose:** Higher-order route wrapper that guards user-only routes from unauthenticated access.
- **Mechanism:**
  - Checks `localStorage.getItem("token")` inside a `useEffect` hook.
  - Validates profile with the `/users/profile` endpoint.
  - If no token exists or verification fails, redirects to `/login`.
  - Renders child routes once authenticated.

---

### Captain Protection Wrapper (`CaptainProtectWrapper.jsx`)

- **File:** `frontend/src/pages/CaptainProtectWrapper.jsx`
- **Purpose:** Route wrapper guarding driver-only routes (`/captain-home`).
- **Mechanism:**
  - Checks `localStorage.getItem("token")`.
  - Validates the captain token against `GET ${VITE_BASE_URL}/captains/profile`.
  - Populates `CaptainDataContext` with current profile data.
  - Displays loading state while verifying, and redirects unauthenticated requests to `/captain-login`.

---

## State Management (Context API)

### 1. User Context (`UserContext.jsx`)

- **File:** `frontend/src/context/UserContext.jsx`
- **Provider Component:** `UserContext`
- **Context Object:** `UserDataContext`
- **Initial State:**
  ```javascript
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });
  ```
- **Context Value:** `{ user, setUser }`
- **Application Integration:** Wraps `<BrowserRouter>` and `<App />` in `frontend/src/main.jsx` to make user state globally accessible.

---

### 2. Captain Context (`CaptainContext.jsx`)

- **File:** `frontend/src/context/CaptainContext.jsx`
- **Provider Component:** `CaptainContext`
- **Context Object:** `CaptainDataContext`
- **State Provided:**
  - `captain` (current captain object)
  - `setCaptain`
  - `isLoading` / `setIsLoading`
  - `error` / `setError`
  - `updateCaptain`
- **Application Integration:** Nested inside `UserContext` in `frontend/src/main.jsx` to provide global driver state throughout the application.
