import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({ open, children, className = "", onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    if (open && modal) {
      modal.showModal();
    }
    return () => {
      if (modal) {
        modal.close();
      }
    };
  }, [open]);

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) {
    console.error("Modal root element not found");
    return null;
  }
 
  if (!open) return null;

  return createPortal(
    <dialog 
      ref={dialogRef} 
      className={`modal ${className}`} 
      onClose={onClose}
    >
      {children}
    </dialog>,
    modalRoot
  );
};

export default Modal;
