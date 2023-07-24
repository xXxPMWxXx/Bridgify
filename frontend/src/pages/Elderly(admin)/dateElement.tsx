import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


type DateChangeCallback = (newDate: Dayjs | null) => void;

interface BasicDatePickerProps {
  onDateChange: DateChangeCallback;
}
export default function BasicDatePicker({onDateChange}: BasicDatePickerProps) {
  const [dob, setDob] = React.useState<Dayjs | null>(dayjs('1980-01-01'));
  React.useEffect(() => {
    onDateChange(dob);
  }, [dob]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Date of Birth" format="DD/MM/YYYY" defaultValue={dayjs('1980-01-01')} disableFuture
        onChange={(newValue) => { setDob(newValue) }}/>
    </LocalizationProvider>
  );

}