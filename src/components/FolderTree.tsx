import { Folder } from '../model/fs';

export const FolderTree = (props: {
  folder: Folder;
  index: number;
  render: (folder: Folder, idx: number) => React.ReactNode;
}) => {
  return (
    <div>
      <div>{props.render(props.folder, props.index)}</div>
      {props.folder.children.length > 0 && (
        <ul>
          {props.folder.children.map((f, idx) => (
            <li key={f.id}>
              <FolderTree folder={f} index={idx} render={props.render} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
