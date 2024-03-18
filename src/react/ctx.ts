import { createContext } from 'react';
import { FileStore } from '../model/fs';

export const createDefaultFS = () => {
  return new FileStore({
    rootName: 'Untitled Folder',
    images: [],
  });
};

export const FSContext = createContext<FileStore>(createDefaultFS());
