import { InfoWindow } from '@react-google-maps/api';
import { Camera } from 'lucide-react';

import { MarkerInfoWindowButtons } from '../MarkerInfoWindowButtons';

import { colors } from '../../../../data/constants';
import { generateStringValue } from '../../../../utils/utils';
import { generateCharacteristics } from '../../../../utils/ui';

export const MarkerInfoWindow = ({
  realty = {},
  setActiveMarker = () => {},
}) => {
  const {
    id,
    photo,
    property_name,
    city,
    street,
    street_number,
    living_area,
    garden,
    bedroom,
    bathroom,
    price,
    latitude,
    longitude,
  } = realty;

  const realtyAddress = generateStringValue([city, street, street_number]);
  const realtyCharacteristics = generateCharacteristics({
    living_area,
    garden,
    bedroom,
    bathroom,
  });

  return (
    <InfoWindow
      position={{
        lat: latitude,
        lng: longitude,
      }}
      onCloseClick={() => setActiveMarker(null)}
    >
      <div className="flex gap-1 w-56">
        <div className="flex items-center justify-center h-14 w-[30%]">
          {photo ? (
            <img
              alt="obg img"
              src={photo}
              className="block w-full h-full object-cover object-center"
            />
          ) : (
            <Camera
              size={18}
              color={colors.darkGrayColor}
            />
          )}
        </div>

        <div className="flex flex-col gap-0.5 w-[70%]">
          <h6 className="text-sm font-bold text-blackColor">{`(${id}${property_name ? `, ${property_name}` : ''})`}</h6>

          <span className="block text-xs text-blackColor">{realtyAddress}</span>

          <span className="block text-[10px] text-gray-600">
            {realtyCharacteristics}
          </span>

          <div className="flex justify-between items-center gap-2 w-full">
            <span className="block text-xs font-medium text-blackColor">
              {price} €
            </span>

            <MarkerInfoWindowButtons realty={realty} />
          </div>
        </div>
      </div>
    </InfoWindow>
  );
};
