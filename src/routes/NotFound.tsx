import React from 'react';

import { useNavigateToRoute } from '@hooks/navigateToRoute';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { navigateToTarget } = useNavigateToRoute('/home');

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="huge-font">404</h1>
      <h2 className="not-found-body">Page Not Found</h2>
      <button onClick={navigateToTarget} className="go-back-button">
        Go back
      </button>
    </div>
  );
};

export default NotFoundPage;
