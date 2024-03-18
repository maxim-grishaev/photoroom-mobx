export const belongsTo = <T extends NonNullable<unknown>>(
  fld: T,
  isFound: (fld: T) => boolean,
  getNext: (fld: T) => T | null,
) => {
  let p: T | null = fld;
  while (p) {
    const parent = getNext(p);
    if (!parent) {
      return false;
    }
    if (isFound(parent)) {
      return true;
    }
    p = parent;
  }
  return false;
};
