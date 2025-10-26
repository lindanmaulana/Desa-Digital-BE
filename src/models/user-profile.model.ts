export interface ChangePasswordUserProfileRequest {
	password: string;
	confirm_password: string;
}

export interface UpdateUserProfileRequest {
	head_of_family_id?: string
	profile_picture?: string;
	identity_number?: string;
	gender?: string;
	date_of_birth?: string;
	phone_number?: string;
	occupation?: string;
	marital_status?: string;
	relation?: string
}
