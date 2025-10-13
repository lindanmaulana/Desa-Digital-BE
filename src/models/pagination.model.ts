export interface PaginationRequest {
	total_page?: number;
	current_page?: number;
	limit?: number;
	links?: number[];
	next_page?: number | null;
	prev_page?: number | null;
}

export interface PaginationResponse {
	total_page?: number;
	current_page?: number;
	limit?: number;
	links?: number[];
	next_page?: number | null;
	prev_page?: number | null;
}
