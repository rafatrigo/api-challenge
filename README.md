# API Challenge

This is an API to simulate a part of an API for streaming movies. This API mainly deals with the relationship between users, movies and categories.

# Getting started

### Clone this repository

```
git clone https://github.com/rafatrigo/api-challenge.git
```

### Install the dependencies

```
cd api-challenge

yarn
```

### Create the docker containers

```
cd api-challenge

sudo docker-compose up -d
```

### run migrations

```
cd api-challenge

#runs migrations in the development database
yarn migration:dev

#runs migrations in the test database
yarn migrarion:test
```

---

&nbsp;

# Endpoint

The connection endpoint for a REST JSON API after cloning the project will be:

```http://localhost:3333```

# Available resources

There are currently the following resources below that you can manipulate using the methods GET, POST, PUT, DELETE:

- Admin
- User
- Movie
- Category

# Data treatment

All data sent and received by the API is/should be in JSON format (application / json).

# Authentication

With the exception of the routes for creating and authenticating users and admin, all other routes are authenticated.

To be authenticated, just send the returned token as a response in the authentication route through the request header

Example:

```Authorization: Bearer {token}```

---

&nbsp;

## /admin
```http://localhost:333/admin```

### **POST** Create admin

```http://localhost:333/admin```

Parameter | Description
----------|------------
email | Admin's email. **Required**
password | Admin's password. **Required**


&nbsp;

Example request:

```
curl --request POST 'https://localhost:3333/admin/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "email@example.com"
  "password": "123123"
}'
```

&nbsp;

Example response:

```
{
  "id": "admin's uuid"
  "email": "email@example.com"
}
```
Response code: 201


&nbsp;

Example with email already registered:

```
{
  "status": "error",
  "message": "The email adress alredy exists"
}
```
Response code: 400

---


&nbsp;

### **POST** Authenticate admin

```http://localhost:333/admin/signIn```

Parameter | Description
----------|------------
email | Admin's email. **Required**
password | Admin's password. **Required**


&nbsp;

Example request:

```
curl --request POST 'https://localhost:3333/admin/signIn' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "email@example.com"
  "password": "123123"
}'
```

&nbsp;

Example response:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTYyNDczODAsImV4cCI6MTYxNjMzMzc4MCwic3ViIjoiNjk3ZjhmODAtODkxOC0xMWViLThjYTAtMTc1NGEwMzlhODgyIn0.ldjgnyhKftkqw6RDdvoU0ZeM4hnJC8nK683Yz9tjY9U"
}
```
Response code: 200


&nbsp;

Example with invalid credentials:

```
{
  {
  "status": "error",
  "message": "Incorrect email/password combination"
  }
}
```
Response code: 400


---


&nbsp;

### **PUT** Update admin

```http://localhost:333/admin```

Parameter | Description
----------|------------
email | Admin's email. **Required**
password | Admin's password. **Required**


&nbsp;

Example request:

```
curl --request PUT 'https://localhost:3333/admin' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "email": "new@example.com"
  "password": "123123"
}'
```

&nbsp;

Example response:

```
{
  "admin": {
    "id": "e79b7320-8814-11eb-9297-0f3eebc738f3",
    "email": "new@gmail.com",
    "createdAt": "2021-03-18T18:08:13.138Z",
    "updatedAt": "2021-03-18T18:29:03.974Z"
  }
}
```
Response code: 200

---


&nbsp;

### **DELETE** Delete admin

```http://localhost:333/admin```


&nbsp;

Example request:

```
curl --request DELETE 'https://localhost:3333/admin' \
--header 'Autorization: Bearer <token>' \
```

&nbsp;

Response code: 204

---


&nbsp;

### **POST** Create movie

```http://localhost:333/admin/movie```

Parameter | Description
----------|------------
title | Movie title. **Required**
synopsis | Movie synopsis. **Required**
time | Movie length in minutes. **Required**


&nbsp;

Example request:

```
curl --request POST 'https://localhost:3333/admin/movie' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "title": "New Movie",
  "synopsis": "Movie synopsis",
  "time": 90
}'
```

&nbsp;

Example response:

```
{
  "id": "65b65970-898f-11eb-b34a-d37d7d129149",
  "title": "New Movie",
  "synopsis": "synpsis",
  "time": 90
}
```
Response code: 201

Example trying to create a movie with the existing title:

```
{
  "status": "error",
  "message": "The movie already exist"
}
```
Response code: 400

---


&nbsp;

### **PUT** Update movie

```http://localhost:333/admin/movie/{movieId}```

Parameter | Description
----------|------------
title | Movie title. **Required**
synopsis | Movie synopsis. **Required**
time | Movie length in minutes. **Required**


&nbsp;

