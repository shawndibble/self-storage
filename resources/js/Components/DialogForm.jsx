import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function DialogForm({
  title, children, open, ...other
}) {
  return (
    <Dialog
      maxWidth="sm"
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}

DialogForm.defaultProps = {
  title: '',
};

DialogForm.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};
