import { useState } from 'react';

import { X } from 'lucide-react';

import { ButtonTemplate } from '../../ui/buttons/ButtonTemplate';
import { Dialog } from '../../ui/Dialog';
import { DialogConfirm } from '../../ui/DialogConfirm';

export const DeleteDialogButton = ({
  isDeletingLoading = false,
  handleDelete = () => {},
  error = false,
}) => {
  const [isDeleteClick, setIsDeleteClick] = useState(false);

  return (
    <div className="absolute right-0 bottom-0">
      <ButtonTemplate
        text={'Delete'}
        icon={X}
        isIconText={true}
        handleClick={() => setIsDeleteClick(true)}
      />

      {isDeleteClick && (
        <Dialog
          content={
            <DialogConfirm
              isLoading={isDeletingLoading}
              handleSubmit={() => handleDelete(setIsDeleteClick)}
              handleCancel={() => setIsDeleteClick(false)}
            />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={isDeleteClick}
          onClose={() => setIsDeleteClick(false)}
        />
      )}
    </div>
  );
};
