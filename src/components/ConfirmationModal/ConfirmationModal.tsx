import { Button, Typography } from '@mui/material';
import { StyledBox, StyledModal } from './ConfirmationModal.styled';

interface IConfirmationModal {
  openConfirmationModal: boolean;
  setOpenConfirmationModal: (open: boolean) => void;
}

export const ConfirmationModal = ({
  openConfirmationModal,
  setOpenConfirmationModal,
}: IConfirmationModal) => {
  const handleClose = () => {
    setOpenConfirmationModal(false);
  };

  return (
    <StyledModal open={openConfirmationModal} onClose={handleClose}>
      <StyledBox>
        <Typography>Are you sure that you want to delete?</Typography>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="warning">
          Delete
        </Button>
      </StyledBox>
    </StyledModal>
  );
};
