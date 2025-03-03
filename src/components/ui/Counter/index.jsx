import cn from 'classnames';

export const Counter = ({ amount }) => {
  const numbers = amount ? amount.toString().split('') : [];

  return (
    <>
      {numbers.length > 0 && (
        <div className="absolute top-[-16px] right-[-6px] rounded-lg z-[1]">
          {numbers.map((number, index) => {
            const isOdd = index % 2;

            return (
              <span
                key={index}
                className={cn(
                  { 'bg-yellowColor': isOdd },
                  { 'bg-purpleColor': !isOdd },
                  'p-0.5 text-xs text-white font-bold'
                )}
              >
                {number}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};
