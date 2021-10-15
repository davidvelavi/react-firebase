import React, { useState, useEffect } from 'react';
import './Modal.scss';

const messages = {
  'oops-twice': {
    title: 'Oops!',
    description: 'You have already entered your \nhours worked today. \nYou can only do it once a day',
  },
  'well-done': {
    title: 'Well done!',
    description: 'You have entered your \nworked hours of the current day.\nThey will be saved in \nMy Status tab',
  },
  'opps-checked': {
    title: 'Oops!',
    description: 'Regular time and Overtime are \noverlapping. Please check the hours entered',
  },
  'good-job-suppl': {
    title: 'Good job!',
    description: 'Your are entering supplementary hours. \nThey will be saved in \nMy Status tab',
  },
  'good-job-holiday': {
    title: 'Good job!',
    description: 'Your are entering worked hours \nin a weekend/holiday. \nThey will be saved in \nMy Status tab',
  },
  'delete': {
    title: 'Delete',
    description: 'Are you sure you want to \ndelete this record?',
  },
};

const Modal = ({ isOpen = false, type = 'good-job-holiday', handleModal = () => {}, handleDeleteItem = () => {} }) => {
  const { title, description } = messages[type];
  const [open, setOpen] = useState(isOpen);
  const newLineText = (text) => {
    return text.split('\n').map((str) => <p>{str}</p>);
  };
  const handleClick = () => {
    handleModal(open);
  };

  const handleDelete = () => {
    handleModal(open);
    handleDeleteItem(true);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <section className={`modal modal--${type} modal--${open ? 'open' : ''}`}>
      <section className='modal-content'>
        <p className='modal-title'>{title}</p>
        <article className='modal-description'>
          {newLineText(description)}
        </article>
        <section className='modal-buttons'>
          {
            type === 'delete' ?
              (
                <>
                  <button
                    className='modal-button'
                    type='button'
                    onClick={handleClick}
                  >
                    {' '}
                    Cancel
                    {' '}
                  </button>

                  <button
                    className='modal-button'
                    type='button'
                    onClick={handleDelete}
                  >
                    {' '}
                    Delete
                    {' '}
                  </button>

                </>
              ) :
              (
                <button
                  className='modal-button'
                  type='button'
                  onClick={handleClick}
                >
                  {' '}
                  Ok
                  {' '}
                </button>
              )
          }
        </section>
      </section>
    </section>
  );
};

export default Modal;
