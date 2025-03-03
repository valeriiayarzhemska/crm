import { useState } from 'react';
import { X } from 'lucide-react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../../redux/features/user/userSelectors';
import { useDeleteMandateMutation } from '../../../../../../redux/services/mandate/mandateApi';

import { IconButtonTemplate } from '../../../../../ui/buttons/IconButtonTemplate';
import { AddMandateForm } from '../AddMandateForm';
import { Dialog } from '../../../../../ui/Dialog';
import { DialogConfirm } from '../../../../../ui/DialogConfirm';

export const MandateItem = ({ mandate = {} }) => {
  const {
    id,
    mandate_number,
    mandate_status,
    mandate_type,
    mandate_start_date,
    mandate_end_date,
  } = mandate;

  const [isOpenAddMandate, setIsOpenAddMandate] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userToken = useSelector(selectUserToken);
  const [
    deleteMandate,
    { isLoading: isDeletingLoading, isError: deletingError },
  ] = useDeleteMandateMutation();

  const handleMandateClick = () => {
    setIsOpenAddMandate(!isOpenAddMandate);
  };

  const handleDeleteClick = () => {
    setIsDeleteClick(!isDeleteClick);
  };

  const handleDeleteMandate = async () => {
    setIsLoading(true);
    setError(null);

    const response = await deleteMandate({
      token: userToken,
      id,
    });

    const errorStatus = response?.error || deletingError;

    if (errorStatus) {
      setError(errorStatus);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex gap-1 p-1 bg-gray-100 rounded cursor-pointer">
        <div
          onClick={handleMandateClick}
          className="flex flex-col gap-0.5"
        >
          <span className="block text-sm font-medium text-blackColor">{`№${mandate_number}${mandate_status?.title ? `, ${mandate_status.title}` : ''}`}</span>

          {mandate_type?.title && (
            <span className="block text-xs text-blackColor">
              {mandate_type.title}
            </span>
          )}

          {mandate_start_date && mandate_end_date && (
            <span className="block text-xs text-blackColor">
              {`${mandate_start_date} - ${mandate_end_date}`}
            </span>
          )}
        </div>

        <IconButtonTemplate
          icon={X}
          size={16}
          handleClick={handleDeleteClick}
        />
      </div>

      {isOpenAddMandate && (
        <Dialog
          content={
            <AddMandateForm
              isEdit={true}
              mandate={mandate}
              handleCancel={() => setIsOpenAddMandate(false)}
            />
          }
          classes="max-w-[90%] sm:max-w-[580px]"
          isOpen={isOpenAddMandate}
          onClose={() => setIsOpenAddMandate(false)}
        />
      )}

      {isDeleteClick && (
        <Dialog
          content={
            <DialogConfirm
              isLoading={isDeletingLoading}
              handleSubmit={() => handleDeleteMandate(setIsDeleteClick)}
              handleCancel={() => setIsDeleteClick(false)}
            />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={isDeleteClick}
          onClose={() => setIsDeleteClick(false)}
        />
      )}
    </>
  );
};
