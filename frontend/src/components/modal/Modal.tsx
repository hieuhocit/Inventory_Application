import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { useEffect, useRef } from 'react';

import { IoCloseOutline } from 'react-icons/io5';

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: (ref: HTMLDialogElement) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    modal?.showModal();
    // return () => {
    //   modal?.close();
    // };
  }, []);

  function handleClose() {
    onClose(dialogRef.current as HTMLDialogElement);
  }

  return createPortal(
    <dialog
      open={false}
      className={styles.modal}
      ref={dialogRef}
      onClose={handleClose}
    >
      <IoCloseOutline onClick={handleClose} className={styles.iconClose} />
      {children}
    </dialog>,
    document.getElementById('modal') as HTMLDivElement
  );
}
