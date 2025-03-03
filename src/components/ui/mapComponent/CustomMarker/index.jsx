import cn from 'classnames';

export const CustomMarker = ({
  width = '40px',
  height = '40px',
  colors = {},
  classes = '',
}) => {
  const { markerColor, leftColor, rightColor, letter } = colors;

  return (
    <div className={`absolute flex items-center w-[${width}] h-[${height}]`}>
      <svg
        fill={markerColor}
        width={width}
        height={height}
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute object-center object-contain"
      >
        <path
          d="M3 0c-1.66 0-3 1.34-3 3 0 2 3 5 3 5s3-3 3-5c0-1.66-1.34-3-3-3zm0 1c1.11 0 2 .9 2 2 0 1.11-.89 2-2 2-1.1 0-2-.89-2-2 0-1.1.9-2 2-2z"
          transform="translate(1)"
          fill={markerColor}
        />
      </svg>

      <div
        className={cn(
          'absolute flex justify-center items-center z-[1]',
          { 'top-[13%] left-[10px] w-[20px] h-[20px]': !classes },
          { [classes]: classes }
        )}
        style={{
          background: `linear-gradient(to right, ${leftColor} 50%, ${rightColor} 50%)`,
          borderRadius: '0.6rem',
        }}
      >
        <span className="text-sm text-blackColor font-medium">{letter}</span>
      </div>
    </div>
  );
};
