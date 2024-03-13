import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { FSContext } from '../react/ctx';
import { Folder } from '../model/fs';

export const FolderItem = observer((props: { folder: Folder; idx: number }) => {
  const [isEditable, setEditable] = useState(false);
  const [name, setName] = useState(props.folder.name);
  const fs = useContext(FSContext);
  const onClick = () => fs.setUploadTo(props.folder);
  const isChecked = fs.uploadToId === props.folder.id;
  return (
    <div>
      {isChecked ? '→' : '･'}
      {isEditable ? (
        <div>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              setEditable(false);
              props.folder.rename(name);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <p>
          props.folder.name{' '}
          <button onClick={() => setEditable(true)}>Edit</button>
        </p>
      )}
      <button onClick={onClick}>Set upload to</button>
    </div>
  );
});
