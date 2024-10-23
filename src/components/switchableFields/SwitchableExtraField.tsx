import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

function SwitchableExtraField(editing: boolean, fieldName: string, defaultValue: string, onChange: (value: string) => void) {
  if (editing) {
    return (
      <Stack direction="row" spacing={2}>
        <TextField label="key" defaultValue={fieldName} disabled />
        <TextField label="value" defaultValue={defaultValue} onChange={(e) => onChange(e.target.value)} />
      </Stack>
    );
  } else {
    return <ListItemText primary={fieldName} secondary={defaultValue} />;
  }
}

export default SwitchableExtraField;
