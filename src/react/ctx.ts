import { createContext } from 'react';
import { FileStore, Folder } from '../model/fs';

export const createDefaultFS = () => {
  const root = new Folder({ name: 'Untitled Folder', parent: null });
  return new FileStore({
    root,
    uploadToId: root.id,
    images: [],
  });
};

export const FSContext = createContext<FileStore>(createDefaultFS());
