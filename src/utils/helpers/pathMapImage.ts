import { Entity } from "@prisma/client";

export const PATH_MAP_IMAGE = {
	[Entity.PROFILE]: Entity.PROFILE.toLowerCase(),
	[Entity.USER]: Entity.USER.toLowerCase(),
	[Entity.SOCIAL_ASSISTANCE]: "social-assistance",
	[Entity.SOCIAL_ASSISTANCE_RECIPIENT]: "social-assistance-recipient",
	[Entity.EVENT]: Entity.EVENT.toLowerCase(),
	[Entity.DEVELOPMENT]: Entity.DEVELOPMENT.toLowerCase(),
};
