import { ChangeEvent } from 'react';
import startImg from './startButton.svg';

export default function AddButton({
  onImageAdd,
}: {
  onImageAdd: (event: ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <label
      className='flex items-center justify-center cursor-pointer w-screen'
      htmlFor='customFileAdd'
    >
      <input
        type='file'
        onChange={onImageAdd}
        className='opacity-0 absolute z-0 w-0 h-0'
        id='customFileAdd'
        accept='.png, .jpg, .jpeg'
      />
      <img src={startImg} alt='' className='w-32 h-auto z-1' />
    </label>
  );
}
