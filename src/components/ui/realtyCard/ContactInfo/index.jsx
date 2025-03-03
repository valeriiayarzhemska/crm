import { Mail, Phone } from 'lucide-react';
import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';
import { WhatsAppIcon } from '../../icons';
import { ButtonTemplate } from '../../buttons/ButtonTemplate';

import { colors, successMessages } from '../../../../data/constants';
import { handleCopy } from '../../../../utils/utils';

export const ContactInfo = ({
  contact = {},
  handleWhatsUpClick = () => {},
}) => {
  const { first_name, last_name, role, phone, email } = contact;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-xl text-blackColor font-bold">{`${first_name} ${last_name}${role?.title ? ` (${role.title})` : ''}`}</span>
      </div>

      {phone && phone?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Phone
            color={colors.darkBlueColor}
            size={14}
          />

          <span className="text-xs text-blackColor sm:text-sm">{phone}</span>

          <span
            onClick={() => handleCopy(phone, successMessages.copyPhone)}
            className="text-xs text-darkBlueColor cursor-pointer sm:text-sm"
          >
            (Copy)
          </span>

          <IconButtonTemplate
            size={4}
            handleClick={handleWhatsUpClick}
            icon={WhatsAppIcon}
            classes={'border-white'}
            isSmallBorder={true}
          />
        </div>
      )}

      {email && email?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Mail
            color={colors.darkBlueColor}
            size={14}
          />

          <span className="text-xs text-blackColor sm:text-sm">{email}</span>

          <span
            onClick={() => handleCopy(email, successMessages.copyEmail)}
            className="text-xs text-darkBlueColor cursor-pointer sm:text-sm"
          >
            (Copy)
          </span>

          <ButtonTemplate
            text={'Send email'}
            handleClick={handleWhatsUpClick}
            classes={
              'border-whiteColor bg-whiteColor text-darkBlueColor underline'
            }
            isSmall={true}
            isSmallBorder={true}
          />
        </div>
      )}
    </div>
  );
};
