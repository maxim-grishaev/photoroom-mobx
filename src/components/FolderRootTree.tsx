import { useContext } from 'react';
import { FSContext } from '../react/ctx';
import { FolderTree } from './FolderTree';
import { observer } from 'mobx-react-lite';
import { FolderItem } from './FolderItem';

export const FolderRootTree = observer(() => {
  const fs = useContext(FSContext);
  const uploadTo = fs.getUploadToFoolder();
  return (
    <>
      <div>Upload to: "{uploadTo.name}"</div>
      <FolderTree
        folder={fs.root}
        index={0}
        render={(folder, idx) => <FolderItem folder={folder} idx={idx} />}
      />
    </>
  );
});
