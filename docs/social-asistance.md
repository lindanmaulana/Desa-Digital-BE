# Social Asistance API Spec

Definisi struktur data yang digunakan dalam respons API.

## SocialAsistance Object

Objek ini merepresentasikan data pengguna yang dikembalikan setelah otentikasi atau pengambilan data profil.

| Properti         | Tipe Data | Deskripsi                                  | Catatan  |
| :--------------- | :-------- | :----------------------------------------- | :------- |
| `id`             | `string`  | ID unik pengguna.                          | UUID     |
| `thumbnail`      | `string`  | thumbnail social-assistance                |          |
| `name`           | `string`  | Nama bantuan sosial.                       |          |
| `category`       | `string`  | Peran pengguna (misalnya RESIDENT, ADMIN). |          |
| `amount`         | `boolean` | Status akun aktif/tidak aktif.             |          |
| `provider`       | `boolean` | Status apakah pengguna pertama kali login. |          |
| `description`    | `string`  |                                            |          |
| `is_active`      | `boolean` |                                            |          |
| `created_at`     | `string`  | Tanggal pembuatan akun.                    | ISO 8601 |
| `updated_at`     | `string`  | Tanggal pembaruan terakhir.                | ISO 8601 |

**Catatan:** Dalam respons API sebenarnya, properti sensitif seperti `otp_code` dan `password` **TIDAK** boleh disertakan.

## 1. POST create

Endpoint : /api/v1/admin/social-assitance

Request Header :
- Authorization : Bearer token

Role :
- ADMIN

Request Body :
```json
{
  "thumbnail": string | undefined,
  "name": string,
  "category": string,
  "amount": string,
  "provider": string,
  "description": string,
  "is_active": string
}
```

Response Body (success)

```json
{
  "data": {
    /* SocialAssistance Object */
  }
}
```

Response Body (failed)

```json
{
  "errors": Messagge Error
}
```
