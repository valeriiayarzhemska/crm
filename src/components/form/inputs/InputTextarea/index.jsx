import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { fieldTypes } from '../../../../data/constants';

export const InputTextarea = ({
  formProps = { values: [], errors: {} },
  label,
  name,
  placeholder,
  fieldType,
  textareaLabel,
  defaultValue = '',
  classes = '',
  isWithoutButton = false,
  handleSubmit = () => {},
}) => {
  const [isLabelShown, setIsLabelShown] = useState();
  const [value, setValue] = useState(defaultValue || '');

  const inputRef = useRef();
  const Label = label;

  const isDefaultValue = fieldType === fieldTypes.textareaDefaultValue;
  const hasClasses = classes && classes.length > 0;
  const defaultHeightClasses = 'min-h-20 h-[186px]';

  const handleChange = e => {
    setValue(e.target.value);
  };

  useEffect(
    () => {
      if (!formProps.values[name] || value) {
        setIsLabelShown(false);
      } else {
        setIsLabelShown(true);
      }
    },
    [formProps?.values[name]] || value
  );

  useEffect(() => {
    if (isDefaultValue && formProps?.setFieldValue) {
      formProps?.setFieldValue(name, defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      {label && (
        <Label
          name={name}
          placeholder={placeholder}
          isLabelShown={isLabelShown}
        />
      )}

      {isDefaultValue && (
        <label className="text-xs text-gray-700">
          {textareaLabel ? textareaLabel : 'Research details / Notes'}

          <textarea
            ref={inputRef}
            name={name}
            rows="1"
            className={cn(
              'w-full text-sm text-blackColor overflow-x-hidden border-b-[1px] border-b-gray-200 pb-0.5 bg-transparent focus:outline-none focus:border-b-blue-900',
              { [classes]: hasClasses },
              { [defaultHeightClasses]: !hasClasses }
            )}
            defaultValue={defaultValue ? defaultValue : ''}
            onBlur={() => {
              if (isWithoutButton) {
                handleSubmit({ [name]: value });
              }
            }}
            onChange={
              Object.prototype.hasOwnProperty.call(formProps, 'handleChange')
                ? formProps.handleChange
                : handleChange
            }
          ></textarea>
        </label>
      )}

      {!isDefaultValue && (
        <textarea
          ref={inputRef}
          placeholder={placeholder}
          name={name}
          rows="1"
          className={cn(
            'w-full min-h-[37px] text-sm overflow-x-hidden border-b-[1px] pb-0.5 bg-transparent focus:outline-none',
            { [classes]: hasClasses },
            {
              'text-blackColor border-b-gray-200':
                !formProps?.errors?.[name] &&
                !Object.prototype.hasOwnProperty.call(formProps?.errors, name),
            },
            {
              'text-redColor border-b-redColor':
                formProps?.errors?.[name] &&
                Object.prototype.hasOwnProperty.call(formProps?.errors, name),
            }
          )}
          value={
            Object.prototype.hasOwnProperty.call(formProps, 'values')
              ? formProps.values[name]
              : value
          }
          onChange={formProps.handleChange}
        ></textarea>
      )}
    </>
  );
};
