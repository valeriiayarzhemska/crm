import { Camera } from 'lucide-react';

export const SearchItem = ({ item, handleItemClick = () => {} }) => {
  const { location, tariff, photo } = item;
  const { id, location_city_id } = location;
  const { tariff_price } = tariff;

  return (
    <div
      onClick={() => handleItemClick(item.id)}
      className="w-64 min-h-11 flex p-1 items-center hover:bg-gray-100 cursor-pointer sm:w-[348px]"
    >
      <div className="mr-4 h-full w-14 flex items-center justify-center">
        {photo?.photos?.Master?.[0]?.image ? (
          <img
            alt="img"
            src={photo.photos.Master[0].image}
            className="block w-full h-full object-cover object-center"
          />
        ) : (
          <Camera size={14} />
        )}
      </div>

      <div className="flex flex-col justify-between">
        <div className="text-xs">{item.id}</div>

        <div className="text-xs text-gray-500">
          <span className="mr-2">{`${location_city_id?.name ? location_city_id.name : ''}${tariff_price ? `, ${tariff_price} €` : ''}`}</span>
        </div>
      </div>
    </div>
  );
};
