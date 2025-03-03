import { useNavigate } from 'react-router';
import { Camera } from 'lucide-react';

import { useDispatch } from 'react-redux';
import {
  setSearchLoading,
  showSearch,
} from '../../../../redux/features/dashboard/dashboardSlice';

import { ItemFooter } from '../ItemFooter';
import { ItemHeader } from '../ItemHeader';
import { OwnersRealty } from '../../realtyCard/OwnersRealty';

import { generateStringValue } from '../../../../utils/utils';
import { colors } from '../../../../data/constants';

export const ListingsItem = ({ reminder = {}, setIsLoading = () => {} }) => {
  const { realty = {}, contacts, agent, subject, created } = reminder;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newAdress = generateStringValue([
    realty?.street_number,
    realty?.street,
    realty?.postal_code,
    realty?.city,
  ]);

  const handleRealtyIdClick = async () => {
    await navigate('/');

    await dispatch(setSearchLoading(true));

    await dispatch(
      showSearch({
        isSearchVisible: true,
        searchQuery: realty?.id,
        searchFilters: '',
        searchPage: null,
      })
    );

    await dispatch(setSearchLoading(false));
  };

  return (
    <div className="flex flex-col gap-2 p-2 w-full bg-gray-100 rounded">
      <ItemHeader reminder={reminder} />

      {realty && (
        <>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col gap-0.5">
              <div className="relative flex justify-center items-center w-14 h-10 bg-whiteColor rounded">
                {realty?.preview ? (
                  <img
                    className="absolute w-full h-full object-center object-cover rounded"
                    src={realty?.preview}
                    alt="realty"
                  />
                ) : (
                  <Camera
                    size={26}
                    color={colors.darkGrayColor}
                  />
                )}
              </div>

              <div
                className="cursor-pointer"
                onClick={handleRealtyIdClick}
              >
                <span className="text-xs text-darkBlueColor underline">
                  {realty?.id}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="block text-sm text-blackColor">{newAdress}</span>

              {realty?.price && (
                <span className="block text-xs text-blackColor">
                  {realty.price} €
                </span>
              )}
            </div>
          </div>

          {contacts && contacts?.length > 0 && (
            <OwnersRealty
              agent={agent}
              contacts={contacts}
            />
          )}
        </>
      )}

      <ItemFooter
        agent={agent.name}
        subject={subject}
        created={created}
      />
    </div>
  );
};
