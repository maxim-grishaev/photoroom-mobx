import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { FSContext } from '../react/ctx';
import { Folder } from '../model/fs';

export const FolderItem = observer((props: { folder: Folder; idx: number }) => {
  const [isEditable, setEditable] = useState(false);
  const [name, setName] = useState(props.folder.name);
  const fs = useContext(FSContext);

  const onCreateChild = () => {
    const name = `Untitled @ ${props.folder.id} ${fs.getChildrenOf(props.folder.id).length + 1}`;
    fs.createFolder(name, props.folder.id);
  };

  return (
    <div>
      {isEditable ? (
        <div>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='shadow appearance-none border rounded py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          <button
            onClick={() => {
              setEditable(false);
              props.folder.rename(name);
            }}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          {props.folder.name}{' '}
          <button
            className='bg-white border hover:bg-gray-200 hover:shadow font-bold py-1 px-2 rounded'
            onClick={() => setEditable(true)}
          >
            Edit
          </button>{' '}
          {fs.uploadToId === props.folder.id ? (
            <div className='text-gray-500 text-sm'>
              Images are uploaded in this folder
            </div>
          ) : (
            <button
              className='bg-white border hover:bg-gray-200 hover:shadow font-bold py-1 px-2 rounded'
              onClick={() => fs.setUploadTo(props.folder)}
            >
              Upload here
            </button>
          )}{' '}
          <button
            className='bg-white border hover:bg-gray-200 hover:shadow font-bold py-1 px-2 rounded'
            onClick={onCreateChild}
          >
            Create child folder
          </button>
        </div>
      )}
    </div>
  );
});
