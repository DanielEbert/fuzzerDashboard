import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import React, { useState } from 'react';
import Select from 'react-select';
import Datepicker from 'react-tailwindcss-datepicker';

const subsystems = [
  { value: 'subsys-ussper', label: 'subsys-ussper' },
  { value: 'subsys-ccp', label: 'subsys-ccp' },
  { value: 'subsys-psd', label: 'subsys-psd' },
];

function SearchSelect({ heading }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <h1>{heading}:</h1>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={subsystems}
        isMulti={true}
      />
    </div>
  );
}

function Main() {
  // TODO: conver to epoch
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const onDateRangeChanged = (newValue) => {
    console.log('newValue:', newValue);
    setDateRange(newValue);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    const values = [...event.target.selectedOptions].map(
      (options) => options.value
    );
    setSelectedOptions(values);
  };

  return (
    <div className="min-h-screen prose">
      <div className="grid grid-cols-3 gap-4">
        <SearchSelect heading="Subsystem" />
        <SearchSelect heading="Runnable" />
        <SearchSelect heading="Severity" />
        <SearchSelect />
        <SearchSelect />
      </div>
      <h1 className="bg-gray-500 text-center text-white">
        Hi Tailwind has been integrated.
      </h1>
      <Datepicker
        value={dateRange}
        onChange={onDateRangeChanged}
        showShortcuts={true}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
