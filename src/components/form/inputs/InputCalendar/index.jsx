import { useEffect, useRef, useState } from 'react';
import { Trash } from 'lucide-react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { calendarInputs } from '../../../../redux/features/dashboard/dashboardSelectors';
import {
  addRequestCalendar,
  deleteRequestCalendar,
} from '../../../../redux/features/dashboard/dashboardSlice';

import { DatePicker } from '../DatePicker';
import { ButtonTemplate } from '../../../ui/buttons/ButtonTemplate';
import { IconButtonTemplate } from '../../../ui/buttons/IconButtonTemplate';

export const InputCalendar = ({
  formProps,
  id,
  label,
  name,
  placeholder,
  hasDeleteButton,
  hasAddButton,
  defaultClasses,
  defaultValue,
  isResetClicked = false,
  setIsResetClicked,
  setDatePickerRefs,
}) => {
  const [dateValue, setDateValue] = useState();
  const [isLabelShown, setIsLabelShown] = useState(false);

  const dispatch = useDispatch();
  const inputs = useSelector(calendarInputs);

  const dateRef = useRef();
  const Label = label;

  const handleResetFirstDatePicker = () => {
    if (dateRef && dateRef.current && dateRef.current.clearDate) {
      dateRef.current.clearDate();
      setDateValue('');
    }

    if (formProps?.setFieldValue) {
      formProps?.setFieldValue(name, '');
    }
  };

  const handleAddition = () => {
    const input = document.querySelector(`.${inputs[0]}`);
    const inputAddButton = document.querySelector('.addAnother');

    if (input) {
      input.style.display = 'flex';
    }

    dispatch(addRequestCalendar());

    if (inputs.length === 1) {
      inputAddButton.style.display = 'none';
    }
  };

  const handleDeleteInput = inputName => {
    const input = document.querySelector(`.${inputName}`);
    const inputAddButton = document.querySelector('.addAnother');

    if (input) {
      input.style.display = 'none';
    }

    if (dateRef && dateRef.current && dateRef.current.clearDate) {
      dateRef.current.clearDate();
      setDateValue('');
    }

    if (formProps?.setFieldValue) {
      formProps?.setFieldValue(inputName, '');
    }

    dispatch(deleteRequestCalendar(inputName));

    if (inputAddButton) {
      inputAddButton.style.display = 'flex';
    }
  };

  useEffect(() => {
    if (setDatePickerRefs) {
      setDatePickerRefs(prevRefs => {
        return {
          ...prevRefs,
          [name]: {
            ...dateRef,
            setFieldValue: formProps.setFieldValue,
          },
        };
      });
    }
  }, [setDatePickerRefs]);

  useEffect(() => {
    if (!dateValue) {
      setIsLabelShown(false);
    } else {
      setIsLabelShown(true);
    }
  }, [dateValue]);

  useEffect(() => {
    if (isResetClicked) {
      setIsLabelShown(false);
      setIsResetClicked(false);
    }
  }, [isResetClicked]);

  return (
    <>
      {label && (
        <Label
          name={name}
          placeholder={placeholder}
          isLabelShown={isLabelShown}
        />
      )}

      <DatePicker
        dateRef={dateRef}
        name={name}
        classes={defaultClasses}
        placeholder={placeholder}
        defaultValue={defaultValue}
        setDateValue={setDateValue}
        formProps={formProps}
      />

      {hasDeleteButton && (
        <div
          className={cn(
            'absolute right-[-8%]',
            { 'top-[20%]': hasAddButton },
            { 'top-[36%]': !hasAddButton }
          )}
        >
          <IconButtonTemplate
            handleClick={() => {
              hasAddButton
                ? handleResetFirstDatePicker(dateRef)
                : handleDeleteInput(name);
            }}
            isSmall={true}
            icon={Trash}
          />
        </div>
      )}

      {hasAddButton && (
        <ButtonTemplate
          text={'Add another one'}
          handleClick={handleAddition}
          isSmall={true}
          classes={'mt-2 text-purpleColor underline addAnother'}
        />
      )}
    </>
  );
};
