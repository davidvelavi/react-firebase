import React, { useContext, useEffect, useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import firebaseConfig from '../firebaseConfig';
import AppContext from './ContextProvider';
import useAuthentication from '../hooks/useAuthentication';
import Header from '../components/Header';
import TypingText from '../components/TypingText';
import '../css/Apps.scss';
import TimerPicker from '../components/TimePicker/TimerPicker';
import DropDownMenu from '../components/DropDownMenu/DropDownMenu';
import TimeDetail from '../components/TimeDetail/TimeDetail';
import TimeRecord from '../components/TimeRecord/TimeRecord';
import Modal from '../components/Modal/Modal';
import Saludar from '../components/Saludar/Saludar';
import Requester from '../components/Requester/Requester';
import Tabs from '../components/Tabs/Tabs';
import RegularTime from '../components/RegularTime/RegularTime';
import Overtime from '../components/Overtime/Overtime';

const App = () => {
  const ref = useRef(null);

  const firebase = initializeApp(firebaseConfig);
  //const { dispatch, store  } = useContext(AppContext);
  const { loginWithGoogle, logOut, user, authenticationError } = useAuthentication(firebase);

  //const functions = getFunctions(firebase);

  /*const helloWorld = httpsCallable(functions, 'helloWorld');
  helloWorld()
    .then((result) => {
      console.log('holaaa');
    });*/

  const handleLogin = () => {
    loginWithGoogle();
  };

  const handleLogout = () => {
    logOut();
  };

  const options = [{
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

  const optionSelected = (option) => {
    console.log(option);
  };
  const timeDetail = {
    type: 'night',
    description: '2:30',
  };
  const records = [
    {
      id: 't001',
      type: 'date',
      description: 'September 21, 2021',
    },
    {
      id: 't002',
      type: 'worked-time',
      description: '09:05 to 19:50',
    },
    {
      id: 't003',
      type: 'worked-hours',
      description: '08:45',
    },
    {
      id: 't004',
      type: 'break',
      description: '01:00',
    },
    {
      id: 't005',
      type: 'night',
      description: '02:30',
    },
  ];

  const record2 = [
    {
      id: 'd001',
      type: 'date',
      description: 'September 21, 2021',
    },
    {
      id: 'd002',
      type: 'worked-time',
      description: '09:05 to 19:50',
    },
    {
      id: 'd003',
      type: 'worked-hours',
      description: '08:45',
    },
    {
      id: 'd004',
      type: 'break',
      description: '01:00',
    },
    {
      id: 'd005',
      type: 'night',
      description: '02:30',
    },
  ];

  const record1 = [
    {
      id: 'e001',
      type: 'date',
      description: 'September 21, 2021',
    },
    {
      id: 'e002',
      type: 'worked-time',
      description: '09:05 to 19:50',
    },
    {
      id: 'e003',
      type: 'worked-hours',
      description: '08:45',
    },
    {
      id: 'e004',
      type: 'break',
      description: '01:00',
    },
  ];

  const record3 = [
    {
      id: 'f001',
      type: 'date',
      description: 'September 21, 2021',
    },
    {
      id: 'f002',
      type: 'worked-time',
      description: '09:05 to 19:50',
    },
    {
      id: 'f003',
      type: 'worked-hours',
      description: '08:45',
    },
    {
      id: 'f004',
      type: 'break',
      description: '01:00',
    },
    {
      id: 'f005',
      type: 'suppl',
      description: '02:30',
    },
  ];

  const record4 = [
    {
      id: 'g001',
      type: 'date',
      description: 'September 21, 2021',
    },
    {
      id: 'g002',
      type: 'worked-time',
      description: '09:05 to 19:50',
    },
    {
      id: 'g003',
      type: 'worked-hours',
      description: '08:45',
    },
    {
      id: 'g004',
      type: 'holiday',
      description: '01:00',
    },
  ];

  const record5 = [
    {
      id: 'g001',
      type: 'date',
      description: 'September 21, 2021',
    },
    {
      id: 'g002',
      type: 'time-off',
      description: 'Time-off',
    },
  ];
  const recordList = [
    record1,
    record2,
    record3,
    record4,
    record5,
  ];
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = (open) => {
    setIsOpen(!isOpen);
  };
  const getTypeModal = () => {
    return ['delete', 'oops-twice', 'well-done', 'opps-checked', 'good-job-suppl', 'good-job-holiday'][Math.floor(Math.random() * (4 - 0) + 0)];
  };

  const handleDeleteItem = (isDeleted) => {
    console.log('isDeleted', isDeleted);
  };
  const handleSaludar = () => {
    ref.current.getSaludo('Hola buenas tardes ');
  };
  const tabOption = [
    {
      id: 'tab1',
      icon: 'iconito',
      title: 'Regular time',
    },
    {
      id: 'tab2',
      icon: 'iconito',
      title: 'Overtime',
    },
  ];
  const slot = () => <h1>First</h1> ;
  const selectedItem = 0;

  const handleRequest = () => {
    fetch(`${window.location.origin}/post`)
      .then((response) => response.json())
      .then((d) => {
        console.log('fghjklñ´', d);
      });
  };

  return (
    <div>
      <button type='button' onClick={handleRequest}>click</button>
      {/*
      <section className='record-list '>
        <div className='record-list-item'>
          <Tabs options={tabOption} slot={slot()} selectedItem={selectedItem}>
            <RegularTime
              command='Please, set your regular working time in 24-hour format'
              description='Your break time and end time will be calculated according to your start time'
            />
            <Overtime
              command='Please, set your working in 24-hour format'
              description='Just keep in mind these hours have to be approved by your manager'
            />
          </Tabs>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <Requester />
      <br />
      <br />
      <br />
      <br />
      <button onClick={handleSaludar} type='button'> saludar </button>

      <Saludar name='David' ref={ref} />
      <button
        type='button'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {' '}
        openModal
        {' '}

      </button>
      <Modal isOpen={isOpen} handleModal={handleModal} type={getTypeModal()} handleDeleteItem={handleDeleteItem} />
      <TimerPicker title='Set your start time' />
      <br />
      <br />
      <br />
      <br />
      <section className='record-list'>
        {
          recordList && recordList.map((record) => (
            <div className='record-list-item'>
              <TimeRecord records={record} />
            </div>
          ))
        }

      </section>

      <br />
      <br />
      <br />
      <br />
      <TimeDetail timeDetail={timeDetail} />
      <br />
      <br />
      <br />
      <br />
      <TimeRecord records={records} />
      <br />
      <br />
      <br />
      <br />
      <div className='wrapper-menu'>
        <DropDownMenu options={options} icon='25BC' optionSelected={optionSelected} />
      </div>
      <br />
      <br />
      <br />
      <br />

      <TypingText
        staticText='I am '
        dynamicText='Welcome'
      />
      {' '}
      <Header user={user} />
      <button onClick={handleLogin} type='button'> login </button>
      <button onClick={handleLogout} type='button'> logout </button>
      */}
    </div>
  );
};

export default App;
