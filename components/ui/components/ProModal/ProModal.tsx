import React, {
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
} from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';

export const ProModal = React.forwardRef<
  Record<'handleClose' | 'handleOpen', CallableFunction>,
  PropsWithChildren<Omit<ModalProps, 'open'>>
>((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open, setOpen]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [open, setOpen]);

  useImperativeHandle(
    ref,
    () => ({
      handleOpen,
      handleClose,
    }),
    [open, setOpen],
  );

  return (
    <Modal open={open} {...props}>
      {props.children}
    </Modal>
  );
});
