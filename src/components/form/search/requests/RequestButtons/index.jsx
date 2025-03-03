import { AlarmClock, Mail, Pencil, ThumbsUp, Users } from 'lucide-react';

import { IconButtonTemplate } from '../../../../ui/buttons/IconButtonTemplate';

export const RequestButtons = ({
  id,
  formatedDate,
  isClientsPage = false,
  isMatching = false,
  handleEditRequestClick = () => {},
  handleReminderClick = () => {},
  handleMatchingClick = () => {},
}) => {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-blackColor">{id}</span>
        <span className="text-[10px] text-blackColor">{formatedDate}</span>
      </div>

      {!isMatching && (
        <IconButtonTemplate
          handleClick={handleEditRequestClick}
          icon={Pencil}
          size={20}
          tooltipText={'Edit request'}
        />
      )}

      <IconButtonTemplate
        handleClick={handleReminderClick}
        icon={AlarmClock}
        size={20}
        tooltipText={'Add reminder'}
      />

      {isClientsPage && (
        <>
          <IconButtonTemplate
            handleClick={handleMatchingClick}
            icon={ThumbsUp}
            size={20}
            tooltipText={'Open matching'}
          />

          <IconButtonTemplate
            handleClick={handleEditRequestClick}
            icon={Users}
            size={20}
            tooltipText={'Show visits'}
            counter={'12'}
          />
        </>
      )}
    </div>
  );
};
