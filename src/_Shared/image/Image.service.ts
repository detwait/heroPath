import { ImageType } from './ImageType.enum';

class ImageService {
  getPath(imageType: ImageType, value: string) {
    return `${process.env.PUBLIC_URL}/images/${imageType}s/${value}`;
  }
}

export const imageService = new ImageService();
