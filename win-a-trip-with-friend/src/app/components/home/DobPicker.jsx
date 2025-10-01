// DOBReactDatepicker.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function DobPicker({ setFormData }) {
  const [date, setDate] = useState(null);
  const today = new Date();

  function handle(d) {
    setDate(d);
    if (d) {
      const convertedDate = format(d, "dd/MM/yyyy")
      setFormData((prev) => ({
        ...prev,
        ['dob']: convertedDate,
      }));
    }

  }

  return (
    <div>
      <label className=" flex w-full bg-white">
        <DatePicker
          selected={date}
          name="dob"
          onChange={handle}
          maxDate={today}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="Date of Birth"
          className=" w-full outline-none placeholder:text-[15px] placeholder:text-red-600 placeholder:font-bold text-sm rounded-md md:p-1.5 p-2.5"
          dateFormat="dd/MM/yyyy"
          required
        />
      </label>
    </div>
  );
}
