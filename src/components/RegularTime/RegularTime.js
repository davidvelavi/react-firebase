import React, { useState } from 'react';
import './RegularTime.scss';
import moment from 'moment';
import TimerPicker from '../TimePicker/TimerPicker';
import { contractRules } from './bussinesRules';

const startedTimeInitial = { hours: '00', minutes: '00' };
const estimatedEndTimeInitial = { hours: '00', minutes: '00' };
const estimatedBreakTimeInitial = { from: { hours: '00', minutes: '00' }, to: { hours: '00', minutes: '00' } };

const RegularTime = ({ command, description, contractType = 'ts-mon-fri-8-hours-day' }) => {
  const BREAK_TIME = contractRules[contractType];
  const WORKDAY = Number(contractType.match(/\d+/)[0]);
  const STARTING_BREAK_TIME = Math.ceil(WORKDAY / 2);

  const [startedTime, setStartedTime] = useState(startedTimeInitial);
  const [estimatedEndTime, setEstimatedEndTime] = useState(estimatedEndTimeInitial);
  const [estimatedBreakTime, setEstimatedBreakTime] = useState(estimatedBreakTimeInitial);

  const calculateHours = (hours, addition) => {
    return moment().hour(hours).add(addition, 'hours').format('HH');
  };

  const calculateEstimatedBreakTime = (hours, minutes) => {
    return {
      from: {
        hours: calculateHours(hours, STARTING_BREAK_TIME),
        minutes,
      },
      to: {
        hours: calculateHours(hours, STARTING_BREAK_TIME + 1),
        minutes,
      },
    };
  };

  const calculateEstimatedEndTime = (hours, minutes) => {
    return {
      hours: calculateHours(hours, WORKDAY + BREAK_TIME),
      minutes,
    };
  };

  const handleTimerPicker = (timeHours, timeMinutes) => {
    if (timeHours !== '00' || timeMinutes !== '00') {
      setStartedTime({
        hours: calculateHours(timeHours, 0),
        minutes: timeMinutes,
      });

      if (BREAK_TIME) {
        setEstimatedBreakTime(calculateEstimatedBreakTime(timeHours, timeMinutes));
      }

      setEstimatedEndTime(calculateEstimatedEndTime(timeHours, timeMinutes));

    }
  };

  const resetTimerPickers = () => {
    setEstimatedEndTime(estimatedEndTimeInitial);
    setStartedTime(startedTimeInitial);
    if (BREAK_TIME) {
      setEstimatedBreakTime(estimatedBreakTimeInitial);
    }
  };

  return (
    <div className='regular-time'>
      <section className='regular-time-header'>
        <p className='regular-time-header-command'>
          {command}
        </p>
        <p className='regular-time-header-description'>
          {description}
        </p>
      </section>
      <section className='regular-time-timers'>
        <div className='regular-time-timer'>
          <TimerPicker
            hours={startedTime.hours}
            minutes={startedTime.minutes}
            title='Set your start time'
            onTimePickerChanged={handleTimerPicker}
          />
        </div>

        {
          BREAK_TIME === 0 ?
            ('') :
            (
              <div className='regular-time-timer regular-time-timer--correlated '>
                <TimerPicker
                  hours={estimatedBreakTime.from.hours}
                  minutes={estimatedBreakTime.from.minutes}
                  title='Estimated break time'
                  hourTitle='From:'
                  minutesTitle=' '
                  disabled
                />
                ----
                <TimerPicker
                  hours={estimatedBreakTime.to.hours}
                  minutes={estimatedBreakTime.to.minutes}
                  title=' '
                  hourTitle='To:'
                  minutesTitle=' '
                  disabled
                />
              </div>
            )
        }

        <div className='regular-time-timer'>
          <TimerPicker
            hours={estimatedEndTime.hours}
            minutes={estimatedEndTime.minutes}
            title='Estimated end time'
            disabled
          />
        </div>

      </section>
      <button onClick={resetTimerPickers} type='button'> Submit  </button>
    </div>
  );
};

export default RegularTime;
