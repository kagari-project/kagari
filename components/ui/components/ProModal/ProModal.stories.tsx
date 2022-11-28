import React, { useRef } from 'react';
import { ProModal } from './ProModal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default {
  title: 'ProModal',
  component: ProModal,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Default() {
  const ref = useRef<any>();
  const handleClick = () => {
    ref.current.handleOpen();
  };
  const handleClose = () => {
    ref.current.handleClose();
  };
  return (
    <>
      <Button onClick={handleClick}>open me</Button>
      <ProModal ref={ref} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </ProModal>
    </>
  );
}
