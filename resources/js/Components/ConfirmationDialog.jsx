import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

export default function ConfirmationDialog({
  onClose, onConfirm, title, description, open, ...other
}) {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {description}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm()}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.defaultProps = {
  title: '',
};

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  description: PropTypes.node.isRequired,
  title: PropTypes.string,
};
