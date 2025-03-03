import { useState } from 'react';

import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';
import { Checkbox } from '../../shadcn/checkbox';
import Map from '../../mapComponent/Map';
import { Dialog } from '../../Dialog';

import {
  realtyButtonsTitles,
  realtyLocationButtons,
} from '../../../../data/cardRealty';
import { errorMessages, successMessages } from '../../../../data/constants';
import { handleCopy } from '../../../../utils/utils';
import { showError } from '../../../../utils/ui';

export const LocationButtons = ({
  realtyId,
  realtyLocation = {},
  updateRealtyData = () => {},
}) => {
  const {
    location_address_checked,
    location_city_id,
    location_street_id,
    location_street_number_id,
    latitude,
    longitude,
  } = realtyLocation;
  let streetNumber = location_street_number_id?.name
    ? `${location_street_number_id.name}, `
    : '';
  const address = location_street_id?.name
    ? `${streetNumber}${location_street_id.name}`
    : location_city_id.name;

  const [isAddressChecked, setIsAddressChecked] = useState(
    location_address_checked
  );
  const [isMapShown, setIsMapShown] = useState(false);

  const handleCheckClick = inputName => {
    const value = isAddressChecked ? 0 : 1;

    updateRealtyData({ [inputName]: value });

    setIsAddressChecked(!isAddressChecked);
  };

  const handleCoordsClick = () => {
    const streetName = location_street_id?.name;
    const hasCoords = longitude && latitude;
    let url = `${latitude},${longitude}`;

    if (!hasCoords && streetName) {
      url = `${streetNumber}${location_street_id.name}`;
    } else if (!hasCoords && !streetName) {
      url = location_city_id?.name;
    }

    window.open(
      `https://google.com/maps/search/?api=1&map_action=map&basemap=satellite&query=${url}`
    );
  };

  const handleCopyAdressClick = () => {
    handleCopy(address, successMessages.copyAddress);
  };

  const handleMapClick = () => {
    if (longitude && latitude) {
      setIsMapShown(true);
    } else {
      showError(errorMessages.noCoords);
    }
  };

  const buttonsHandlers = {
    [realtyButtonsTitles.copyAddress]: handleCopyAdressClick,
    [realtyButtonsTitles.map]: handleMapClick,
  };

  return (
    <div className="flex gap-2 justify-start items-center">
      <div
        className="flex items-center bg-whiteColor rounded w-max-content"
        onClick={() => handleCheckClick('location_address_checked')}
      >
        <Checkbox
          id={realtyId}
          defaultChecked={isAddressChecked}
        />
      </div>

      {location_city_id?.name && (
        <>
          <div className="flex items-center p-0.5 bg-gray-200 rounded w-max-content">
            <span className="text-sm text-blackColor">
              {location_city_id.name}
            </span>
          </div>

          <div
            onClick={handleCoordsClick}
            className="cursor-pointer"
          >
            <span className="text-sm text-darkBlueColor underline">
              {address.length > 24 ? `${address.slice(0, 24)}...` : address}
            </span>
          </div>

          {realtyLocationButtons.map(button => {
            return (
              <IconButtonTemplate
                key={button.id}
                handleClick={buttonsHandlers[button.title]}
                icon={button.icon}
                classes={button.classes}
                isSmallBorder={true}
                size={16}
                tooltipText={button.tooltipText}
              />
            );
          })}
        </>
      )}

      {isMapShown && (
        <Dialog
          content={
            <div className='w-[254px] h-96 sm:w-96'>
              <Map realty={{ lat: latitude, lng: longitude }} />
            </div>
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={isMapShown}
          onClose={() => setIsMapShown(false)}
        />
      )}
    </div>
  );
};
