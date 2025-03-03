import cn from 'classnames';

export const ButtonTip = ({ isMobileTooltip, isSmallBorder, tooltipText }) => {
  return (
    <div
      className={cn(
        'absolute bottom-full transform -translate-x-1/2 p-1 min-w-28 bg-gray-700 rounded-md text-[10px] text-white z-[2]',
        { 'left-[160%] md:left-1/2': isMobileTooltip },
        { 'left-1/2': !isMobileTooltip },
        { 'min-w-28': !isSmallBorder },
        { 'min-w-[76px]': isSmallBorder }
      )}
    >
      {tooltipText}
    </div>
  );
};
