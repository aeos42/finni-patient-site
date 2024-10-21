import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';

function SwitchableExtraField(editing: boolean, fieldName: string, defaultValue: string, onChange: (value: string) => void) {
  if (editing) {
    return <>
      <TextField label={"key"} defaultValue={fieldName} disabled />
      <TextField label={"value"} defaultValue={defaultValue} onChange={(e) => onChange(e.target.value)} />
    </>
  } else {
    return <ListItemText primary={fieldName} secondary={defaultValue} />
  }
}

export default SwitchableExtraField;
