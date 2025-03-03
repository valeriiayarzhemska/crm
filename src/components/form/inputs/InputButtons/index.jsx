import React, { useEffect, useState } from 'react';

import { IconButtonTemplate } from '../../../ui/buttons/IconButtonTemplate';
import { Dialog } from '../../../ui/Dialog';

import { inputButtonType } from '../../../../data/constants';

export const InputButtons = ({
  buttons = [],
  formProps = {},
  handleRemove = () => {},
  setSelectedValue = () => {},
  name,
  inputRef,
  selectedList = [],
  depedentValue = '',
  hasDepedentValue = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [depedentSelectValue, setDepedentSelectValue] = useState(
    formProps?.values[depedentValue]
  );

  const handleResetInput = () => {
    if (selectedList && selectedList.length > 0) {
      handleRemove(selectedList, []);
    }

    if (setSelectedValue) {
      setSelectedValue([]);
    }

    if (inputRef?.current && inputRef?.current?.resetSelectedValues) {
      inputRef.current.resetSelectedValues();
    }

    formProps?.setFieldValue(name, '');
  };

  const handleClickButton = (type, handleClick, hasDialogContent) => {
    if (type === inputButtonType.add) {
      setIsOpen(true);
    }

    if (type === inputButtonType.edit) {
      setIsEditOpen(true);
    }

    if (type === inputButtonType.delete) {
      handleResetInput();
    }

    if (handleClick) {
      handleClick();
    }
  };

  useEffect(() => {
    setDepedentSelectValue(formProps?.values[depedentValue]);
  }, [formProps?.values[depedentValue]]);

  return (
    <div className="flex items-center gap-2 w-auto">
      {buttons.map((button, index) => {
        const Content = button.dialogContent;
        const isNotAdd = button.type !== inputButtonType.add;

        return (
          <React.Fragment key={index}>
            <IconButtonTemplate
              isSmall={true}
              icon={button.icon}
              disabled={
                (isNotAdd && !formProps?.values[name]) ||
                (hasDepedentValue && !depedentSelectValue)
              }
              handleClick={() =>
                handleClickButton(
                  button.type,
                  button.handleClick,
                  !!button.dialogContent
                )
              }
            />

            {button.dialogContent && button.type === inputButtonType.add && (
              <>
                {isOpen && (
                  <Dialog
                    content={
                      <Content
                        formProps={formProps}
                        name={name}
                        handleClose={() => setIsOpen(false)}
                        handleResetInput={handleResetInput}
                      />
                    }
                    classes={'max-w-[290px] sm:max-w-[420px]'}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                  />
                )}
              </>
            )}

            {button.dialogContent && button.type === inputButtonType.edit && (
              <>
                {isEditOpen && (
                  <Dialog
                    content={
                      <Content
                        isEdit={true}
                        formProps={formProps}
                        name={name}
                        handleClose={() => setIsEditOpen(false)}
                        handleResetInput={handleResetInput}
                      />
                    }
                    classes={'max-w-[290px] sm:max-w-[420px]'}
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                  />
                )}
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
