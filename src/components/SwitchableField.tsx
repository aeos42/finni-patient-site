import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';

function SwitchableField(editing: boolean, fieldName: string, defaultValue: string, onChange: (value: string) => void) {
  if (editing) {
    return <TextField label={fieldName} defaultValue={defaultValue} onChange={(e) => onChange(e.target.value)} />
  } else {
    return <ListItemText primary={fieldName} secondary={defaultValue} />
  }
}

export default SwitchableField;
