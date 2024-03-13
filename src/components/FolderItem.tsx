import { Folder } from '../model/fs';

export const FolderItem = (props: {
  checkedId: string;
  folder: Folder;
  onChange: (folder: Folder) => void;
}) => {
  return (
    <div>
      <div>
        <input
          type='checkbox'
          checked={props.folder.id === props.checkedId}
          onChange={() => props.onChange(props.folder)}
        />
        {props.folder.name}
      </div>

      <ul>
        {props.folder.children.map((f) => (
          <li key={f.id}>
            <FolderItem
              folder={f}
              checkedId={props.checkedId}
              onChange={props.onChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
