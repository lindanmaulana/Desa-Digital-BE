# User API Spec

## REGISTER user
Endpoint : POST /api/user/register

Request Body
```json
{
  "name": "Jhon Doe",
  "email": "jhondoe@gmail.com",
  "password": "jhondoe123"
}
```

Response Body
```json
{
  "data": {
    "name": "Jhon Doe",
    "email": "jhondoe@gmail.com",
    "role": "resident"
  }
}
```

Response Body (failed)
```json
{
  "errors": "Email telah di gunakan"
}
```

## LOGIN user
Endpoint : POST /api/user/login

Request Body
```json
{
  "email": "jhondoe@gmail.com",
  "password": "jhondoe123"
}
```

Response Body
```json
{
  "data": {
    "token": "dhaidhisdhaidaasjdaodjoakd",
    "name": "jhon doe",
    "role": "resident"
  }
}
```

Response Body (failed)
```json
{
  "errors": "Invalid credentials"
}
```

## GET all user
Endpoint : GET /api/v1/users

Request Header :
- Authorization : Bearer token

Response Body (success) :

```json
{
  "data": [
    {
      "id": "dadehud76eg3ugeh3",
      "email": "jhondoe@gmail.com",
      "name": "Jhon Doe",
      "role": "resident"
    }
  ]
}
```

Response Body (failed)
```json
{
  "errors": "Unauthorized"
}
```

## GET one user
Endpoint : /api/users/:id

Request Header :
- Authorization : Bearer token

Response Body (success) :
```json
{
  "data": {
    "id": "dhadh939e",
    "name": "jhon doe",
    "email": "jhondoe@gmail.com",
    "role": "resident"
  }
}

```

Response Body (failed)
```json
{
  "errors": "Tidak dapat memuat data"
}
