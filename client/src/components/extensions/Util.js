import { errorImage } from '../../resources/errorImage';

export const bufferToImage = (buffer) => {
  try {
    return `data:image/jpg;base64,${Buffer.from(buffer).toString('base64')}`;
  } catch (error) {
    console.log('image error');
    return errorImage;
  }
};
