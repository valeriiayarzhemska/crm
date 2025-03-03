import { MarkerItem } from '../MarkerItem';

import {
  realtyStatusMock,
  stageSelectDataMapValues,
} from '../../../../data/cardRealty';
import { colors } from '../../../../data/constants';

export const MarkerList = ({
  markers = [],
  handleActiveMarker = () => {},
  setActiveMarker = () => {},
  activeMarker,
}) => {
  const handleColors = (status, stages) => {
    const checkStages = [];
    let markerColor = colors.redColor;
    let leftColor = colors.whiteColor;
    let rightColor = colors.whiteColor;
    let letter = 'A';

    if (stages && stages.length > 0) {
      stages.forEach(item => {
        switch (item.value) {
        case stageSelectDataMapValues.contact:
          markerColor = colors.greenColor;
          break;

        case stageSelectDataMapValues.introducer:
          markerColor = colors.yellowColor;
          break;

        case stageSelectDataMapValues.urgent:
          leftColor = colors.lightYellowColor;
          rightColor = colors.lightYellowColor;
          checkStages.push(item.value);
          break;

        case stageSelectDataMapValues.visit:
          leftColor = colors.lightPinkColor;
          rightColor = colors.lightPinkColor;
          checkStages.push(item.value);
          break;

        default:
          break;
        }
      });

      if (
        checkStages.includes(stageSelectDataMapValues.urgent) &&
        checkStages.includes(stageSelectDataMapValues.visit)
      ) {
        leftColor = colors.lightYellowColor;
        rightColor = colors.lightPinkColor;
      }
    }

    if (status || status === 0) {
      realtyStatusMock.forEach(item => {
        if (Number(item.value) === Number(status)) {
          return (letter = item.mapValue);
        }
      });
    }

    return { markerColor, leftColor, rightColor, letter };
  };

  return (
    <>
      {markers && markers.length > 0 && (
        <>
          {markers.map(realty => {
            const colors = handleColors(
              realty?.realty_status,
              realty?.realty_stages
            );

            return (
              <MarkerItem
                key={realty.id}
                realty={realty}
                colors={colors}
                activeMarker={activeMarker}
                setActiveMarker={setActiveMarker}
                handleActiveMarker={handleActiveMarker}
              />
            );
          })}
        </>
      )}
    </>
  );
};
