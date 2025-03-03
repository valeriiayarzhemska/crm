import { Fragment } from 'react';
import { OverlayView } from '@react-google-maps/api';

import { CustomMarker } from '../CustomMarker';
import { MarkerInfoWindow } from '../MarkerInfoWindow';

export const MarkerItem = ({
  realty,
  colors = {},
  activeMarker,
  setActiveMarker = () => {},
  handleActiveMarker = () => {},
}) => {
  const { id, latitude, longitude } = realty;

  return (
    <Fragment key={id}>
      <OverlayView
        position={{
          lat: latitude,
          lng: longitude,
        }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          onClick={() => handleActiveMarker(id)}
          style={{
            position: 'relative',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            top: '-40px',
            left: '-20px',
          }}
        >
          <CustomMarker colors={colors} />
        </div>
      </OverlayView>

      {activeMarker === id && (
        <MarkerInfoWindow
          realty={realty}
          setActiveMarker={setActiveMarker}
        />
      )}
    </Fragment>
  );
};
