import React, { useRef, useLayoutEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './DropDownMenu.scss';
import styled from 'styled-components';

const DropDownMenu = ({ options = null, optionSelected = () => {}, idMenu = uuidv4(), icon = '22EE' }) => {
  const Span = styled.span`
    &:after{
      content: '\\${icon}';
    }
  `;

  const checkBox = useRef(null);
  const dropDownMenu = useRef(null);
  const handleClick = (option) => {
    return () => {
      optionSelected(option);
    };
  };

  useLayoutEffect(() => {
    document.addEventListener('click', ({ target }) => {
      if (checkBox.current.checked === true && !dropDownMenu.current.contains(target)) {
        checkBox.current.checked = false;
      };
    });
    return () => {
      document.removeEventListener('click');
    };
  }, []);

  return (
    <div className='drop-down-menu' ref={dropDownMenu}>
      <label htmlFor={idMenu}>
        {' '}
        <Span className='drop-down-menu-icon' />
        <input
          className='drop-down-menu-checkbox'
          type='checkbox'
          name={idMenu}
          id={idMenu}
          ref={checkBox}
        />
        <ul className='drop-down-menu-options'>
          {
            options && options.map((option) => (
              <li className={`drop-down-menu-option drop-down-menu-option--${option.type}`} key={option.id} onClick={handleClick(option)}>
                <span className='drop-down-menu-option-icon'>
                  iconito
                </span>
                <p className='drop-down-menu-option-description'>{option.text}</p>
              </li>
            ))
          }
        </ul>
      </label>
    </div>
  );
};

export default DropDownMenu;
