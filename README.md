**Project Description**

This project is a Node.js-based authentication web service designed to handle user authentication and data retrieval from a MySQL database. It uses the Express framework for handling HTTP requests and the MySQL module for database interactions. The web service provides endpoints for user authentication, fetching user details by API key, and loading user-specific data.

**Key Features:**

1. MySQL Connection:
The mysql module is used to create a connection to the MySQL database.
Connection details (host, user, password, and database) are specified, and the connection is established with error handling.
2. User Authentication:
Endpoint: POST /auth
Description: Authenticates a user by validating the provided username and password against the database. If the credentials are correct, it generates a random API key for the user if it doesn't already exist and returns the user's full name and API key.
3. Fetch User Details by API Key
Endpoint: GET /fetchbyAPI/:api_key
Description: Retrieves user details (full name and API key) based on the provided API key.
4. Load User-Specific Data
Endpoint: GET /loads
Description: Fetches user-specific data based on the API key provided in the Authorization header. The data includes load information such as ID, display identifier, sort, order number, load status, and other related details.
