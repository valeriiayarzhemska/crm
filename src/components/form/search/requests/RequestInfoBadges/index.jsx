import { createInfoBadges } from '../../../../../utils/ui';
import { getMinMaxStringValue } from '../../../../../utils/utils';

export const RequestInfoBadges = ({ request = {} }) => {
  const {
    city,
    bedroom_from,
    bedroom_to,
    budget_from,
    budget_to,
    living_area_from,
    living_area_to,
    land_from,
    land_to,
  } = request;

  const bedrooms = getMinMaxStringValue(bedroom_from, bedroom_to, 'bedrooms');
  const budget = getMinMaxStringValue(budget_from, budget_to, '€');
  const livingArea = getMinMaxStringValue(
    living_area_from,
    living_area_to,
    'm² living size'
  );
  const land = getMinMaxStringValue(land_from, land_to, 'm² land');

  const infoBadges = createInfoBadges([
    city,
    bedrooms,
    budget,
    livingArea,
    land,
  ]);

  return (
    <>
      {infoBadges && infoBadges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {infoBadges.map((info, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center py-0.5 px-1.5 border-[1px] border-gray-400 rounded-xl"
              >
                <span className="block text-[10px] text-gray-800">{info}</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
