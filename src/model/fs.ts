import { computed } from 'mobx';
import { idProp, model, Model, modelAction, prop } from 'mobx-keystone';
import { belongsTo } from '../lib/belongsTo';

@model('fs/file/Image')
export class ImageItem extends Model({
  id: idProp,
  folderId: prop<string>(),
  createdAt: prop<number>(),
  data: prop<string>(),
}) {
  @modelAction
  moveToFolder(fld: Folder) {
    this.folderId = fld.id;
  }
}

@model('fs/Folder')
export class Folder extends Model({
  id: idProp,
  name: prop<string>('Untitled folder'),
  children: prop<Folder[]>(() => [] as Folder[]),
  parent: prop<Folder | null>(),
}) {
  protected onInit(): void {
    if (this.parent) {
      this.parent.addChild(this);
    }
  }

  @modelAction
  rename(n: string) {
    this.name = n;
  }

  @modelAction
  setName(n: string) {
    this.name = n;
    return n;
  }

  @computed
  get isRoot() {
    return this.parent === this;
  }

  @modelAction
  addChild(fld: Folder) {
    console.log('addChild', fld);
    if (fld === this) {
      return;
    }
    fld.parent?.removeChild(fld);
    fld.parent = this;
    this.children.push(fld);
  }

  @modelAction
  getNestedChildById(id: string): Folder | undefined {
    return this.children.find((f) => f.id === id ?? f.getNestedChildById(id));
  }

  @modelAction
  removeChild(child: Folder) {
    if (child === this) {
      return;
    }
    if (child.parent === this) {
      this.children = this.children.filter((c) => c !== child);
    }
  }
}

@model('app/FileStore')
export class FileStore extends Model({
  root: prop<Folder>(),
  uploadToId: prop<string>(),
  images: prop<ImageItem[]>(() => []),
}) {
  protected onInit(): void {
    console.log('FileStore/onInit', this);
    this.uploadToId = this.root.id;
  }

  getUploadToFoolder() {
    const fld = this.root.getNestedChildById(this.uploadToId);
    if (!fld) {
      // throw new Error('uploadTo not found');
      return this.root;
    }
    return fld;
  }

  @modelAction
  setUploadTo(fld: Folder) {
    if (!belongsTo(fld, this.root)) {
      return;
    }
    this.uploadToId = fld.id;
  }

  @modelAction
  addImage(data: string) {
    const img = new ImageItem({
      createdAt: Date.now(),
      folderId: this.uploadToId,
      data,
    });
    this.images.push(img);
  }
}
