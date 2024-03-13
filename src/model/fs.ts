import { computed } from 'mobx';
import { idProp, model, Model, modelAction, prop } from 'mobx-keystone';

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
  setName(n: string) {
    this.name = n;
    return n;
  }

  @computed
  get isRoot() {
    return this.parent === this;
  }
  @computed
  get countChildren() {
    return this.children.length;
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
  removeChild(child: Folder) {
    if (child === this) {
      return;
    }
    if (child.parent === this) {
      this.children = this.children.filter((c) => c !== child);
    }
  }
}

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

@model('app/FileStore')
export class FileStore extends Model({
  root: prop<Folder>(),
  uploadTo: prop<Folder>(),
  images: prop<ImageItem[]>(() => []),
}) {
  @modelAction
  setUploadToFolder(fld: Folder) {
    if (!belongsTo(fld, this.root)) {
      throw new Error('Folder not in root');
    }
    this.uploadTo = fld;
  }

  @modelAction
  addImage(data: string) {
    const img = new ImageItem({
      createdAt: Date.now(),
      folderId: this.uploadTo.id,
      data,
    });
    this.images.push(img);
  }
}
