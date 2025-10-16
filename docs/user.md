# User API Spec

Definisi struktur data yang digunakan dalam respons API.

## UserResponse Object

Objek ini merepresentasikan data pengguna yang dikembalikan setelah otentikasi atau pengambilan data profil.

| Properti         | Tipe Data | Deskripsi                                  | Catatan  |
| :--------------- | :-------- | :----------------------------------------- | :------- |
| `id`             | `string`  | ID unik pengguna.                          | UUID     |
| `name`           | `string`  | Nama lengkap pengguna.                     |          |
| `email`          | `string`  | Alamat email unik.                         |          |
| `role`           | `string`  | Peran pengguna (misalnya RESIDENT, ADMIN). |          |
| `is_active`      | `boolean` | Status akun aktif/tidak aktif.             |          |
| `is_first_login` | `boolean` | Status apakah pengguna pertama kali login. |          |
| `created_at`     | `string`  | Tanggal pembuatan akun.                    | ISO 8601 |
| `updated_at`     | `string`  | Tanggal pembaruan terakhir.                | ISO 8601 |

**Catatan:** Dalam respons API sebenarnya, properti sensitif seperti `otp_code` dan `password` **TIDAK** boleh disertakan.

## 1. GET all user

Endpoint : GET /api/v1/v1/users?

- Request Query :
  keyword=value
  is_active=true or false
  role=userRole

Request Header :

- Authorization : Bearer token

Response Body (success) :

```json
{
  "data": [
    {
    /* UserResponse Object */
    },
  ],
  "pagination": {
      "total_page": totalPage,
				"limit": limit,
				"current_page": currentPage,
				"links": number[number],
				"next_page": nextPage,
				"prev_page": prevPage,
  }
}
```

Response Body (failed)

```json
{
  "errors": "Unauthorized"
}
```

## 2. GET one user

Endpoint : /api/v1/users/:id

Request Header :

- Authorization : Bearer token

Response Body (success) :

```json
{
  "data": {
    /* UserResponse Object */
  }
}
```

Response Body (failed)

```json
{
  "errors": "Tidak dapat memuat data"
}
```

## 3. DELETE user

Endpoint : /api/v1/users/:id

Request Header :

- Authorization : Bearer token

Role :

- ADMIN

Response Body (success)

```json
{
  "data": {
    /* UserResponse Object */
  }
}
```

Response Body (failed)

```json
{
  "errors": "Messagge Error"
}
```

## 4. POST register-staff

Endpoint : /api/v1/admin/users/staff/register

Request Header :

- Authrorization : Bearer token

Role :

- ADMIN

  Request Body :

```json
{
  "name": "Jhon Doe",
  "email": "jhondoe@gmail.com",
  "password": "jhondoe123",
  "profile_picture": string | optional,
  "identity_number": string | optional,
  "gender": string | optional,
  "date_of_birth": string | optional,
  "phone_number": string | optional,
  "occupation": string | optional,
  "marital_status": string | optional,
}
```

    Response Body (success)

```json
{
  "data": {
    /* UserResponse Object */
    "staff": {
      /* StaffResponse Object */
    }
  }
}
```

Response Body (failed)

```json
{
  "errors": "Messagge Error"
}
```

## 5. POST register-head-of-family

Endpoint : /api/v1/admin/users/head-of-family/register

Request Header :

- Authrorization : Bearer token

Role :

- ADMIN

  Request Body :

```json
{
  "name": "Jhon Doe",
  "email": "jhondoe@gmail.com",
  "password": "jhondoe123",
  "profile_picture": string | optional,
  "identity_number": string | optional,
  "gender": string | optional,
  "date_of_birth": string | optional,
  "phone_number": string | optional,
  "occupation": string | optional,
  "marital_status": string | optional,
}
```

    Response Body (success)

```json
{
  "data": {
    /* UserResponse Object */
    "staff": {
      /* HeadOfFamily Object */
    }
  }
}
```

Response Body (failed)

```json
{
  "errors": "Messagge Error"
}
```
