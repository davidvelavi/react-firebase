import React from 'react';
import '../css/TypingText.scss';
import styled from 'styled-components';

const TypingText = ({ staticText, dynamicText }) => {

  const Span = styled.span`
    &:after{
        animation: typing 1.5s steps(${dynamicText.length}) infinite;
    }
  `;
  return (
    <div className='TypingText'>
      {
        staticText && (
          <div className='TypingText-static'>
            {staticText}
            {' '}
            {' '}
          </div>
        )
      }
      <div className='TypingText-dynamic'>
        <Span>
          {' '}
          {dynamicText}
        </Span>
      </div>

    </div>
  );
};

export default TypingText;
