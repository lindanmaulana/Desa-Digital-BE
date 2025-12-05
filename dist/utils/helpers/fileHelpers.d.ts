import { ImagePath } from "../../types/imagePath.type";
declare const getFullPath: (rootName: ImagePath, fileName: string) => string;
declare const fileExists: (rootName: ImagePath, fileName: string) => Promise<string | null>;
declare const deleteImage: (rootName: ImagePath, fileName: string) => Promise<boolean>;
export { deleteImage, fileExists, getFullPath };
//# sourceMappingURL=fileHelpers.d.ts.map