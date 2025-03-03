import cn from 'classnames';

import { Counter } from '../Counter';

export const TabLink = ({
  tab,
  activeButton = false,
  setActiveButton = () => {},
}) => {
  const { title, amount, handleTabClick = () => {}, value } = tab;

  const handleClick = () => {
    setActiveButton(value);
    handleTabClick(value);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative inline-flex justify-items-center py-2 px-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition cursor-pointer',
        { 'bg-gray-100': Number(activeButton) === Number(value) }
      )}
    >
      <Counter amount={amount} />

      <span className='text-sm text-blackColor font-medium'>{title}</span>
    </div>
  );
};
