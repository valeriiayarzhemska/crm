import { useState } from 'react';
import cn from 'classnames';

import { ToggleGroup, ToggleGroupItem } from '../../../ui/shadcn/toggle-group';

import { colors } from '../../../../data/constants';

export const ToggleGroupTemplate = ({
  formProps = { errors: {} },
  name,
  defaultValue,
  toggleTitle = '',
  toggleList = [],
  toggleType = 'single',
  isDefault = false,
  disabled = false,
  className = false,
}) => {
  const [selectedValues, setSelectedValues] = useState(
    Array.isArray(defaultValue) && defaultValue.length > 0 ? defaultValue : []
  );
  const hasClasses = className && className.length > 0;
  const hasName = name && name.length > 0 ? name : 'toggle';

  const handleDefaultClick = async item => {
    if (toggleType === 'multiple') {
      await setSelectedValues(prevValues => {
        const numericPrevValues = prevValues.map(prevValue => Number(prevValue));
        const numericSelectedValue = Number(item.value);

        const updatedValues = numericPrevValues.includes(numericSelectedValue)
          ? numericPrevValues.filter(prevVal => prevVal !== numericSelectedValue)
          : [...prevValues, numericSelectedValue];

        formProps.setFieldValue(name, updatedValues);

        return updatedValues;
      });
    } else {
      formProps.setFieldValue(name, item.value);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {toggleTitle && toggleTitle.length > 0 && (
        <div>
          <span className="text-sm text-blackColor">{toggleTitle}</span>
        </div>
      )}

      {toggleType === 'multiple' ? (
        <ToggleGroup
          type={'multiple'}
          className={cn({ [className]: hasClasses })}
          name={hasName}
          defaultValue={
            defaultValue && defaultValue?.length > 0
              ? defaultValue
              : []
          }
        >
          {toggleList.map((item, index) => {
            const { id, value, icon, title, tooltipText, handleClick } = item;
            const Icon = icon;

            return (
              <div
                key={index}
                className="relative"
                onClick={
                  handleClick
                    ? handleClick
                    : () => handleDefaultClick({ value, title })
                }
              >
                <ToggleGroupItem
                  value={value}
                  aria-label={`Toggle ${value}`}
                  tooltipText={tooltipText}
                  className={
                    isDefault
                      ? 'gap-1 w-max'
                      : 'border-[1px] border-gray-200 rounded-none gap-1 w-max'
                  }
                >
                  <div>
                    {icon && (
                      <Icon
                        size={14}
                        color={colors.blackColor}
                        className={'w-full'}
                      />
                    )}
                  </div>

                  <span className="w-full">{title}</span>
                </ToggleGroupItem>
              </div>
            );
          })}
        </ToggleGroup>
      ) : (
        <ToggleGroup
          type="single"
          defaultValue={
            defaultValue &&
            Object.keys(defaultValue).length > 0 &&
            (defaultValue?.value || defaultValue?.value === 0)
              ? defaultValue.value === 0
                ? '0'
                : defaultValue.value
              : false
          }
          className={cn(
            { [className]: hasClasses },
            { 'opacity-70 pointer-events-none': disabled }
          )}
          name={hasName}
        >
          {toggleList.map((item, index) => {
            const {
              id,
              value,
              icon,
              title,
              tooltipText,
              counter,
              handleClick,
            } = item;
            const Icon = icon;

            return (
              <div
                key={index}
                className="relative"
                onClick={
                  handleClick
                    ? handleClick
                    : () => handleDefaultClick({ value, title })
                }
              >
                <ToggleGroupItem
                  value={value}
                  aria-label={`Toggle ${value}`}
                  tooltipText={tooltipText}
                  className={
                    isDefault
                      ? 'gap-1 w-max'
                      : 'border-[1px] border-gray-200 rounded-none gap-1 w-max'
                  }
                  disabled={disabled}
                >
                  <div>
                    {icon && (
                      <Icon
                        size={14}
                        color={colors.blackColor}
                      />
                    )}
                  </div>

                  <span className="w-full">{title}</span>

                  {counter || counter === 0 ? (
                    <div>
                      <span className="p-0.5 text-[10px] text-white bg-blueColor rounded">
                        {counter.toString()}
                      </span>
                    </div>
                  ) : null}
                </ToggleGroupItem>
              </div>
            );
          })}
        </ToggleGroup>
      )}

      {formProps &&
      formProps?.errors[name] &&
      Object.keys(formProps?.errors[name]).length > 0 && (
        <span className="absolute top-[-10px] text-[10px] text-redColor">
          This field is required
        </span>
      )}
    </div>
  );
};
