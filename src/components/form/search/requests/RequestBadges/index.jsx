import { BadgeSelect } from '../../../BadgeSelect';

import { urgencySelectData } from '../../../../../data/cardRealty';
import { statusSelectData } from '../../../../../lib/mocks/clients-mock';
import { getInputValueWithColor } from '../../../../../utils/data';

export const RequestBadges = ({
  handleSubmitEditing = () => {},
  urgency_type,
  status,
  agent_name,
}) => {
  const newStatus = status
    ? getInputValueWithColor(statusSelectData, status, 'status')
    : '';
  const newUrgency = urgency_type
    ? getInputValueWithColor(urgencySelectData, urgency_type, 'urgency_type')
    : '';

  const badges = [
    { ...newStatus, handleBadgeSelect: handleSubmitEditing },
    { ...newUrgency, handleBadgeSelect: handleSubmitEditing },
    {
      title: agent_name,
      color: 'border-pinkColor bg-pinkColor text-white',
      selectData: [],
      name: 'agent_name',
    },
  ];
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      {badges.map((item, index) => {
        if (item?.title) {
          return (
            <BadgeSelect
              key={index}
              item={item}
            />
          );
        }
      })}
    </div>
  );
};