Example request:

```
curl --request PUT 'https://localhost:3333/admin/movie/{movieId}' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "title": "New Movie",
  "synopsis": "Movie synopsis",
  "time": 90
}'
```

&nbsp;

Example response:

```
{
  "id": "3aa79810-8990-11eb-b34a-d37d7d129149",
  "title": "New Movie",
  "synopsis": "Movie synopsis",
  "time": 90,
  "createdAt": "2021-03-20T15:23:31.729Z",
  "updatedAt": "2021-03-20T15:23:49.195Z"
}
```
Response code: 200

---

&nbsp;

### **DELETE** Delete movie

```http://localhost:333/admin/movie/{movieId}```


&nbsp;

Example request:

```
curl --request DELETE 'https://localhost:3333/admin/movie/{movieId}' \
--header 'Autorization: Bearer <token>'
```

Response code: 204

---

&nbsp;

### **POST** Adds a category to a movie

```http://localhost:333/admin/movie/{movieId}```

Parameter | Description
----------|------------
categoryTitle | Category title that will be added to the film. **Required**

&nbsp;

Example request:

```
curl --request POST 'https://localhost:3333/admin/movie/{movieId}' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "categoryTitle": "category",
}'
```

Example response:
```
[
  {
    "MovieId": "65b65970-898f-11eb-b34a-d37d7d129149",
    "CategoryId": "7a09fbf0-8991-11eb-b34a-d37d7d129149",
    "createdAt": "2021-03-20T16:48:38.861Z",
    "updatedAt": "2021-03-20T16:48:38.861Z"
  }
]
```

Response code: 200


&nbsp;

Example with invalid categoryTitle:

```
{
  "status": "error",
  "message": "This category does not exist"
}
```

Response code: 400

---

&nbsp;



### **POST** Create category

```http://localhost:333/admin/category```

Parameter | Description
----------|------------
title | Category title. **Required**


&nbsp;

Example request:

```
curl --request POST 'https://localhost:3333/admin/category' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "title": "New category",
}'
```

&nbsp;

Example response:

```
{
  "id": "3aa79810-8990-11eb-b34a-d37d7d129149",
  "title": "New category",
}
```
Response code: 204


&nbsp;

Example trying to create a category with the existing title:

```
{
  "status": "error",
  "message": "The category already exist"
}
```
Response code: 400

---
&nbsp;

### **PUT** Update category

```http://localhost:333/admin/category/{categoryId}```

Parameter | Description
----------|------------
title | Category title. **Required**


&nbsp;

Example request:

```
curl --request PUT 'https://localhost:3333/admin/category/{categoryId}' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "title": "New category title",
}'
```

&nbsp;

Example response:

```
{
  "id": "3aa79810-8990-11eb-b34a-d37d7d129149",
  "title": "New category title",
  "createdAt": "2021-03-20T14:30:40.453Z",
  "updatedAt": "2021-03-20T14:57:08.969Z"
}
```
Response code: 200

---

&nbsp;

### **DELETE** Delete category

```http://localhost:333/admin/category/{categoryId}```


Example request:

```
curl --request DELETE 'https://localhost:3333/admin/category/{categoryId}' \
--header 'Autorization: Bearer <token>' 
```

Response code: 204

---

&nbsp;

## /user
```http://localhost:333/user```

### **POST** Create user
```http://localhost:333/user```

Parameter | Description
----------|------------
username | User's name. **Required**
email | User's email. **Required**
password | User's password. **Required**


&nbsp;

Example request:

```
curl --request POST 'https://localhost:3333/user/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "newuser",
  "email": "email@example.com",
  "password": "123123"
}'
```

&nbsp;

Example response:

```
{
  "id": "user's uuid",
  "username": "newuser",
  "email": "email@example.com"
}
```
Response code: 201


&nbsp;

Example with email already registered:

```
{
  "status": "error",
  "message": "The email adress alredy exist"
}
```
Response code: 400

---


&nbsp;

### **POST** Authenticate user
```http://localhost:333/user```

Parameter | Description
----------|------------
username | User's name. **Required**
email | User's email. **Required**
password | User's password. **Required**


&nbsp;

Example request:

```
curl --request POST 'https://localhost:3333/user/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "newuser",
  "email": "email@example.com",
  "password": "123123"
}'
```

&nbsp;

Example response:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTYyNDczODAsImV4cCI6MTYxNjMzMzc4MCwic3ViIjoiNjk3ZjhmODAtODkxOC0xMWViLThjYTAtMTc1NGEwMzlhODgyIn0.ldjgnyhKftkqw6RDdvoU0ZeM4hnJC8nK683Yz9tjY9U"
}
```
Response code: 200


&nbsp;

Example with invalid credentials:

```
{
  {
  "status": "error",
  "message": "Incorrect email/password combination"
  }
}
```
Response code: 400


---


&nbsp;

### **PUT** Update user

```http://localhost:333/user```

