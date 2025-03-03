import { useEffect, useState } from 'react';
import cn from 'classnames';

import { colors } from '../../data/constants';
import { useSelector } from 'react-redux';

export const SideItem = ({ link, toggleSidebarClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(null);

  const handleComponentClose = () => {
    setIsOpen(false);
    toggleSidebarClose();
  };

  const { title, icon, classes = '', component, counterTipRedux } = link;
  const Icon = icon;
  const Component = component;
  const hasClasses = classes && classes.length > 0;

  const counterData = useSelector(counterTipRedux);

  useEffect(() => {
    if (counterData && Number(counterData)) {
      setCounter(counterData);
    } else {
      setCounter(null);
    }
  }, [counterData]);

  return (
    <>
      <div
        className={cn(
          { [classes]: hasClasses },
          'flex items-center px-3 py-2 w-full text-black transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer'
        )}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative flex items-center">
          <Icon
            color={colors.blackColor}
            size={16}
          />

          {counter && (
            <div className="absolute top-[-15px] right-[-12px] flex items-center justify-center w-5 h-5 bg-redColor rounded-full">
              <span className="text-[10px] font-bold text-whiteColor">
                {counter}
              </span>
            </div>
          )}
        </div>

        <span className="mx-2 text-xs font-medium uppercase lg:text-sm">
          {title}
        </span>
      </div>

      {isOpen && component && (
        <Component
          handleComponentClose={handleComponentClose}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};
