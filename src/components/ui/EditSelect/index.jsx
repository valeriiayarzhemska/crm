import { useEffect, useRef, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

import { IconButtonTemplate } from '../buttons/IconButtonTemplate';

export const EditSelect = ({ selectData = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
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
      <IconButtonTemplate
        isSmall={true}
        icon={EllipsisVertical}
        isRounded={true}
        handleClick={handleClick}
      />

      {isOpen && selectData && selectData.length > 0 && (
        <div className="absolute top-7 right-0 w-36 max-h-60 bg-white border-[1px] border-gray-300 z-[5] rounded shadow-sm overflow-scroll hide-scroll">
          {selectData.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                onClick={() => item.handleSelection()}
                className="flex items-center px-1.5 py-2 gap-1 w-full cursor-pointer"
              >
                <Icon size={12} />

                <span className="text-sm text-blackColor">{item.title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
