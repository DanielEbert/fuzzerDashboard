import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import Datepicker from 'react-tailwindcss-datepicker';

const input = {
  'subsys-ussper': {
    seg: [
      { id: 1, timestamp: 1692816653 },
      { id: 2, timestamp: 1692816653 },
      { id: 3, timestamp: 1692816653 },
    ],
    tri: [
      { id: 4, timestamp: 1692816653 },
      { id: 5, timestamp: 1692816653 },
      { id: 6, timestamp: 1692816653 },
    ],
  },
  'subsys-psd': {
    OCP: [
      { id: 7, timestamp: 1692816653 },
      { id: 8, timestamp: 1692816653 },
      { id: 9, timestamp: 1692816653 },
    ],
    OOC: [
      { id: 10, timestamp: 1692816653 },
      { id: 11, timestamp: 1692816653 },
      { id: 12, timestamp: 1692816653 },
    ],
  },
};

function SearchSelect({ className, heading, onChange, value, options }) {
  return (
    <div className={className}>
      <h1>{heading}:</h1>
      <Select
        className="text-gray-900"
        onChange={onChange}
        value={value}
        options={options}
        isMulti={true}
      />
    </div>
  );
}

const FINDING_TABLE_HEAD = ['Subsys', 'Runnable', 'Timestamp', ''];

function Main() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now()),
  });

  const onDateRangeChanged = (newValue) => {
    setDateRange({
      startDate: new Date(newValue.startDate),
      endDate: new Date(
        new Date(newValue.endDate).valueOf() + 24 * 60 * 60 * 1000
      ),
    });
  };

  const [selectedSubsystems, setSelectedSubsystems] = useState([]);
  const [selectedRunnables, setSelectedRunnables] = useState([]);

  const updateSelectedSubsystems = (s) => {
    setSelectedSubsystems(s);
    setSelectedRunnables([]);
  };

  const subsystems = useMemo(() => {
    return Object.keys(input).map((key) => {
      return { value: key, label: key };
    });
  }, [input]);

  const runnables = useMemo(() => {
    let runnable_options = [];
    for (let subsys of selectedSubsystems) {
      runnable_options = runnable_options.concat(
        Object.keys(input[subsys.value]).map((key) => {
          return { value: key, label: key };
        })
      );
    }
    return [...new Set(runnable_options)];
  }, [selectedSubsystems]);

  const findings = useMemo(() => {
    const startTimestamp = dateRange.startDate.valueOf() / 1000;
    const endTimestamp = dateRange.endDate.valueOf() / 1000;

    return selectedSubsystems.flatMap(({ value: subsys }) =>
      selectedRunnables
        .filter(({ value: runnable }) => runnable in input[subsys])
        .flatMap(({ value: runnable }) =>
          input[subsys][runnable]
            .filter(
              (finding) =>
                finding['timestamp'] >= startTimestamp &&
                finding['timestamp'] <= endTimestamp
            )
            .map((finding) => ({
              subsys,
              runnable,
              timestamp: finding['timestamp'],
            }))
        )
    );
  }, [selectedSubsystems, selectedRunnables, dateRange]);

  console.log(findings);

  return (
    <div className="min-h-screen prose">
      <div className="shadow-sm shadow-white p-2 mb-2">
        <div className="text-2xl">Fuzzing OneParking</div>
      </div>
      <div className="space-y-2 p-2">
        <div className="flex flex-wrap space-x-2">
          <div className="flex flex-col space-y-2">
            <SearchSelect
              className="flex-1"
              heading="Subsystem"
              onChange={(e) => {
                updateSelectedSubsystems(e);
              }}
              value={selectedSubsystems}
              options={subsystems}
            />
            <Datepicker
              value={dateRange}
              onChange={onDateRangeChanged}
              showShortcuts={true}
            />
          </div>
          <SearchSelect
            className="flex-1"
            heading="Runnable"
            onChange={setSelectedRunnables}
            value={selectedRunnables}
            options={runnables}
          />
        </div>
      </div>
      <div className="table-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {FINDING_TABLE_HEAD.map((head) => (
                <th key={head} className="border-b p-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {findings.map(({ subsys, runnable, timestamp }, index) => {
              const isLast = index === findings.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b';

              return (
                <tr key={name}>
                  <td className={classes}>{subsys}</td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    {runnable}
                  </td>
                  <td className={classes}>{timestamp}</td>
                  <td className={`${classes} bg-blue-gray-50/50`}>Edit</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
