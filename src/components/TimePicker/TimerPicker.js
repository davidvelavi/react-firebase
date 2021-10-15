import React, { useState, useRef, useEffect } from 'react';
import './TimerPicker.scss';

const TimerPicker = ({
  title,
  hours = '00',
  minutes = '00',
  disabled = false,
  hourTitle = 'Hour', minutesTitle = 'Minutes', onTimePickerChanged = () => {} }) => {
  const [timeHours, setTimeHours] = useState(hours);
  const [timeMinutes, setTimeMinutes] = useState(minutes);

  const hoursInput = useRef(null);
  const minutesInput = useRef(null);

  const replaceNotNumbers = (value) => {
    return value.replace(/[^0-9]+/g, '');
  };
  const fillingInput = (value) => {
    return (value.length === 1) ?
      `0${value}` :
      value.slice(1, 3);
  };

  const getHoursStep = (value) => {
    const step = 'continue';
    return {
      [value.match(/0[3-9]/)]: { step: 'nextInput', value },
      [value.match(/24/)]: { step: 'nextInput', value: '23' },
      [value.match(/[1-2][0-9]/)]: { step: 'nextInput', value },
    }[value] || { step, value };
  };

  const handleHours = (value) => {
    const { step, value: _value } = getHoursStep(value);
    setTimeHours(_value);
    if (step === 'nextInput') {
      minutesInput.current.focus();
    }
  };

  const getMinutesStep = (value) => {
    const step = 'continue';
    return {
      [value.match(/[6-9][10-99]/)]: { step: 'stop', value: timeMinutes },
    }[value] || { step, value };

  };

  const handleMinutes = (value) => {
    const { step, value: _value } = getMinutesStep(value);
    if (step === 'continue') {
      setTimeMinutes(_value);
    }
  };

  const handleInput = ({ target }) => {
    const { name: typeInput } = target;
    const value = fillingInput(replaceNotNumbers(target.value));
    const timeHandlers = {
      hours: handleHours,
      minutes: handleMinutes,
    }[typeInput];
    timeHandlers(value);
  };

  const handleFocus = ({ target }) => {
    target.setSelectionRange(0, 3);
    target.select();
  };

  useEffect(() => {
    onTimePickerChanged(timeHours, timeMinutes);
  }, [timeHours, timeMinutes]);

  useEffect(() => {
    setTimeHours(hours);
    setTimeMinutes(minutes);
  }, [hours, minutes]);

  return (
    <section className='timer-picker'>
      <p className='timer-picker-title'>{title}</p>
      <section className='timer-picker-inputs'>
        <section className='timer-picker-input-wrapper'>
          <p className='timer-picker-input-title'>
            {hourTitle}
          </p>
          <input
            name='hours'
            type='text'
            className='timer-picker-input'
            value={timeHours}
            onInput={handleInput}
            onFocus={handleFocus}
            onClick={handleFocus}
            ref={hoursInput}
            disabled={disabled}
          />
        </section>

        <section className='timer-picker-input-wrapper'>
          <p className='timer-picker-input-title'>
            {minutesTitle}
          </p>
          <input
            name='minutes'
            type='text'
            className='timer-picker-input'
            value={timeMinutes}
            onInput={handleInput}
            onFocus={handleFocus}
            onClick={handleFocus}
            ref={minutesInput}
            disabled={disabled}
          />
        </section>

      </section>
    </section>
  );
};

export default TimerPicker;
