import cn from 'classnames';

export const Badge = ({ text, classes }) => {
  const hasClasses = classes && classes.length > 0;

  return (
    <div
      className={cn(
        'relative inline-flex justify-center items-center p-1 h-6 rounded',
        { [classes]: hasClasses }
      )}
    >
      <span className="block text-xs">{text}</span>
    </div>
  );
};
