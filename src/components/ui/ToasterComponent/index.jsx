import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Toaster } from 'sonner';

export const ToasterComponent = ({ isError }) => {
  const portalContainer = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(portalContainer);

    return () => {
      document.body.removeChild(portalContainer);
    };
  }, [portalContainer]);

  return ReactDOM.createPortal(
    <Toaster
      position="top-right"
      closeButton={true}
      toastOptions={{
        className: isError ? 'bg-red-300' : '',
      }}
    />,
    portalContainer
  );
};
