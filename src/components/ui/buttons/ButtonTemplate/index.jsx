import { useState } from 'react';

import cn from 'classnames';

import { Counter } from '../../Counter';

import { colors } from '../../../../data/constants';
import { LoaderProgress } from '../../LoaderProgress';
import { ButtonTip } from '../ButtonTip';

export const ButtonTemplate = ({
  type = 'button',
  text = '',
  tooltipText = '',
  isMobileTooltip = false,
  icon = false,
  isIconText = false,
  isTextHiddenMobile = false,
  isSmall = false,
  isSmallText = false,
  isSmallMobileText = false,
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
  const hasText = text && text.length > 0;

  return (
    <button
      className={cn(
        'relative flex justify-center items-center rounded text-black border-gray-200',
        { 'py-0.5 px-0.5 border-0': isSmall },
        { 'py-1.5 px-3 border-[1px]': !isSmall },
        { 'gap-1': isIconText },
        { 'text-white': isBgColor },
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
      {isIconText && (
        <Icon
          size={size ? size : 14}
          color={color ? color : colors.white}
        />
      )}

      {hasText && (
        <span
          className={cn(
            { 'text-sm': !isSmallText && !isSmallMobileText},
            { 'hidden md:block': isTextHiddenMobile },
            { 'text-xs md:text-sm': isSmallMobileText },
            { 'text-xs': isSmallText }
          )}
        >
          {text}
        </span>
      )}

      {isHovered && tooltipText && (
        <ButtonTip
          isMobileTooltip={isMobileTooltip}
          tooltipText={tooltipText}
        />
      )}

      {isLoadingData && <LoaderProgress />}

      {counter ? <Counter amount={counter} /> : null}
    </button>
  );
};
