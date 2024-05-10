## Buzzmake Backbone API

This project is a Node.js application built with Express and MongoDB, designed to provide a robust backend for managing buzzes, with signing up and signing in. Additionally, it includes a secure authentication system using JWT and Redis for token management.

## Features:

- **Buzz Management**: CRUD operations for managing buzzes.
- **User Authentication**: Sign up and sign in functionality with JWT for secure authentication.
- **Token Blacklisting**: Uses Redis to maintain a blacklist of JWT tokens for enhanced security.

### Installation

To install the Buzzmake Backbone API, follow these steps:

1. **Clone the Repository**:
   git clone https://github.com/josephtossi/buzzmake-backbone-api.git

2. **Navigate to the Directory**:
   cd buzzmake-backbone-api

3. **Install Dependencies**:
   npm install

4. **Download and Install Redis**:
   windows: https://github.com/tporadowski/redis/releases/tag/v5.0.14.1
   linux or mac: https://redis.io/download

5. **Set Up Environment Variables**:
   Create a `.env` file in the root directory of the project and add your MongoDB connection URI. For example:
   MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/your-database

6. **Download and install Redis**:
   Using redis-commander (globally) => then start

7. **Start the Server**:
   npm run serve or npm run dev

### Usage

Once the server is running, you can interact with the API using HTTP requests. Here are the available endpoints:

- **POST /api/auth/register**: Sign up to buzzmake.
- **POST /api/auth/login**: Log in to access buzzmake services.
- **POST /api/auth/refresh-token**: Get a new access and refresh token.
- **POST /api/auth/logout**: account logout.
- **GET /api/buzzes**: Retrieve all buzzes.
- **GET /api/buzzes/buzz-type/:id**: Retrieve buzzes of a certain type or a genre.
- **GET /api/buzzes/:id**: Retrieve a specific buzz by its ID.
- **POST /api/buzzes**: Create a new buzz.
- **PUT /api/buzzes/:id**: Update an existing buzz.
- **DELETE /api/buzzes/:id**: Delete a buzz.
- **GET /api/users**: Get all users
- **GET /api/users/:id**: Get a certain user
- **GET /api/users/buzzes**: Retrieve buzzes of a certain user
- **GET /api/buzzes/uploads/:filePath**: display the file uploaded
- **GET /api/buzzes/get-types**: get buzz types
- **POST /api/buzzes/create-type**: create a new buzz type
- **DELETE /api/buzzes/buzz-type/:id**: delete a buzz type

### Contributing

Contributions to the Buzzmake Backbone API are welcome! Feel free to fork the repository, make changes, and submit pull requests.

### Authors

Joseph F. Tossy

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

### Support

For any questions or issues, please [open an issue](https://github.com/josephtossi/buzzmake-backbone-api/issues) on GitHub.

Thank you for for checking the Buzzmake Backbone API project! 🐝
