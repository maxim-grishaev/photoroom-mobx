import loadImage, { LoadImageResult } from 'blueimp-load-image';
import { removeBg } from './removeBg';

export const uploadImageToServer = (file: File) =>
  loadImage(file, {
    maxWidth: 400,
    maxHeight: 400,
    canvas: true,
  }).then(async (imageData: LoadImageResult) => {
    const image = imageData.image as HTMLCanvasElement;
    const imageBase64 = image.toDataURL('image/png');
    return await removeBg(imageBase64);
  });
