import { ChangeEvent, useContext, useState } from 'react';
import AddButton from './components/AddButton';
import { uploadImageToServer } from './model/uploadImageToServer';
import { observer } from 'mobx-react-lite';
import { FolderRootTree } from './components/FolderRootTree';
import { FSContext } from './react/ctx';
import { ImageList } from './components/ImageList';

export const App = observer(() => {
  const fs = useContext(FSContext);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLoading(true);
    if (file) {
      uploadImageToServer(file)
        .then((res) => fs.addImage(res))
        .catch((error) => {
          console.error(error);
        })
        .then(() => setLoading(false));
    } else {
      console.error('No file was picked');
    }
  };

  return (
    <div>
      <ImageList />
      {isLoading ? <h2>Loading...</h2> : <AddButton onImageAdd={onImageAdd} />}
      <FolderRootTree />
    </div>
  );
});
