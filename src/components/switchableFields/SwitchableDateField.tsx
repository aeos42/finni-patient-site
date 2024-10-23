import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';



function SwitchableDateField(editing: boolean, fieldName: string, defaultValue: Date, onChange: (value: Date) => void) {

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const dateToString = (date: Date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  if (editing) {
    return <TextField InputLabelProps={{ shrink: true }} label={fieldName} defaultValue={dateToString(defaultValue)} type="date" onChange={(e) => onChange(new Date(e.target.value))} />
  } else {
    return <ListItemText primary={fieldName} secondary={formatDate(defaultValue)} />
  }
}

export default SwitchableDateField;
