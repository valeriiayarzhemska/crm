import { useEffect, useRef } from 'react';

import cn from 'classnames';

import { ButtonTemplate } from '../buttons/ButtonTemplate';

export const ButtonsList = ({
  list,
  formProps = {},
  additionalButton = false,
  handleButtonClick,
  setIsOpen,
  classes,
}) => {
  const listRef = useRef(null);
  const { title, description, icon, handleClick } = additionalButton;

  const hasClasses = classes && classes.length > 0;

  useEffect(() => {
    if (
      document.querySelector('.dialog') &&
      !document.querySelector('.dialog-with-click')
    ) {
      return;
    }

    function handleClickOutside(event) {
      if (document.querySelector('.dialog')) {
        return;
      }
      
      if (listRef.current && !listRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listRef, setIsOpen]);

  return (
    <div
      ref={listRef}
      className={cn(
        'absolute bottom-[24px] flex flex-col p-1 w-[208px] max-h-[314px] border-[1px] b-gray-200 bg-white shadow-md overflow-scroll hide-scroll z-[3]',
        { [classes]: hasClasses }
      )}
    >
      {additionalButton && Object.keys(additionalButton).length && (
        <>
          <ButtonTemplate
            text={title}
            handleClick={handleClick}
            icon={icon}
            isIconText={icon}
          />

          {description && description.length > 0 && (
            <span className="pt-0.5 text-xs italic text-center">
              {description}
            </span>
          )}
        </>
      )}

      {list.map((item, index) => {
        return (
          <div
            key={item.id ? item.id : index}
            className="bg-white border-white p-0.5 w-full z-[3]"
            onClick={() => handleButtonClick(item, formProps)}
          >
            <span className="text-xs text-blackColor">
              {item.title ? item.title : item}
            </span>
          </div>
        );
      })}
    </div>
  );
};
