import { ImagePath } from './imagePath.type';
import { TokenResetPassword, TokenUser, TokenVerifyAccount } from './token.type';

declare module 'express-serve-static-core' {
	interface Request {
		uploadPath?: ImagePath;
		file?: Express.Multer.File;
		user?: TokenUser | TokenResetPassword | TokenVerifyAccount;
	}
}
