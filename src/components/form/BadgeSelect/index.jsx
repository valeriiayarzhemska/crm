import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { colors } from '../../../data/constants';

export const BadgeSelect = ({ item = {} }) => {
  const {
    icon,
    iconColor = '',
    title = '',
    color = '',
    selectData = [],
    name = '',
    handleBadgeSelect = () => {},
  } = item;
  const Icon = icon;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(title);
  const [selectedColor, setSelectedColor] = useState(color);
  const ref = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = async item => {
    const updateSelection = () => {
      setSelectedValue(item.title);
      setSelectedColor(item?.color);
      setIsOpen(false);
    };
  
    if (handleBadgeSelect) {
      const resultOfSelection = await handleBadgeSelect({ [name]: item.value });
      
      if (!resultOfSelection) {
        updateSelection();
      } else {
        setIsOpen(false);
      }
    } else {
      updateSelection();
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      className="relative"
      ref={ref}
    >
      <div
        className={cn(
          'inline-flex justify-center items-center p-1 h-6 rounded cursor-pointer',
          { [selectedColor]: selectedColor }
        )}
        onClick={handleClick}
      >
        {icon && (
          <Icon
            size={16}
            color={iconColor ? iconColor : colors.whiteColor}
          />
        )}

        <span className="block text-xs">{selectedValue}</span>
      </div>

      {isOpen && selectData && selectData.length > 0 && (
        <div className="absolute top-6.5 left-0 w-52 max-h-60 bg-white border-[1px] border-gray-300 z-[5] rounded shadow-sm overflow-scroll hide-scroll">
          {selectData.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleSelection(item)}
                className="flex items-center p-1.5 w-full cursor-pointer"
              >
                <span className="text-xs text-blackColor">{item.title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
