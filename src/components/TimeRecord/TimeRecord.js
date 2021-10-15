import React from 'react';
import TimeDetail from '../TimeDetail/TimeDetail';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import './TimeRecord.scss';

const TimeRecord = ({ records }) => {
  const menuOptions = [{
    id: '0001',
    icon: 'iconito',
    text: 'Edit RegularTime',
  },
  {
    id: '0002',
    icon: 'iconito',
    text: 'Edit Overtime',
  },
  {
    id: '0003',
    icon: 'iconito',
    text: 'Delete',
    type: 'alert',
  }];
  const handleMenu = (item) => {
    console.log('TimeRecord - menu', item);
  };

  return (
    <div className='time-record'>
      <div className='time-record-details'>
        {
          records && records.map((record) => (
            <div className='time-record-detail'>
              <TimeDetail key={record.id} timeDetail={record} />
            </div>
          ))
        }
      </div>
      <div className='time-record-menu'>
        <DropDownMenu options={menuOptions} optionSelected={handleMenu} />
      </div>
    </div>
  );
};

export default TimeRecord;
