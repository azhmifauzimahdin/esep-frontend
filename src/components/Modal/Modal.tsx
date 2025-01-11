import { FC, ReactNode, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

interface ModalProps {
  visible: boolean;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { children, visible, className, onClose } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, onClose ? onClose : () => console.log());

  return (
    <div
      className={`bg-slate-900/40 fixed top-0 right-0 w-screen h-screen ${
        visible ? "z-50" : "-z-10"
      }`}
    >
      <div
        ref={ref}
        className={`bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl transition-all duration-300 shadow w-10/12 sm:w-auto ${
          visible ? "scale-100" : "scale-50"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
