import { Folder } from '../model/fs';

export const belongsTo = (fld: Folder, root: Folder) => {
  let p: Folder | null = fld;
  while (p) {
    if (!p.parent || p === p.parent) {
      return p === root;
    }
    p = p.parent;
  }
  return false;
};
