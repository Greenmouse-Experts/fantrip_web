import { FC } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';

interface Props {
  title: string;
  shouldShow: boolean;
  onClose: () => void;
  children: JSX.Element;
}
export const ComponentModal: FC<Props> = ({
  shouldShow,
  onClose,
  children,
  title,
}) => {
  return shouldShow ? (
    <div
      className="fixed top-0 left-0 flex items-center justify-center z-[3000] h-full w-full bg-black/40 overflow-auto"
      onClick={onClose}
    >
      <div
        className="w-3/4 [@media(min-width:1410px)]:w-[60%] p-5 bg-white rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center">
          <p className="fw-500 lg:text-2xl text-center w-full">{title}</p>
          <button className="text-xl" onClick={onClose}>
            <LiaTimesSolid />
          </button>
        </div>
        {children}
      </div>
    </div>
  ) : null;
};