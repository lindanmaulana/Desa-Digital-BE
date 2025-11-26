export type CustomTypeError = "TOKEN_EXPIRED" | "UNKNOWN"

export interface CustomErrorResponse {
	code: string
	message: string
	details: unknown[]
}

// {
//   "error": {
//     "code": "VALIDATION_ERROR",
//     "message": "The request contains invalid data",
//     "details": [
//       {
//         "field": "email",
//         "message": "Email is required",
//         "code": "REQUIRED"
//       },
//       {
//         "field": "email",
//         "message": "Email format is invalid",
//         "code": "INVALID_FORMAT"
//       }
//     ]
//   }
// }
