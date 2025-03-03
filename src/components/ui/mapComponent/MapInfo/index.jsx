import { MapInfoItem } from '../MapInfoItem';

import { mapInfoMarkers } from '../../../../data/constants';

export const MapInfo = ({ handleCancel = () => {} }) => {
  return (
    <div className="relative flex flex-col gap-4">
      {mapInfoMarkers.map(item => {
        const { id, title, markers } = item;

        return (
          <div
            key={id}
            className="relative flex flex-col gap-2"
          >
            <span className="text-blackColor text-xs">{title}</span>

            {markers.map(marker => {
              return (
                <MapInfoItem
                  key={id}
                  marker={marker}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