Parameter | Description
----------|------------
username | User's name. **Required**
email | User's email. **Required**
password | User's password. **Required**


&nbsp;

Example request:

```
curl --request PUT 'https://localhost:3333/user' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "username": "newuser",
  "email": "new@example.com",
  "password": "123123"
}'
```

&nbsp;

Example response:

```
{
  "admin": {
    "id": "e79b7320-8814-11eb-9297-0f3eebc738f3",
    "username": "newuser",
    "email": "new@gmail.com",
    "createdAt": "2021-03-18T18:08:13.138Z",
    "updatedAt": "2021-03-18T18:29:03.974Z"
  }
}
```
Response code: 200

---


&nbsp;

### **DELETE** Delete user

```http://localhost:333/user```


&nbsp;

Example request:

```
curl --request DELETE 'https://localhost:3333/user' \
--header 'Autorization: Bearer <token>' \
```

&nbsp;

Response code: 204

---


&nbsp;

## /category
```http://localhost:333/category```

### **GET**  Find category
```http://localhost:333/category/search```

Parameter | Description
----------|------------
title | Category's title. **Required**


&nbsp;

Example request:

```
curl --request GET 'https://localhost:3333/user/search' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "title": "categoryTitle",
}'
```

&nbsp;

Example response:

```
{
  "id": "category's uuid",
  "title": "categoryTitle",
  "email": "email@example.com",
  "createdAt": "2021-03-20T15:32:27.568Z",
  "updatedAt": "2021-03-20T15:32:27.568Z"
}
```
Response code: 200


&nbsp;

Example with invalid title:

```
{
  "status": "error",
  "message": "Category not found"
}
```
Response code: 400

---


&nbsp;

### **GET**  List categories
```http://localhost:333/category```


&nbsp;

Example request:

```
curl --request GET 'https://localhost:3333/user' \
--header 'Autorization: Bearer <token>'
```

&nbsp;

Example response:

```
[
  {
    "id": "7a09fbf0-8991-11eb-b34a-d37d7d129149",
    "title": "Category title",
    "createdAt": "2021-03-20T15:32:27.568Z",
    "updatedAt": "2021-03-20T15:32:27.568Z",
    "movies": [
      {
        "id": "65b65970-898f-11eb-b34a-d37d7d129149",
        "title": "Movie 1",
        "synopsis": "",
        "time": 90,
        "createdAt": "2021-03-20T15:17:34.482Z",
        "updatedAt": "2021-03-20T15:17:34.482Z",
        "MovieCategories": {
          "MovieId": "65b65970-898f-11eb-b34a-d37d7d129149",
          "CategoryId": "7a09fbf0-8991-11eb-b34a-d37d7d129149",
          "createdAt": "2021-03-20T16:48:38.861Z",
          "updatedAt": "2021-03-20T16:48:38.861Z"
        }
      }
    ]
  }
]
```
Response code: 200

---


&nbsp;

## /movie
```http://localhost:333/movie```

### **GET**  List movies
```http://localhost:333/movie```


&nbsp;

Example request:

```
curl --request GET 'https://localhost:3333/movie' \
--header 'Autorization: Bearer <token>'
```

&nbsp;

Example response:

```
{
  "count": 1,
  "rows": [
    {
      "id": "65b65970-898f-11eb-b34a-d37d7d129149",
      "title": "Movie title",
      "synopsis": "synopsis",
      "time": 90,
      "createdAt": "2021-03-20T15:17:34.482Z",
      "updatedAt": "2021-03-20T15:17:34.482Z"
    }
  ]
}
```
Response code: 200

---


&nbsp;

### **GET**  List whatched movies
```http://localhost:333/movie/watched```

This lists the movies that have been watched by the user who is authenticated.

&nbsp;

Example request:

```
curl --request GET 'https://localhost:3333/movie/watched' \
--header 'Autorization: Bearer <token>'
```

&nbsp;

Example response:

```
[
  {
    "id": "f2023130-86b3-11eb-8765-27a7e753f57c",
    "title": "Movie title",
    "synopsis": "synopsis",
    "time": 90,
    "createdAt": "2021-03-17T00:01:38.243Z",
    "updatedAt": "2021-03-17T00:01:38.243Z",
    "UserWatchedMovies": {
      "createdAt": "2021-03-17T00:56:30.911Z",
      "updatedAt": "2021-03-17T00:56:30.911Z",
      "MovieId": "f2023130-86b3-11eb-8765-27a7e753f57c",
      "UserId": "e9b9d4b0-86b3-11eb-8765-27a7e753f57c"
    }
  }
]
```
Response code: 200

