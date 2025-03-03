import { useState, useRef, useEffect } from 'react';

import { formatNumericValue } from '../../../../utils/utils';

export const InputFromTo = ({
  formProps,
  defaultClasses,
  defaultValue = [],
  label,
  name,
  placeholder,
  type,
  isResetClicked,
  setIsResetClicked,
  setStatesInputsFromTo,
}) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fromValue, setFromValue] = useState(
    defaultValue?.[0] || defaultValue?.[0] === 0 ? defaultValue[0] : ''
  );
  const [fromToValue, setFromToValue] = useState('');
  const [toValue, setToValue] = useState(
    defaultValue?.[1] || defaultValue?.[1] === 0 ? defaultValue[1] : ''
  );
  const [isLabelShown, setIsLabelShown] = useState();

  const dropdownRef = useRef(null);
  const Label = label;

  const fromName = `${name}_from`;
  const toName = `${name}_to`;

  const inputClasses =
    'flex flex-col gap-2 flex-1 w-full border border-gray-200 bg-white p-1 text-xs text-gray-900 focus:ring-0 focus:outline-none';

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        handleSubmit();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fromValue, toValue]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    const newValue = value.replace(/\D/g, '');

    if (name === fromName) {
      setFromValue(newValue);
    } else if (name === toName) {
      setToValue(newValue);
    }
  };

  const handleSubmit = () => {
    const from = formatNumericValue(fromValue);
    const to = formatNumericValue(toValue);

    if (from && to) {
      setFromToValue(`${from} .. ${to}`);
    } else if (from && !to) {
      setFromToValue(`From ${from}`);
    } else if (!from && to) {
      setFromToValue(`To ${to}`);
    } else {
      setFromToValue('');
    }
  };

  useEffect(() => {
    setStatesInputsFromTo(prevState => [
      ...prevState,
      setFromToValue,
      setFromValue,
      setToValue,
    ]);
  }, [setFromToValue, setFromValue, setToValue, dropdownRef]);

  useEffect(() => {
    setSelectedValue(fromToValue);

    if (formProps?.setFieldValue) {
      const newValue = fromValue && toValue ? [fromValue, toValue] : [];

      formProps?.setFieldValue(name, newValue);
    }
  }, [fromToValue]);

  useEffect(() => {
    if (!selectedValue) {
      setIsLabelShown(false);
    } else {
      setIsLabelShown(true);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (isResetClicked) {
      setIsLabelShown(false);
      setIsResetClicked(false);
    }
  }, [isResetClicked]);

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      handleSubmit();
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

      <input
        type="text"
        className={`${defaultClasses} pt-[0.3rem] pb-[0.42rem]`}
        value={fromToValue}
        placeholder={placeholder}
        name={name}
        readOnly
        onClick={toggleDropdown}
      />

      {showDropdown && (
        <div
          className="absolute flex flex-col gap-2 p-2 bg-gray-200 lg:flex-row z-[2]"
          ref={dropdownRef}
        >
          <label>
            {type ? `From, ${type}` : 'From'}
            <input
              name={fromName}
              type="text"
              value={fromValue}
              onChange={handleInputChange}
              className={inputClasses}
            />
          </label>

          <label>
            {type ? `To, ${type}` : 'To'}
            <input
              name={toName}
              type="text"
              value={toValue}
              onChange={handleInputChange}
              className={inputClasses}
            />
          </label>
        </div>
      )}
    </>
  );
};
