import React from 'react';

const Header = ({ user }) => {
  return (
    <div>
      {user.name}
      {user.email}
    </div>
  );
};

export default Header;
