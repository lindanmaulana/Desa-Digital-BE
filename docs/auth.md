# Auth API Spec

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

## 1. SIGNUP user

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

Response Body (Success)

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

## 2. SIGNIN user

Endpoint : POST /api/v1/auth/signin

Request Body

```json
{
  "email": "jhondoe@gmail.com",
  "password": "jhondoe123"
}
```

Response Body (Success)

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
  "errors": "Invalid credentials"
}
```

## 3. ACTIVATION user

Endpoint : POST /api/v1/auth/verify-account

Request Body :

```json
{
  "otp_code": "278788"
}
```

Response Body (Success) :

```json
{
  "data": {
    /* UserResponse Object */
  }
}
```

Response Body (Failed)

```json
{
  "errors": "Message Error"
}
```

## 4. RESENDOTP user

Endpoint : POST /api/v1/auth/resend-otp

Request Body :

```json
{
  "data": {
    "email": "emailAccount@gmail.com"
  }
}
```

Response Body (success) :

```json
{
  "data": {
    "email": "jhondoe@gmail.com",
    "otp_last_sent_at": "Date",
    "otp_expiry_seconds": 60
  }
}
```

Response Body (failed)

```json
{
  "errors": "errormessage"
}
```

## 5. FORGOTPASSWORD user

Endpoint : POST /api/v1/auth/forgot-password

Send Otp -> Email

Request Body

```json
{
  "data": {
    "email": "jhondoe@gmail.com"
  }
}
```

Response Body (success)

```json
{
  "data": {
    "email": "jhondoe@gmail.com",
    "otp_last_sent_at": "Date"
  }
}
```

Response Body (failed)

```json
{
  "errors": "errormessage"
}
```

## 7. MATCH-OTP user

Endpoint : POST /api/v1/auth/verify-otp

Request Body

```json
{
  "data": {
    "email": "jhondoe@gmail.com",
    "otp_code": "827831"
  }
}
```

Response Body (success)

```json
{
  "data": {
    "verify_token": "dhaidhe982984jdoajd"
  }
}
```

Response Body (failed)

```json
{
  "errors": "errormessage"
}
```

## 8. RESETPASSWORD user

Endpoint : POST /api/v1/auth/reset-password

Request Header :

- Authorization : Bearer token

Request Body

```json
{
  "data": {
    "password": "newPassword",
    "confirm_password": "newPassword"
  }
}
```

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
  "errors": "errormessage"
}
```
