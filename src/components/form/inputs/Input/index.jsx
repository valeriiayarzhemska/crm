import { useEffect, useRef, useState } from 'react';

import { Field } from 'formik';
import { InputButtons } from '../InputButtons';

export const Input = ({
  formProps,
  label,
  icon,
  placeholder,
  name,
  searchData = [],
  tip = '',
  hint = '',
  searchComponent,
  inputType = 'input',
  type,
  isReadOnly = false,
  isResetClicked,
  setIsResetClicked,
  setInputsRefs = () => {},
  defaultClasses,
  isRequired = false,
  buttons = [],
  depedentValue = '',
  hasDepedentValue = false,
}) => {
  const [isFocused, setIsFocused] = useState();
  const [isTipShown, setIsTipShown] = useState(false);
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [closedManuallySearch, setClosedManuallySearch] = useState(false);
  const [isLabelShown, setIsLabelShown] = useState();

  const inputRef = useRef();
  const Icon = icon;
  const Label = label;
  const SearchComponent = searchComponent;

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSearch = () => {
    if (tip && isFocused) {
      setIsTipShown(true);
    } else {
      setIsTipShown(false);
    }

    if (formProps?.values?.[name]?.length > 0 || !tip) {
      setIsTipShown(false);
      setIsSearchShown(true);
    } else {
      setIsSearchShown(false);
    }
  };

  const handleEmptyList = async (data) => {
    if (data?.length < 1) {
      await formProps?.setFieldValue(name, '');
    }
  };

  useEffect(() => {
    if (!formProps?.values?.[name]) {
      setIsLabelShown(false);
    } else {
      setIsLabelShown(true);
    }
  }, [formProps?.values?.[name]]);

  useEffect(() => {
    if (isResetClicked && name !== 'search' && name !== 'find_deal') {
      setIsLabelShown(false);
      setIsResetClicked(false);
    }
  }, [isResetClicked]);

  useEffect(() => {
    if (formProps?.values?.[name] !== null) {
      if (!closedManuallySearch && isFocused) {
        handleSearch();
      }

      if (!isFocused) {
        setIsTipShown(false);
      }
    }
  }, [formProps?.values?.[name], isFocused]);

  useEffect(() => {
    if (setInputsRefs) {
      setInputsRefs(prevRefs => {
        return {
          ...prevRefs,
          [name]: {
            ...inputRef,
            setFieldValue: formProps?.setFieldValue,
          },
        };
      });
    }
  }, [setInputsRefs, name, inputRef]);

  return (
    <>
      {label && (
        <Label
          name={name}
          placeholder={placeholder}
          isLabelShown={isLabelShown}
        />
      )}

      {icon && (
        <div>
          <Icon />
        </div>
      )}

      <div className='flex items-center w-full gap-3'>
        <Field
          innerRef={inputRef}
          placeholder={placeholder}
          name={name}
          className={
            formProps?.errors?.[name] &&
            Object.keys(formProps.errors[name]).length > 0
              ? `${defaultClasses} border-redColor`
              : defaultClasses
          }
          type={type && type.length > 0 ? type : 'text'}
          as={inputType}
          value={formProps?.values?.[name]}
          onChange={formProps?.handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          readOnly={isReadOnly}
        />

        {isRequired && (
          <div className="absolute top-[30%] right-[2%]">
            <span className="text-sm text-redColor">*</span>
          </div>
        )}

        {tip && isTipShown && (
          <div className="absolute w-60 p-2 top-[44px] border-[1px] b-gray-200 bg-white shadow-md z-[1] md:w-96">
            <span className="block text-xs italic">{tip}</span>
          </div>
        )}

        {buttons && buttons.length > 0 && (
          <InputButtons
            buttons={buttons}
            formProps={formProps}
            inputRef={inputRef}
            name={name}
            depedentValue={depedentValue}
            hasDepedentValue={hasDepedentValue}
          />
        )}

        {searchComponent && isSearchShown && (
          <SearchComponent
            list={searchData}
            setIsOpen={setIsSearchShown}
            setClosedManuallySearch={setClosedManuallySearch}
            formProps={formProps}
            inputName={name}
            handleEmptyList={handleEmptyList}
          />
        )}
      </div>

      {formProps?.errors?.[name] &&
      Object.keys(formProps.errors[name]).length > 0 && (
        <div className='absolute bottom-[-18px]'>
          <span className='text-[10px] text-redColor'>{formProps.errors[name]}</span>
        </div>
      )}

      {hint && hint.length > 0 && (
        <div>
          <span className="text-[10px] text-gray-600">{hint}</span>
        </div>
      )}
    </>
  );
};
