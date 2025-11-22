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
| `head_0f_family` | `HeadOfF `|                                            |          |
| `created_at`     | `string`  | Tanggal pembuatan akun.                    | ISO 8601 |
| `updated_at`     | `string`  | Tanggal pembaruan terakhir.                | ISO 8601 |


## HeadOfFamilyResponse Object
| Properti                      | Tipe Data                     | Deskripsi                                  | Catatan  |
| :-----------------------------| :-----------------------------| :----------------------------------------- | :------- |
| `id`                          | `string`                      | ID unik pengguna.                          | UUID     |
| `user_id`                     | `string`                      | id_user id dari tabel user.                |          |
| `identity_number`             | `string`                      | Nomor induk kependudukan (NIK).            |          |
| `gender`                      | `enum`                        | Peran pengguna (misalnya MALE, FEMALE).    |          |
| `date_of_birth`               | `date`                        | Tanggal lahir.                             |          |
| `phone_number`                | `string`                      | Status apakah pengguna pertama kali login. |          |
| `occupation`                  | `string`                      | Pekerjaan kepala keluarga                  |          |
| `marital_status`              | `enum`                        | Status kepala keluarga                     |          |
| `created_at`                  | `string`                      | Tanggal pembuatan head-of-family.          | ISO 8601 |
| `updated_at`                  | `string`                      | Tanggal pembaruan terakhir.                | ISO 8601 |
| `social_assistance_recipient` | `social_assistance_recipient` | Data Relasi SocialAssistanceRecipien       | FK uuid  |
| `user`                        | `users`                       | Data Relasi User                           | FK uuid  |


## ImageResponse Object
| Properti                          | Tipe Data | Deskripsi                                               | Catatan  |
| :-------------------------------- | :-------- | :-----------------------------------------------------  | :------- |
| `id`                              | `string`  | ID unik pengguna.                                       | UUID     |
| `filename`                        | `string`  | Nama dari image nya                                     |          |
| `path`                            | `string`  | Nama path folder public.                                |          |
| `profile_id`                      | `uuid`    | ForeignKey ke table profile optional.                   |          |
| `user_id`                         | `uuid`    | Foreignkey ke tabel user optional                       |          |
| `social_assistance_id`            | `uuid`    | Foreignkey ke table social_assistance optional.         |          |
| `social_assistance_recipient_id`  | `uuid`    | Foreignkey ke table social_assistance_recipient optional|          |
| `event_id`                        | `uuid`    | Foreignkey ke table event optional                      |          |
| `development_id`                  | `uuid`    | Foreignkey ke table development optional                |          |
| `created_at`                      | `string`  | Tanggal pembuatan gambar.                               | ISO 8601 |
| `updated_at`                      | `string`  | Tanggal pembaruan terakhir.                             | ISO 8601 |


## HeadOfFamilyResponse


## 1. GET all
Endpoint : /api/v1/admin/head-of-family

Request Header :
- Cookies : jwt -> token

Role :
- ADMIN

Request Query Params :
```json
{
  "keyword": string,
	"page": string,
	"limit": string,
	"sort": string,
}
```

Response Body (success)

```json
{
  "data": {
    /* HeadOfFamilyResponse Object */
  }
}
```

Response Body (failed)

```json
{
  "errors": Messagge Error
}
```

## 2. GET one
Endpoint : /api/v1/admin/head-of-family/:id

Request Header :
- Cookies : jwt -> token

Role :
- Admin

Request Body (success)
```json
{
  "data": {
    // HeadOfFamilyResponse Object
  }
}
```