---


&nbsp;

### **GET**  List movies to watch
```http://localhost:333/movie/toWatch```

This lists the movies that have been added to the list of movies to watch.

&nbsp;

Example request:

```
curl --request GET 'https://localhost:3333/movie/toWatch' \
--header 'Autorization: Bearer <token>'
```

&nbsp;

Example response:

```
[
  {
    "id": "91d71e20-86bc-11eb-a913-25eaac83e057",
    "title": "Movie title",
    "synopsis": "synopsis",
    "time": 90,
    "createdAt": "2021-03-17T01:03:22.371Z",
    "updatedAt": "2021-03-17T01:03:22.371Z",
    "UserMoviesToWatch": {
      "createdAt": "2021-03-17T01:03:39.917Z",
      "updatedAt": "2021-03-17T01:03:39.917Z",
      "UserId": "e9b9d4b0-86b3-11eb-8765-27a7e753f57c",
      "MovieId": "91d71e20-86bc-11eb-a913-25eaac83e057"
    }
  }
]
```
Response code: 200

---


&nbsp;

### **GET**  Find by category
```http://localhost:333/movie/search/category```

This lists the films that belong to a certain category.

&nbsp;

Example request:

```
curl --request GET 'https://localhost:3333/movie/search/category' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "title": "categoryTitle",
}'
```

&nbsp;

Example response:

```
[
  {
    "id": "65b65970-898f-11eb-b34a-d37d7d129149",
    "title": "Movie Title",
    "synopsis": "synopsis",
    "time": 90,
    "createdAt": "2021-03-20T15:17:34.482Z",
    "updatedAt": "2021-03-20T15:17:34.482Z",
    "MovieCategories": {
      "MovieId": "65b65970-898f-11eb-b34a-d37d7d129149",
      "CategoryId": "7a09fbf0-8991-11eb-b34a-d37d7d129149",
      "createdAt": "2021-03-20T16:48:38.861Z",
      "updatedAt": "2021-03-20T16:48:38.861Z"
    }
  }
]
```
Response code: 200


&nbsp;

Example with invalid category:

```
{
  "status": "error",
  "message": "Category not found"
}
```
Response Code: 400

---


&nbsp;

### **GET**  Find by title
```http://localhost:333/movie/search```

&nbsp;

Example request:

```
curl --request GET 'https://localhost:3333/movie/search' \
--header 'Content-Type: application/json, Autorization: Bearer <token>' \
--data-raw '{
  "title": "movieTitle",
}'
```

&nbsp;

Example response:

```
{
  "count": 1,
  "rows": [
    {
      "id": "3aa79810-8990-11eb-b34a-d37d7d129149",
      "title": "Movie Title",
      "synopsis": "Synopsis",
      "time": 93,
      "createdAt": "2021-03-20T15:23:31.729Z",
      "updatedAt": "2021-03-20T15:23:49.195Z"
    }
  ]
}
```
Response code: 200

---


&nbsp;

### **POST** Add a movie to the list of movies to watch

```http://localhost:333/movie/toWatch/{movieId}```


&nbsp;

Example request:

```
curl --request POST 'https://localhost:3333/admin/movie/toWatch/{movieId}' \
--header 'Autorization: Bearer <token>'
```

Example response:
```
[
  {
    "UserId": "c143e300-899b-11eb-b8c3-d158eaaecf43",
    "MovieId": "65b65970-898f-11eb-b34a-d37d7d129149",
    "createdAt": "2021-03-20T17:16:42.424Z",
    "updatedAt": "2021-03-20T17:16:42.424Z"
  }
]
```

Response code: 200


&nbsp;

Example with invalid id:
```
{
  "status": "error",
  "message": "Movie not found"
}
```

Response code: 400

---


&nbsp;

### **POST** Add a movie to the list of watched movies

```http://localhost:333/movie/watch/{movieId}```

When a movie is added to the list of watched movies it is automatically removed from the list of movies to watch.

&nbsp;

Example request:

```
curl --request POST 'https://localhost:3333/admin/movie/watch/{movieId}' \
--header 'Autorization: Bearer <token>'
```

Example response:
```
[
  {
    "UserId": "c143e300-899b-11eb-b8c3-d158eaaecf43",
    "MovieId": "65b65970-898f-11eb-b34a-d37d7d129149",
    "createdAt": "2021-03-20T17:22:09.010Z",
    "updatedAt": "2021-03-20T17:22:09.010Z"
  }
]
```

Response code: 200


&nbsp;

Example with invalid id:
```
{
  "status": "error",
  "message": "Movie not found"
}
```

Response code: 400

---

&nbsp;
