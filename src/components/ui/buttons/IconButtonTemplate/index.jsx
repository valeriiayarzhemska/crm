import { useState } from 'react';

import cn from 'classnames';

import { Counter } from '../../Counter';

import { colors } from '../../../../data/constants';
import { LoaderProgress } from '../../LoaderProgress';
import { ButtonTip } from '../ButtonTip';

export const IconButtonTemplate = ({
  type = 'button',
  tooltipText = '',
  isMobileTooltip = false,
  icon,
  isSmallBorder = false,
  isSmall = false,
  isRounded = false,
  bgColor = false,
  counter = false,
  disabled = false,
  isLoadingData = false,
  size,
  color,
  handleClick = () => {},
  classes = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = icon;

  const isBgColor = bgColor && bgColor.length > 0;
  const hasClasses = classes && classes.length > 0;

  return (
    <button
      className={cn(
        'relative flex justify-center items-center rounded text-black border-gray-200',
        { 'py-1.5 px-1.5 border-0': !isSmallBorder && !isSmall },
        { 'py-0.5 px-0.5': isSmallBorder },
        { 'py-0.5 px-0.5 border-0': isSmall },
        { 'py-0.5 px-0.5 border-[1px] opacity-80': isSmallBorder },
        { 'text-white': isBgColor },
        { 'rounded-full': isRounded },
        { [bgColor]: isBgColor },
        { [classes]: hasClasses },
        { 'opacity-60': disabled || isLoadingData }
      )}
      onClick={handleClick}
      type={type}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || isLoadingData}
    >
      <Icon
        size={size ? size : 20}
        color={color ? color : colors.darkGrayColor}
      />

      {isHovered && tooltipText && (
        <ButtonTip
          isMobileTooltip={isMobileTooltip}
          isSmallBorder={isSmallBorder}
          tooltipText={tooltipText}
        />
      )}

      {isLoadingData && <LoaderProgress />}

      {counter && counter.length > 0 && <Counter amount={counter} />}
    </button>
  );
};
