import { useState } from 'react';
import { Files, Phone } from 'lucide-react';

import { IconButtonTemplate } from '../../../../ui/buttons/IconButtonTemplate';

import { handleCopy, handleRedirect } from '../../../../../utils/utils';
import { successMessages } from '../../../../../data/constants';
import { Dialog } from '../../../../ui/Dialog';
import { AddClientForm } from '../../../forms/AddClientForm';
import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';

export const ClientsInfoBlock = ({
  email,
  phone,
  id,
  firstName,
  lastName,
  clientType,
  language,
  isSearch = false,
  client = {},
}) => {
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);

  const hasPhone = phone && phone?.toString()?.length > 0;
  const hasEmail = email && email.length > 0;

  const newLanguage =
    language && language?.length > 0 ? language.slice(0, 2).toLowerCase() : '';

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-0.5 flex-col md:flex-row">
          <span className="block w-max text-sm text-blackColor">{`(ID: ${id})`}</span>

          <span className="block w-max text-sm text-blackColor font-medium">{`${firstName} ${lastName} (${clientType}${newLanguage ? `, ${newLanguage}` : ''})`}</span>
        </div>

        {(hasEmail || hasPhone) && (
          <div className="flex flex-col gap-1">
            {hasPhone && (
              <div className="flex items-center flex-wrap gap-0.5">
                <span className="text-xs text-gray-700">{phone}</span>

                <IconButtonTemplate
                  handleClick={() =>
                    handleCopy(phone, successMessages.copyPhone)
                  }
                  icon={Files}
                  isSmall={true}
                  size={12}
                />

                <IconButtonTemplate
                  handleClick={handleRedirect}
                  icon={Phone}
                  isSmall={true}
                  size={12}
                />
              </div>
            )}

            {hasEmail && (
              <div className="flex items-center flex-wrap gap-0.5">
                <span className="text-xs text-gray-700">{email}</span>

                <IconButtonTemplate
                  handleClick={() =>
                    handleCopy(email, successMessages.copyEmail)
                  }
                  icon={Files}
                  isSmall={true}
                  size={12}
                />
              </div>
            )}
          </div>
        )}

        {isSearch && (
          <ButtonTemplate
            handleClick={() => setIsEditClientOpen(true)}
            text='Edit client record'
          />
        )}
      </div>

      {isEditClientOpen && (
        <Dialog
          content={
            <AddClientForm
              isEdit={true}
              client={client}
              handleClose={() => setIsEditClientOpen(false)}
            />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={isEditClientOpen}
          onClose={() => setIsEditClientOpen(false)}
        />
      )}
    </>
  );
};
