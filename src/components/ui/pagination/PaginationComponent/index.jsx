import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { PaginationButtons } from '../PaginationButtons';

export const PaginationComponent = ({
  links = {},
  handleNextClick = () => {},
  handlePrevClick = () => {},
  meta = {},
  selectedItemsPerPage,
  setSelectedItemsPerPage = () => {},
  setPage = () => {},
}) => {
  const [itemsPerPage, setItemsPerPage] = useState([10, 25, 50, 100]);
  const [showItemsPerPage, setShowItemsPerPage] = useState(false);
  const listRef = useRef(null);

  const handleChoosingItemsPage = value => {
    setSelectedItemsPerPage(value);
    setShowItemsPerPage(false);
    setPage(1);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (document.querySelector('.dialog')) {
        return;
      }

      if (
        listRef.current &&
        !listRef.current.contains(event.target) &&
        !event.target.classList.contains('exclude-click')
      ) {
        setShowItemsPerPage(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listRef, setShowItemsPerPage]);

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-6">
      <div className="flex items-center gap-2">
        <span className="text-xs text-blackColor">Items per page:</span>

        <div className="relative w-[58px]">
          <div
            onClick={() => setShowItemsPerPage(!showItemsPerPage)}
            className="flex items-center justify-between gap-1.5 p-1.5 bg-white border-[1px] border-gray-200 rounded"
          >
            <span className="text-sm text-blackColor">
              {selectedItemsPerPage}
            </span>

            <ChevronDown size={14} />
          </div>

          {showItemsPerPage && (
            <div
              ref={listRef}
              className="absolute w-full bg-white border-[1px] border-gray-200 rounded shadow z-[2]"
            >
              {itemsPerPage.map(item => {
                return (
                  <div
                    key={item}
                    onClick={() => handleChoosingItemsPage(item)}
                    className="w-full hover:bg-gray-100 active:bg-gray-100 focus:bg-gray-100"
                  >
                    <span className="block p-1.5 text-sm text-blackColor">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <PaginationButtons 
        links={links}
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
        meta={meta}
      />
    </div>
  );
};
