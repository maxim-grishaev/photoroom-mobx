import {
  action,
  computed,
  makeObservable,
  observable,
  onReactionError,
} from 'mobx';
import { belongsTo } from '../lib/belongsTo';

export class ImageItem {
  readonly id = (Math.random() + Date.now()).toString(36);
  readonly createdAt = Date.now();
  @observable folderId: string;
  @observable dataURI: string;

  constructor(data: { folderId: string; dataURI: string }) {
    makeObservable(this);
    this.folderId = data.folderId;
    this.dataURI = data.dataURI;
  }

  @action
  moveToFolder(fld: Folder) {
    this.folderId = fld.id;
  }
}

export class Folder {
  readonly id = (Math.random() + Date.now()).toString(36);
  @observable name: string;
  @observable parentId: string | null = null;
  // @observable children: Folder[];

  constructor(data: {
    name: string;
    parentId?: string | null;
    // children?: Folder[]
  }) {
    makeObservable(this);
    this.name = data.name;
    this.parentId = data.parentId ?? null;
    // this.children = data.children ?? [];
  }

  @action
  rename(n: string) {
    this.name = n;
  }

  @action
  setName(n: string) {
    this.name = n;
    return n;
  }

  @action
  setParentId(parentId: string | null) {
    if (parentId === this.parentId) {
      return;
    }
    this.parentId = parentId;
  }
}

interface FolderTree {
  folder: Folder;
  children: FolderTree[];
}

export class FileStore {
  @observable uploadToId: string;
  @observable images: ImageItem[] = [];
  @observable rootId: string;
  @observable byId = new Map<string, Folder>();

  constructor(data: { rootName: string; images: ImageItem[] }) {
    makeObservable(this);
    const root = new Folder({ name: data.rootName });
    this.rootId = root.id;
    this.byId.set(root.id, root);
    this.uploadToId = root.id;
    this.images = data.images;
  }

  // @action
  // hydrate(byId: Map<string, Folder>) {
  //   this.byId = byId;
  // })

  getFolderById(fldId: string) {
    return this.byId.get(fldId);
  }

  getChildrenOf(fldId: string) {
    return Array.from(this.byId.values()).filter((f) => f.parentId === fldId);
  }

  @computed
  get rootTree() {
    return this.getNestedChildTree(this.rootId);
  }

  getNestedChildTree(fldId: string): FolderTree {
    const fld = this.byId.get(fldId);
    if (!fld) {
      throw new Error(`Invariant: folder id "${fldId}" not found`);
    }
    return {
      folder: fld,
      children: this.getChildrenOf(fldId).map((f) =>
        this.getNestedChildTree(f.id),
      ),
    };
  }

  @action
  createFolder(name: string, parentId: string) {
    console.log('createFolder', name, parentId);
    if (!this.byId.has(parentId)) {
      throw new Error(`Parent id "${parentId}" not found`);
    }
    const fld = new Folder({ name, parentId });
    this.byId.set(fld.id, fld);
    return fld;
  }

  @computed
  get uploadTo() {
    const fld = this.byId.get(this.uploadToId);
    if (!fld) {
      throw new Error(`Invariant: uploadToId ${this.uploadToId} is missing`);
    }
    return fld;
  }

  @computed
  get root() {
    const fld = this.byId.get(this.rootId);
    if (!fld) {
      throw new Error(`Invariant: rootId ${this.rootId} is missing`);
    }
    return fld;
  }

  @action
  setUploadTo(fld: Folder) {
    if (
      !belongsTo(
        fld,
        (fld) => fld.id === this.rootId,
        (f) => (f.parentId === null ? null : this.byId.get(f.parentId) ?? null),
      )
    ) {
      return;
    }
    this.uploadToId = fld.id;
  }

  @action
  addImage(data: string) {
    const img = new ImageItem({
      folderId: this.uploadToId,
      dataURI: data,
    });
    this.images.push(img);
  }
}

onReactionError((err) => {
  console.error(err);
});
