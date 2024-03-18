import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { FSContext } from '../react/ctx';

export const ImageList = observer(() => {
  const fs = useContext(FSContext);
  return fs.images.length === 0 ? (
    <div>No images yet</div>
  ) : (
    <div>
      <h2>Images</h2>
      <ul>
        {fs.images.map((image) => (
          <li key={image.id}>
            <div className='flex items-center justify-center w-screen'>
              <img
                src={image.dataURI}
                className='block w-80'
                alt='result from the API'
              />
              <br />
              {new Date(image.createdAt).toISOString()} at{' '}
              {fs.getFolderById(image.folderId)?.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
