import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../../redux/features/user/userSelectors';
import { useGetMandatesForRealtyQuery } from '../../../../../../redux/services/mandate/mandateApi';

import { ButtonTemplate } from '../../../../../ui/buttons/ButtonTemplate';
import { Dialog } from '../../../../../ui/Dialog';
import { MandateTable } from '../../../../../ui/MandateTable';
import { AddMandateForm } from '../AddMandateForm';
import { MandateItem } from '../MandateItem';
import { Loader } from '../../../../../ui/Loader';
import { LoaderProgress } from '../../../../../ui/LoaderProgress';

import { errorMessages } from '../../../../../../data/constants';

export const MandateBlockForm = ({
  realtyId,
  formProps = {},
  inputsList = [],
}) => {
  const [mandates, setMandates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpenAddMandate, setIsOpenAddMandate] = useState(false);
  const [isOpenMandateList, setIsOpenMandateList] = useState(false);

  const userToken = useSelector(selectUserToken);
  const {
    data: mandatesData,
    isLoading: isMandatesDataLoading,
    isFetching: isMandatesDataFetching,
    error: mandatesDataError,
  } = useGetMandatesForRealtyQuery(
    { token: userToken, realty_id: realtyId },
    { skip: !realtyId }
  );

  /* const handleDeleteClick = () => {
    inputsList.forEach(input => {
      if (formProps?.setFieldValue) {
        formProps.setFieldValue(input.name, '');
      }
    });
  }; */

  const handleAddExistedMandate = mandateId => {};

  const handleOpenMandateForm = () => {
    setIsOpenAddMandate(!isOpenAddMandate);
  };

  const handleOpenMandateList = () => {
    setIsOpenMandateList(!isOpenMandateList);
  };

  useEffect(() => {
    if (mandatesData?.data && !isMandatesDataFetching) {
      setMandates(mandatesData.data);
      setIsLoading(false);
    }

    if (mandatesDataError) {
      setError(errorMessages.mandates);
      setIsLoading(false);
    }
  }, [mandatesData, isMandatesDataFetching]);

  return (
    <>
      <div className="flex items-center flex-wrap gap-3">
        <ButtonTemplate
          text={'All mandates'}
          handleClick={handleOpenMandateList}
          icon={Menu}
          isIconText={true}
        />

        <ButtonTemplate
          text={'Add new'}
          handleClick={handleOpenMandateForm}
        />

        <ButtonTemplate
          text={'Add existing'}
          handleClick={handleOpenMandateList}
        />
      </div>

      {!isLoading && mandatesData?.data && (
        <div className="flex flex-wrap gap-2">
          {mandates.map(mandate => {
            return (
              <MandateItem
                key={mandate.id}
                mandate={mandate}
              />
            );
          })}
        </div>
      )}

      {(isMandatesDataFetching || isLoading) && <LoaderProgress />}

      {isLoading && isMandatesDataLoading && (
        <div className="flex justify-center items-center w-full h-16">
          <Loader
            width={22}
            height={22}
          />
        </div>
      )}

      {isOpenAddMandate && (
        <Dialog
          content={
            <AddMandateForm
              realtyId={realtyId}
              handleCancel={() => setIsOpenAddMandate(false)}
            />
          }
          classes="max-w-[90%] sm:max-w-[810px]"
          isOpen={isOpenAddMandate}
          onClose={() => setIsOpenAddMandate(false)}
        />
      )}

      {isOpenMandateList && (
        <Dialog
          content={
            <MandateTable handleAddExistedMandate={handleAddExistedMandate} />
          }
          classes="max-w-[90%] sm:max-w-[810px]"
          isOpen={isOpenMandateList}
          onClose={() => setIsOpenMandateList(false)}
        />
      )}
    </>
  );
};
