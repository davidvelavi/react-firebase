import React from 'react';
import useRequester from './hooks/useRequester';
import { dmScheme } from './schemes';

const Requester = () => {
  const { generateRequest, response } = useRequester({ method: 'get', url: 'https://jsonplaceholder.typicode.com/posts', _schema: dmScheme });
  const handleClick = () => {
    const params = { postId: 1 };
    const data = {};
    generateRequest({ params, data });
  };
  return (
    <div>
      <button onClick={handleClick} type='button'>
        generateRequest
      </button>
    </div>
  );
};

export default Requester;
