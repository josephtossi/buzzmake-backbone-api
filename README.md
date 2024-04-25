## Buzzmake Backbone API

Welcome to the Buzzmake Backbone API! This project is a Node.js application built with Express and MongoDB, designed to provide a robust backend for managing buzzes. This README provides comprehensive instructions on how to install and use the Buzzmake Backbone API.

### Installation

To install the Buzzmake Backbone API, follow these steps:

1. **Clone the Repository**: 
git clone https://github.com/josephtossi/buzzmake-backbone-api.git

2. **Navigate to the Directory**:
cd buzzmake-backbone-api

3. **Install Dependencies**:
npm install

4. **Set Up Environment Variables**:
Create a `.env` file in the root directory of the project and add your MongoDB connection URI. For example:
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/your-database

5. **Start the Server**:
npm run serve or npm run dev


### Usage

Once the server is running, you can interact with the API using HTTP requests. Here are the available endpoints:

- **GET /api/buzzes**: Retrieve all buzzes.
- **GET /api/buzzes/:id**: Retrieve a specific buzz by its ID.
- **POST /api/buzzes**: Create a new buzz.
- **PUT /api/buzzes/:id**: Update an existing buzz.
- **DELETE /api/buzzes/:id**: Delete a buzz.


### Contributing

Contributions to the Buzzmake Backbone API are welcome! Feel free to fork the repository, make changes, and submit pull requests.

### Authors

Joseph F. Tossy

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

### Support

For any questions or issues, please [open an issue](https://github.com/josephtossi/buzzmake-backbone-api/issues) on GitHub.

Thank you for for checking the Buzzmake Backbone API project! 🐝
