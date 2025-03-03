import { CustomMarker } from '../CustomMarker';

export const MapInfoItem = ({ marker }) => {
  const { id: markerId, colors, subtitle, description } = marker;

  return (
    <div className="flex gap-2 items-center">
      <div className="relative w-[30px] h-[30px]">
        <CustomMarker
          colors={colors}
          classes="top-[13%] left-[7px] w-[16px] h-[16px]"
          width={'30px'}
          height={'30px'}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="block text-blackColor text-xs">{subtitle}</span>

        {description && description.length > 0 && (
          <div className='flex flex-col gap-0.5'>
            {description.map((item, index) => {
              return (
                <span
                  key={index}
                  className="block text-blackColor text-xs"
                >
                  {item}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
