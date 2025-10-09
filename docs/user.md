# User API Spec
Definisi struktur data yang digunakan dalam respons API.

## UserResponse Object
Objek ini merepresentasikan data pengguna yang dikembalikan setelah otentikasi atau pengambilan data profil.

| Properti | Tipe Data | Deskripsi | Catatan |
| :--- | :--- | :--- | :--- |
| `id` | `string` | ID unik pengguna. | UUID |
| `name` | `string` | Nama lengkap pengguna. | |
| `email` | `string` | Alamat email unik. | |
| `role` | `string` | Peran pengguna (misalnya RESIDENT, ADMIN). | |
| `otp_code` | `string` | Kode OTP saat ini (dapat bernilai null). | **Sensitif, biasanya dihilangkan.** |
| `is_first_login` | `boolean` | Status apakah pengguna pertama kali login. | |
| `is_active` | `boolean` | Status akun aktif/tidak aktif. | |
| `created_at` | `string` | Tanggal pembuatan akun. | ISO 8601 |
| `updated_at` | `string` | Tanggal pembaruan terakhir. | ISO 8601 |

**Catatan:** Dalam respons API sebenarnya, properti sensitif seperti `otp_code` dan `password` **TIDAK** boleh disertakan.

## REGISTER user
Membuat akun pengguna baru. Akun akan di buat dengan `is_active: false` dan `is_first_login: true`, dan kode OTP akan dikirim via email

Endpoint : POST /api/v1/auth/signup

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
    /* Lihat Skema "UserResponse Object" di Bagian 1 */
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
Endpoint : POST /api/v1/auth/signin

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
    "name": "jhon doe",
    "email": "jhondoe@gmail.com",
    "otp_code": "2378293",
    "is_active": false,
    "is_first_login": true,
    "token": "dhaidhisdhaidaasjdaodjoakd",
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
Endpoint : GET /api/v1/v1/users

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
Endpoint : /api/v1/users/:id

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
```

## UPDATE changePassword
Endpoint : /api/v1/users/me/password

Request Header :
- Authorization : Bearer token

Response Body (success) :
```json
{
  "data": {
    "password": "newPassword",
    "confirm_password": "newPassword",
  }
}
```

Response Body (failed)
```json
{
  "errors": "Tidak dapat memuat data"
}


