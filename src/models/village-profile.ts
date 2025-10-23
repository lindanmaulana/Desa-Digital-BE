import { Decimal } from "@prisma/client/runtime/library.js";

export interface VillageProfileResponse {
	id: string;
	thumbnail: string;
	name: string;
	about: string;
	headman: string;
	people: number;
	agricultural_area: Decimal;
	total_area: Decimal;

	created_at: Date;
	updated_at: Date;
}

export interface CreateVillageProfileRequest {
	thumbnail: string;
	name: string;
	about: string;
	headman: string;
	people: number;
	agricultural_area: number;
	total_area: number;
}

export interface UpdateVillageProfileRequest {
	thumbnail?: string;
	name?: string;
	about?: string;
	headman?: string;
	people?: number;
	agricultural_area?: number;
	total_area?: number;
}
