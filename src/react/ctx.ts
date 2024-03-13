import { createContext } from 'react';
import { FileStore, Folder } from '../model/fs';

export const createDefaultFS_ = () => {
  const rootFolder = new Folder({ name: 'root', parent: null });
  const defaultFolder = new Folder({
    name: 'Untitled folder',
    parent: rootFolder,
  });
  return new FileStore({
    root: rootFolder,
    uploadTo: defaultFolder,
    images: [],
  });
};
export const createDefaultFS = () =>
  new FileStore({
    root: new Folder({ name: 'root', parent: null }),
    uploadTo: new Folder({ name: 'Untitled folder', parent: null }),
    images: [],
  });

export const FSContext = createContext<FileStore>(createDefaultFS());
