import { useState } from 'react';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function SwitchableExtraField(
  editing: boolean,
  fieldName: string,
  defaultValue: string,
  onChange: (value: string) => void,
  onMarkForDeletion: () => void,
) {
  const renderField = () => {
    if (editing) {
      return (
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField label="key" defaultValue={fieldName} disabled />
          <TextField label="value" defaultValue={defaultValue} onChange={(e) => onChange(e.target.value)} />
        </Stack>
      );
    } else {
      return <ListItemText primary={fieldName} secondary={defaultValue} />;
    }
  };

  return (
      <Stack direction="row" spacing={2} alignItems="center">
        {renderField()}
        <IconButton
          onClick={onMarkForDeletion}
          size="small"
        >
          {editing && <DeleteIcon/>}
        </IconButton>
      </Stack>
  );
}

export default SwitchableExtraField;
