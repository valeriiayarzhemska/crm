import { Mail, Phone } from 'lucide-react';

import { BadgeSelect } from '../../../BadgeSelect';
import { IconButtonTemplate } from '../../../../ui/buttons/IconButtonTemplate';

import { requestDealToggleData } from '../../../../../lib/mocks/add-request-mock';
import { getInputValueWithColor } from '../../../../../utils/data';
import { handleWhatsUpClick } from '../../../../../utils/utils';

export const RequestActions = ({
  request_type,
  phone = false,
  email = false,
  handleSubmitEditing = () => {},
  handleSendReplyClick = () => {},
}) => {
  const newRequestType = request_type
    ? getInputValueWithColor(
      requestDealToggleData,
      request_type,
      'request_type'
    )
    : '';

  return (
    <div className="flex flex-wrap items-center gap-7">
      {newRequestType && (
        <BadgeSelect
          key={newRequestType.value}
          item={{
            ...newRequestType,
            handleBadgeSelect: handleSubmitEditing,
          }}
        />
      )}

      <div className="flex gap-1 items-center py-0.5 px-1 w-fit bg-yellow-300 rounded">
        <IconButtonTemplate
          handleClick={() => handleWhatsUpClick(phone)}
          icon={Phone}
          size={16}
          tooltipText={'Open matching'}
          disabled={!phone}
        />

        <IconButtonTemplate
          handleClick={handleSendReplyClick}
          icon={Mail}
          size={16}
          tooltipText={'Emails'}
          disabled={!email}
        />

        <span className="px-1 text-xs text-blackColor">Send reply</span>
      </div>
    </div>
  );
};
