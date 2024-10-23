import React from 'react';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';

function SwitchableField(
  editing: boolean,
  fieldName: string,
  defaultValue: string,
  onChange: (value: string) => void,
  multiline = false,
) {
  if (editing) {
    return (
      <TextField
        label={fieldName}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        multiline={multiline}
        rows={multiline ? 3 : undefined}
      />
    );
  } else {
    return <ListItemText primary={fieldName} secondary={defaultValue} />;
  }
}

export default SwitchableField;
