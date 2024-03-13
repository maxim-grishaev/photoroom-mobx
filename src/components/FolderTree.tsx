import { useContext } from 'react';
import { FSContext } from '../react/ctx';
import { FolderItem } from './FolderItem';
import { observer } from 'mobx-react-lite';

export const FolderTree = observer(() => {
  const fs = useContext(FSContext);
  console.log('FolderTree', fs);
  return (
    <>
      <div>Upload to: "{fs.uploadTo.name}"</div>
      <FolderItem
        folder={fs.uploadTo}
        checkedId={fs.uploadTo.id}
        onChange={fs.setUploadToFolder}
      />
    </>
  );
});
