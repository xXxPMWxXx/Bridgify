import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


type DateChangeCallback = (newDate: Dayjs | null) => void;

interface BasicDatePickerProps {
  onDateChange: DateChangeCallback;
  value: Dayjs | null; // Add a value prop to control the DatePicker value from the parent component
  resetValue: Dayjs | null; // Add a resetValue prop to reset the DatePicker value from the parent component
}

export default function BasicDatePicker({ onDateChange, value, resetValue }: BasicDatePickerProps) {
  // Remove the useEffect block that sets dob and the second useEffect for resetValue

  const handleDatePickerChange = (newValue: Dayjs | null) => {
    onDateChange(newValue); // Call the parent's onDateChange prop directly here
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date of Birth"
        format="DD/MM/YYYY"
        value={value} // Use the value prop directly here
        disableFuture
        onChange={handleDatePickerChange} // Use the local handler
      />
    </LocalizationProvider>
  );
}





