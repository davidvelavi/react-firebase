import React, { useState } from 'react';
import './Overtime.scss';
import moment from 'moment';
import TimerPicker from '../TimePicker/TimerPicker';

const startTimeInitial = { hours: '00', minutes: '00' };
const endTimeInitial = { hours: '00', minutes: '00' };

const Overtime = ({ command, description }) => {
  const [startTime, setStartTime] = useState(startTimeInitial);
  const [endTime, setEndTime] = useState(endTimeInitial);

  const calculateStartTime = (hours, minutes) => {
    return { hours, minutes };
  };

  const calculateEndTime = (hours, minutes) => {
    return { hours, minutes };
  };

  const handleStartingTimerPicker = (timeHours, timeMinutes) => {
    if (timeHours !== '00' || timeMinutes !== '00') {
      setStartTime(calculateStartTime(timeHours, timeMinutes));
    }
  };

  const handleEndingTimerPicker = (timeHours, timeMinutes) => {
    if (timeHours !== '00' || timeMinutes !== '00') {
      setEndTime(calculateEndTime(timeHours, timeMinutes));
    }
  };

  const resetTimerPickers = () => {
    setStartTime(startTimeInitial);
    setEndTime(endTimeInitial);
  };

  return (
    <div className='overtime'>
      <section className='overtime-header'>
        <p className='overtime-header-command'>
          {command}
        </p>
        <p className='overtime-header-description'>
          {description}
        </p>
      </section>
      <section className='overtime-timers'>
        <div className='overtime-timer'>
          <TimerPicker
            hours={startTime.hours}
            minutes={startTime.minutes}
            title='Set your start time'
            onTimePickerChanged={handleStartingTimerPicker}
          />
        </div>

        <div className='overtime-timer'>
          <TimerPicker
            hours={endTime.hours}
            minutes={endTime.minutes}
            title='Set your end time'
            onTimePickerChanged={handleEndingTimerPicker}
          />
        </div>

      </section>
      <button onClick={resetTimerPickers} type='button'> Submit  </button>

    </div>
  );
};

export default Overtime;
