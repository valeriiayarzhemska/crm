import { Camera } from 'lucide-react';

import { colors } from '../../../../../data/constants';

export const SearchItemResidences = ({ item = {}, handleClick = () => {} }) => {
  const { name, image } = item;

  return (
    <>
      <div
        onClick={() => handleClick(item)}
        className="w-64 min-h-11 flex p-1 items-center hover:bg-gray-100 cursor-pointer sm:w-[348px]"
      >
        <div className="mr-4 h-full w-14 flex items-center justify-center">
          {image ? (
            <img
              alt="obg img"
              src={image}
              className="block w-full h-full object-cover object-center"
            />
          ) : (
            <Camera
              size={18}
              color={colors.darkGrayColor}
            />
          )}
        </div>

        <div>
          <div className="text-xs text-blackColor">{name}</div>
        </div>
      </div>
    </>
  );
};
