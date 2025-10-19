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

## 1. GET getProfile

Endpoint : /api/v1/auth/profile

Request Header :

- Authrorization : Bearer token

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
  "errors": Messagge Error
}
```

## 2. PATCH changPassword

Endpoint : /api/v1/profile/password

Request Header :
- Authorization : Bearer token

Request Body :

```json
{
  "password": string,
  "confirm_password": string
}
```

Response Body (success) :
```json
{
  "data": {
    /* UserResponse Object */
  }
}
```

Response Body (failed) :
```json
{
  "errors": MessageError
}
```
