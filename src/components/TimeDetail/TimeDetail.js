import React from 'react';
import './TimeDetail.scss';

const TimeDetail = ({ timeDetail = {} }) => {
  const { type, description } = timeDetail;
  const label = {
    'date': 'Date',
    'worked-time': 'Worked Time',
    'time-off': 'Time-off',
    'worked-hours': 'Worked Hours',
    'break': 'Break Time',
    'night': 'Night Hours',
    'suppl': 'Suppl Hours',
    'holiday': 'Holiday & weekend',
  }[type];

  return (
    <div className={`time-detail time-detail--${type}`}>
      <p className='time-detail-description'>
        {' '}
        {description}
        {' '}
      </p>
      <span className='time-detail-label'>
        {' '}
        {label}
      </span>
    </div>
  );
};

export default TimeDetail;
