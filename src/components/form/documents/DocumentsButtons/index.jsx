import { useState } from 'react';

import { IconButtonTemplate } from '../../../ui/buttons/IconButtonTemplate';
import { Dialog } from '../../../ui/Dialog';
import { ChangeDocName } from '../../forms/realtyForm/ChangeDocName';
import { DialogConfirm } from '../../../ui/DialogConfirm';

import { documentButtonsName } from '../../../../lib/mocks/add-realty-mock';

export const DocumentsButtons = ({
  isDisabled = false,
  propsForHandle = {},
  buttons = [],
  buttonsHandlersProps = {},
}) => {
  const [isRenameClick, setIsRenameClick] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);

  const { handleRenameDocument, handleDeleteDocument } = buttonsHandlersProps;

  const handleRenameDialogClose = () => {
    setIsRenameClick(false);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteClick(false);
  };

  const handlersForClose = {
    [documentButtonsName.rename]: handleRenameDialogClose,
    [documentButtonsName.delete]: handleDeleteDialogClose,
  };

  const handleButtonClick = (handleClick, buttonName) => {
    if (buttonName === documentButtonsName.rename) {
      setIsRenameClick(true);
    }

    if (buttonName === documentButtonsName.delete) {
      setIsDeleteClick(true);
    }

    if (handleClick) {
      handleClick({
        ...propsForHandle,
        handleCloseDialog: handlersForClose[buttonName],
      });
    }
  };

  return (
    <>
      {buttons.map((button, index) => {
        const {
          icon,
          tooltipText,
          disabledOnEdit,
          handleClick,
          handlerKeyname,
        } = button;

        return (
          <IconButtonTemplate
            key={index}
            isSmall={true}
            icon={icon}
            isRounded={true}
            tooltipText={tooltipText}
            disabled={isDisabled && disabledOnEdit}
            handleClick={() => handleButtonClick(handleClick, handlerKeyname)}
          />
        );
      })}

      {isRenameClick && (
        <Dialog
          content={
            <ChangeDocName
              handleSubmit={handleRenameDocument}
              handleCancel={handleRenameDialogClose}
              file={propsForHandle?.item}
              isEdit={propsForHandle?.isEdit}
            />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={isRenameClick}
          onClose={handleRenameDialogClose}
        />
      )}

      {isDeleteClick && (
        <Dialog
          content={
            <DialogConfirm
              handleSubmit={() =>
                handleDeleteDocument({
                  ...propsForHandle,
                  handleCloseDialog:
                    handlersForClose[documentButtonsName.delete],
                })
              }
              handleCancel={handleDeleteDialogClose}
            />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={isDeleteClick}
          onClose={handleDeleteDialogClose}
        />
      )}
    </>
  );
};
