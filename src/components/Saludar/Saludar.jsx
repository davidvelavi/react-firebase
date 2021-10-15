import React, { useImperativeHandle, forwardRef, useState } from 'react';

const Saludar = ({ name }, ref) => {
  const [saludar, setSaludar] = useState('');
  const getSaludo = (saludo) => {
    setSaludar(saludo);
  };

  useImperativeHandle(
    ref,
    () => (
      {
        getSaludo,
      }
    ),
  );

  return (
    <div>
      {saludar}
      {' '}
      -
      {' '}
      {name}
    </div>
  );
};

export default forwardRef(Saludar);
