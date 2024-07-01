# ItemList Project

This project is a full-stack web application built with Django, Django Rest Framework, React.js, and PostgreSQL. It includes authentication with JWT tokens, CRUD operations for items, and dynamic handling of data using a custom React hook.

## Features

- User authentication with JWT
- CRUD operations for items
- Dynamic data handling with a custom React hook
- Dockerized environment for easy setup

## Prerequisites

- Docker
- Docker Compose
- The .env file is included for this project, but for production, it is not suggested.

### 1. How to Run the Project:

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/abhinav-cod/ItemList.git
cd ItemList
```

### 2. Backend(api) Setup
1. Open Docker desktop.
2. In new terminal Build and run the container:
   ```sh
   docker-compose up --build
   ```
3. Migrate the application :
   ```sh
   docker-compose exec web python manage.py migrate
   ```
4. load Json file. In this case name it ```data.json``` and put it in root directory ```ItemList```
   ```sh
   docker-compose exec web python manage.py load_json
   ```
   ```sh
   load_json.py is in  ```ItemList\api\management\commands\load_json.py''' if you want to change file name.
   ```
5. Create one user or multiple users for access:
   ```sh
   docker-compose exec web python manage.py createsuperuser
   ```
   Make user according to Django Passsword validation.  

### 3. Frontend (loginfront) Setup
1. open new terminal:
   ```sh
   cd loginfront
   ```
2. install dependencies
   ```sh
   npm install
   ```
   if error occurs or vulnerablities are there try ```npm install --no-audit```

3. run loginfront server:
   ```sh
   npm start
   ```
4. application will be accessible from : ```http://localhost:3000```
5. Backend server will be accesible from : ```http://localhost:8000```

### 3. API endpoints:
## Authentication
```sh
POST /auth/token/: Obtain JWT token
POST /auth/token/refresh/: Refresh JWT token
```
## Items
```sh
GET /items/: List all items
POST /items/: Create a new item
GET /items/:id/: Retrieve an item
PUT /items/:id/: Update an item
DELETE /items/:id/: Delete an item
```

### 4. How to navigate through application :
1. ```http://localhost:3000/login/```
  Login using the credential you have created in Backend setup

2. Once successfully login is done, redirected to ```http://localhost:3000/items/```

3. To retrieve any specefic element provide id of that element along with ```http://localhost:3000/items/{id}```

4. To edit any field of any specific element go to : ```http://localhost:3000/edit/{id}``` , make changes and save.

5. To Logout and login using new credential:
   ```sh
       http://localhost:3000/logout/
   ```





### 5. How the Custom Hook Works
The custom hook useApi is designed to handle all API requests within the application while managing authentication tokens. Here's a brief overview:

Context Provider:
The ApiProvider component provides the context for the authentication tokens and the useApi hook to the rest of the application. It uses axios to create an instance with the base URL and sets the Authorization header with the access token.

Token Refresh:
If an API request fails due to token expiry, the hook automatically attempts to refresh the token using the refresh token. If successful, it retries the original request with the new access token.

API Methods:
The hook provides get, post, put, and delete methods for making API requests, ensuring that the access token is included in the headers of each request.




### Assumption:
``` id generated will be copied from Backend server ``` 

   
