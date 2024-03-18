import { observer } from 'mobx-react-lite';
import { Folder } from '../model/fs';

export const FolderTree = observer(
  (props: {
    folder: Folder;
    index: number;
    render: (folder: Folder, idx: number) => React.ReactNode;
    getChildrenOf: (id: string) => Folder[];
  }) => (
    <>
      <div>{props.render(props.folder, props.index)}</div>
      {props.getChildrenOf(props.folder.id).length > 0 && (
        <ul className='space-y-1 list-disc list-inside'>
          {props.getChildrenOf(props.folder.id).map((f, idx) => (
            <li key={f.id}>
              <FolderTree
                folder={f}
                index={idx}
                render={props.render}
                getChildrenOf={props.getChildrenOf}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  ),
);
