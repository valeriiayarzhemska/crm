import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const LoaderProgress = () => {
  const portalContainer = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(portalContainer);

    return () => {
      document.body.removeChild(portalContainer);
    };
  }, [portalContainer]);

  return ReactDOM.createPortal(
    <div className="loader-progress"></div>,
    portalContainer
  );
};
