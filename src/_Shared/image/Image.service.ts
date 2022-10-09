import { ImageType } from "./ImageType.enum";

export class ImageService {
  getPath(imageType: ImageType, value: string) {
    return `${process.env.PUBLIC_URL}/images/${imageType}s/${value}`;
  }
}