import { ChevronLeft, ChevronRight } from 'lucide-react';

import { colors } from '../../../../data/constants';

export const PaginationButtons = ({
  links = {},
  handleNextClick = () => {},
  handlePrevClick = () => {},
  meta = {},
}) => {
  const { next, prev } = links;
  const { from = 0, to = 0, total = 0 } = meta;

  return (
    <div className="flex items-center gap-2">
      <span className="block text-xs text-blackColor">
        {`${from} - ${to} of ${total}`}
      </span>

      <div className="flex items-center gap-2">
        <div
          onClick={handlePrevClick}
          className="flex items-center justify-center p-2"
        >
          <ChevronLeft
            size={20}
            color={prev ? colors.blackColor : colors.middleGrayColor}
          />
        </div>

        <div
          onClick={handleNextClick}
          className="flex items-center justify-center p-2"
        >
          <ChevronRight
            size={20}
            color={next ? colors.blackColor : colors.middleGrayColor}
          />
        </div>
      </div>
    </div>
  );
};
