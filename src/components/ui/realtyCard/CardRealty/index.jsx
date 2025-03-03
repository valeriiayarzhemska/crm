import { useEffect, useState } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { useUpdateRealtyMutation } from '../../../../redux/services/realties/realtiesApi';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';

import { ContactsButtons } from '../ContactsButtons';
import { CardInputsBlock } from '../../../form/forms/realtyCardForms/CardInputsBlock';
import { RealtyStatus } from '../RealtyStatus';
import { SquareButtons } from '../SquareButtons';
import { RoundedButtons } from '../RoundedButtons';
import { InfoButtons } from '../InfoButtons';
import { LocationButtons } from '../LocationButtons';
import { DetailsRealty } from '../DetailsRealty';
import { CharacteristicsRealty } from '../CharacteristicsRealty';
import { OwnersRealty } from '../OwnersRealty';
import { CardRealtyPhotos } from '../CardRealtyPhotos';

import { showError } from '../../../../utils/ui';
import { errorMessages } from '../../../../data/constants';

export const CardRealty = ({ realty = {}, isPwa = false }) => {
  const [error, setError] = useState('');

  const {
    main,
    agency_id,
    agent,
    id,
    tariff,
    urgency_type,
    location,
    contacts,
    created_at,
    updated_at,
    photo = {},
    likes,
  } = realty;
  const { realty_status, realty_stages, external_link } = main;
  const { tariff_ttc } = tariff;
  const { photos = [] } = photo;

  const userToken = useSelector(selectUserToken);
  const [updateRealty, { isLoading: isUpdatingLoading, error: updatingError }] =
    useUpdateRealtyMutation();

  const updateRealtyData = async values => {
    setError(null);

    const response = await updateRealty({ token: userToken, data: values, id });

    if (response?.error || updatingError) {
      const error = updatingError;

      setError(
        error
          ? `${error.originalStatus} ${error.status}`
          : errorMessages.wentWrong
      );

      return false;
    }

    return true;
  };

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <div
      className={cn(
        'flex flex-col w-full border-[1px] border-gray-200 shadow',
        { 'xs:w-[360px]': !isPwa }
      )}
    >
      <div
        className={cn('relative w-full h-[240px]', {
          'xs:w-[360px]': !isPwa,
        })}
      >
        <CardRealtyPhotos
          realtyId={id}
          photos={photos}
          isPwa={isPwa}
        />

        <RealtyStatus
          updateRealtyData={updateRealtyData}
          realtyStatus={realty_status}
        />

        <SquareButtons
          realtyId={id}
          externalLink={external_link}
        />

        <RoundedButtons
          realtyId={id}
          likes={likes}
        />

        <ContactsButtons
          agencyId={agency_id}
          agent={agent}
          realtyId={id}
          ttc={tariff_ttc}
        />
      </div>

      <div className="flex flex-col items-start gap-3 pt-3.5 pb-3 px-2 w-full">
        <CardInputsBlock
          updateRealtyData={updateRealtyData}
          realtyId={id}
          urgencyType={urgency_type}
          realtyStages={realty_stages}
        />

        <InfoButtons realty={realty} />

        <LocationButtons
          updateRealtyData={updateRealtyData}
          realtyId={id}
          realtyLocation={location}
        />

        <DetailsRealty realty={realty} />

        <CharacteristicsRealty realty={realty} />

        <OwnersRealty
          realty={realty}
          agent={agent}
          contacts={contacts}
        />

        <div>
          <span className="text-xs text-gray-600">{`Created at: ${created_at}${updated_at ? ` / Updated at: ${updated_at}` : ''}`}</span>
        </div>
      </div>
    </div>
  );
};
