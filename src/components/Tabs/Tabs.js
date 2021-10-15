import React, { useState } from 'react';
import './Tabs.scss';

const Tabs = ({ options = null, selectedItem = 0, slot, children }) => {
  const [_selectedItem, setSelectedItem] = useState(selectedItem);
  const handleClick = ({ target }) => {
    const { tab } = target.dataset;
    setSelectedItem(Number(tab));
  };
  return (
    <div className='tabs'>
      <section className='tabs-header'>
        <ul className='tabs-nav-bar'>
          {
            options && options.map((option, idx) => (
              <li
                onClick={handleClick}
                key={option.id}
                data-tab={idx}
                data-selected={_selectedItem === idx}
                className='tabs-nav-bar-item'
              >
                {option.icon}
                {' '}
                {option.title}
                {' '}
              </li>
            ))
          }
        </ul>
        <div className='tabs-header-slot'>
          {slot}
        </div>
      </section>
      <section className='tabs-content'>
        {
          React.Children.map(children, (child, idx) => (
            <section
              className='tabs-content-item'
              data-selected={_selectedItem === idx}
            >
              {' '}
              {child}
            </section>
          ))
        }
      </section>
    </div>
  );
};

export default Tabs;
