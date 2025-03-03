import { useEffect, useRef, useState, forwardRef } from 'react';
import cn from 'classnames';

const InputDefaultSearch = forwardRef(
  (
    {
      formProps,
      id,
      label,
      placeholder,
      name,
      handleSearch = false,
      errors,
      classNames = '',
      setSearchValues = () => {},
      defaultValue = '',
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(searchQuery.length > 0);
    const [isLabelShown, setIsLabelShown] = useState(searchQuery.length > 0);

    const inputRef = useRef();
    const Label = label;

    const defaultClasses =
      'block flex-1 w-full text-sm leading-6 border-b border-gray-200 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none';

    const handleSearchInput = event => {
      const inputValue = event.target.value;

      setSearchQuery(inputValue);
      formProps.setFieldValue(name, inputValue);
    };

    const handleEmptySearchInput = () => {
      setSearchQuery('');
      formProps.setFieldValue(name, '');
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    useEffect(() => {
      if (handleSearch) {
        handleSearch(searchQuery);
      }
    }, [searchQuery, handleSearch]);

    useEffect(() => {
      if (setSearchValues) {
        setSearchValues(prevValues => {
          return {
            ...prevValues,
            [name]: {
              ...inputRef,
              setEmptySearchValue: handleEmptySearchInput,
            },
          };
        });
      }
    }, [setSearchValues, name, inputRef]);

    useEffect(() => {
      if (!searchQuery) {
        setIsLabelShown(false);
      } else {
        setIsLabelShown(true);
      }
    }, [searchQuery]);

    useEffect(() => {
      const defaultValueString = defaultValue?.toString();

      if (defaultValueString && defaultValueString?.length > 0) {
        setSearchQuery(defaultValueString);
        formProps.setFieldValue(name, defaultValueString);
      }
    }, []);

    return (
      <>
        {label && (
          <Label
            name={name}
            placeholder={placeholder}
            isLabelShown={isLabelShown}
          />
        )}

        <input
          ref={ref}
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchInput}
          name={name}
          className={
            errors ? `${defaultClasses} border-redColor` : defaultClasses
          }
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </>
    );
  }
);

InputDefaultSearch.displayName = 'InputDefaultSearch';

export default InputDefaultSearch;
