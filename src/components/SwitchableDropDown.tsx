import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemText
} from '@mui/material';

function SwitchableDropdown(editing: boolean, label: string, value: string, options: string[], onChange: (value: string) => void) {
  if (editing) {
    return (
      <FormControl fullWidth>
        <InputLabel id={`${label.toLowerCase()}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label.toLowerCase()}-label`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label={label}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else {
    return <ListItemText primary={label} secondary={value} />;
  }
}

export default SwitchableDropdown;
