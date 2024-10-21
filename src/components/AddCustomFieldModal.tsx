import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface AddCustomFieldModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (key: string, value: string) => void;
}

const AddCustomFieldModal: React.FC<AddCustomFieldModalProps> = ({ open, onClose, onAdd }) => {
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  const handleAdd = () => {
    if (newFieldKey && newFieldValue) {
      onAdd(newFieldKey, newFieldValue);
      setNewFieldKey('');
      setNewFieldValue('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Custom Field</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Field Name"
          fullWidth
          value={newFieldKey}
          onChange={(e) => setNewFieldKey(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Field Value"
          fullWidth
          value={newFieldValue}
          onChange={(e) => setNewFieldValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomFieldModal;
