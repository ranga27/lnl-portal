import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { storageRootUrl } from '../components/data/constants';

// eslint-disable-next-line import/prefer-default-export
export const uploadFile = async (file, fileName, folderName) => {
  const fileExtension =
    // eslint-disable-next-line no-nested-ternary
    file.type === 'image/png'
      ? '.png'
      : file.type === 'image/jpeg'
      ? '.jpg'
      : '';
  // TODO: check if file exists
  const storage = getStorage();
  const filePath = `${folderName}/${fileName}${fileExtension}`;
  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, file);
  return storageRootUrl + filePath;
};
