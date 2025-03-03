import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';

import { X } from 'lucide-react';
import cn from 'classnames';

import { colors } from '../../../data/constants';
import { disableBodyScroll } from '../../../utils/ui';

export const Dialog = ({ content, classes, isOpen, onClose }) => {
  const hasClasses = classes && classes.length > 0;
  
  const overlayRef = useRef(null);

  const handleClose = () => {
    disableBodyScroll(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(true);
    }
  }, [isOpen]);

  const portalContainer = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(portalContainer);

    return () => {
      document.body.removeChild(portalContainer);
    };
  }, [portalContainer]);

  return isOpen
    ? ReactDOM.createPortal(
      <div
        className="relative z-10 dialog"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div 
          onClick={handleOverlayClick}
          className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div 
            ref={overlayRef}
            className="flex min-h-full items-center justify-center py-16 px-2 text-center md:p-4"
          >
            <div
              className={cn(
                'relative transform rounded-lg bg-white text-left shadow-xl transition-all',
                { [classes]: hasClasses }
              )}
            >
              <div className="absolute top-1 right-2">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 pointer"
                  onClick={handleClose}
                >
                  {
                    <X
                      size={22}
                      color={colors.blackColor}
                    />
                  }
                </button>
              </div>

              <div className="rounded-lg bg-white px-4 pb-4 pt-9 sm:pb-4">
                <div className="sm:flex sm:items-start">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      portalContainer
    )
    : null;
};
