import { Fragment, useCallback } from 'react';

import cn from 'classnames';

import { InputFromTo } from '../InputFromTo';
import { ToggleGroupTemplate } from '../ToggleGroupTemplate';
import { RadioGroupTemplate } from '../RadioGroupTemplate';
import { CheckboxTemplate } from '../CheckboxTemplate';
import { Input } from '../Input';
import { InputSelect } from '../InputSelect';
import { InputLabel } from '../InputLabel';
import { InputCalendar } from '../InputCalendar';
import { InputKeywords } from '../InputKeywords';
import { InputTextarea } from '../InputTextarea';
import InputDefaultSearch from '../InputDefaultSearch';
import { InputMinMax } from '../InputMinMix';
import { CheckboxList } from '../CheckboxList';

import { fieldTypes } from '../../../../data/constants';
import { InputSelectDepedent } from '../InputSelectDepedent';

export const InputsTemplate = ({
  formProps,
  children,
  inputsList = [],
  isWithoutButton = false,
  isDataLoading = false,
  setMultiSelectRefs = () => {},
  setInputsRefs = () => {},
  setSearchValues = () => {},
  setDatePickerRefs = () => {},
  setCheckboxesRefs = () => {},
  setStatesInputsFromTo = () => {},
  isResetClicked = false,
  setIsResetClicked = () => {},
}) => {
  const defaultClasses =
    'block flex-1 w-full text-sm leading-6 border-b border-gray-200 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none rounded-none';

  const InputType = useCallback(
    (item, formProps) => {
      switch (item?.fieldType) {
      case fieldTypes.text:
      case fieldTypes.search:
        return (
          <Input
            key={item?.id}
            formProps={formProps?.formProps}
            label={InputLabel}
            setInputsRefs={setInputsRefs}
            setIsResetClicked={setIsResetClicked}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      case fieldTypes.defaultSearch:
        return (
          <InputDefaultSearch
            key={item?.id}
            formProps={formProps?.formProps}
            label={InputLabel}
            setSearchValues={setSearchValues}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      case fieldTypes.select:
      case fieldTypes.multiselect:
        return (
          <InputSelect
            key={item?.id}
            formProps={formProps?.formProps}
            label={InputLabel}
            isWithoutButton={isWithoutButton}
            setIsResetClicked={setIsResetClicked}
            setMultiSelectRefs={setMultiSelectRefs}
            {...Object.keys(item).reduce((acc, key) => {
              acc[key] = item[key];

              return acc;
            }, {})}
          />
        );
      case fieldTypes.selectDepedent:
      case fieldTypes.multiselectDepedent:
        return (
          <InputSelectDepedent
            key={item?.id}
            formProps={formProps?.formProps}
            label={InputLabel}
            isWithoutButton={isWithoutButton}
            setIsResetClicked={setIsResetClicked}
            setMultiSelectRefs={setMultiSelectRefs}
            {...Object.keys(item).reduce((acc, key) => {
              acc[key] = item[key];

              return acc;
            }, {})}
          />
        );
      case fieldTypes.fromTo:
        return (
          <InputFromTo
            key={item?.id}
            formProps={formProps?.formProps}
            label={InputLabel}
            setIsResetClicked={setIsResetClicked}
            setStatesInputsFromTo={setStatesInputsFromTo}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      case fieldTypes.calendar:
        return (
          <InputCalendar
            key={item?.id}
            formProps={formProps?.formProps}
            label={InputLabel}
            setIsResetClicked={setIsResetClicked}
            setDatePickerRefs={setDatePickerRefs}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      case fieldTypes.keywords:
        return (
          <InputKeywords
            key={item?.id}
            formProps={formProps?.formProps}
            label={InputLabel}
            setIsResetClicked={setIsResetClicked}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      case fieldTypes.toggle:
        return (
          <ToggleGroupTemplate
            key={item?.id}
            formProps={formProps?.formProps}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      case fieldTypes.checkbox:
        return (
          <CheckboxTemplate
            key={item?.id}
            formProps={formProps?.formProps}
            setCheckboxesRefs={setCheckboxesRefs}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      case fieldTypes.checkboxList:
        return (
          <CheckboxList
            key={item?.id}
            formProps={formProps?.formProps}
            setCheckboxesRefs={setCheckboxesRefs}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      case fieldTypes.radio:
        return (
          <RadioGroupTemplate
            key={item?.id}
            formProps={formProps?.formProps}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      case fieldTypes.textarea:
      case fieldTypes.textareaDefaultValue:
        return (
          <InputTextarea
            key={item?.id}
            formProps={formProps?.formProps}
            label={InputLabel}
            isWithoutButton={isWithoutButton}
            {...Object.keys(item).reduce((acc, key) => {
              acc[key] = item[key];

              return acc;
            }, {})}
          />
        );
      case fieldTypes.minMax:
        return (
          <InputMinMax
            key={item?.id}
            formProps={formProps?.formProps}
            {...Object.keys(item).reduce((acc, key) => {
              if (key !== 'fieldType') {
                acc[key] = item[key];
              }
              return acc;
            }, {})}
          />
        );
      /* case fieldTypes.defaultSearch:
      return <></>; */
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputsList]
  );

  return (
    <>
      {inputsList.length > 0 &&
        inputsList?.map((item, index) => (
          <Fragment key={index}>
            {item?.isBorderTop && (
              <div className="mt-4 h-[1px] w-full bg-gray-100"></div>
            )}

            {item?.subtitle && (
              <div className="mt-4 w-full">
                <span className="pl-4 border-l-4 border-greenMintColor text-sm font-bold text-blue-800 uppercase">
                  {item.subtitle}
                </span>
              </div>
            )}

            <div
              className={cn(item.classNames, 'relative pt-1.5', {
                'w-2/6': !item.classNames,
              })}
            >
              <InputType
                formProps={formProps}
                defaultClasses={defaultClasses}
                isResetClicked={isResetClicked}
                isDataLoading={isDataLoading}
                {...item}
              />
            </div>
          </Fragment>
        ))}
    </>
  );
};
