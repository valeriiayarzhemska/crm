import { useEffect, useRef, useState } from 'react';

import { ChevronDown, X } from 'lucide-react';
import Multiselect from 'multiselect-react-dropdown';

import {
  colors,
  dataTypes,
  fieldTypes,
  multiSelectStyles,
} from '../../../../data/constants';
import { Loader } from '../../../ui/Loader';
import { ButtonTemplate } from '../../../ui/buttons/ButtonTemplate';
import { InputButtons } from '../InputButtons';
import { useSelector } from 'react-redux';
import {
  citiesData,
  districtsData,
  streetsData,
  streetsNumbersData,
} from '../../../../redux/features/dashboard/dashboardSelectors';

export const InputSelect = ({
  formProps = { values: [] },
  label,
  isGrouped = false,
  name,
  defaultValue,
  isWithoutButton = false,
  isDataLoading = false,
  fieldType,
  placeholder,
  selectData = [],
  buttons = [],
  isResetClicked = false,
  setIsResetClicked,
  setMultiSelectRefs,
  isRequired = false,
  hint = '',
  handleSelection = () => {},
  selectDataRedux = false,
  depedentValue = '',
  hasDepedentValue = false,
}) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [isFocused, setIsFocused] = useState();
  const [options, setOptions] = useState(selectData);
  const [isLabelShown, setIsLabelShown] = useState(false);

  const selectRef = useRef();
  const Label = label;

  const hasGroup = isGrouped ? 'group' : '';

  const hasDefaultValue =
    defaultValue && defaultValue.length > 0 ? defaultValue : [];
  const isMultiselect =
    fieldType === fieldTypes.multiselect ||
    fieldType === fieldTypes.multiselectDepedent
      ? true
      : false;

  const handleRemove = (selectedList, removedItem) => {
    const valuesList = selectedList.map(item => item.value);

    if (!removedItem || removedItem.length < 1) {
      setSelectedValue([]);
    } else {
      setSelectedValue(valuesList);
    }

    if (isMultiselect) {
      formProps?.setFieldValue(name, valuesList);
    }

    if (handleSelection && isMultiselect) {
      handleSelection(valuesList, name, removedItem);
    }
  };

  const handleSelect = async (selectedList, selectedItem) => {
    const valuesList = selectedList.map(item => {
      if (Number(item.value)) {
        return Number(item.value);
      } else {
        return item.value;
      }
    });

    setSelectedValue(selectedList);

    if (isMultiselect) {
      await formProps?.setFieldValue(name, valuesList);
    } else if (!isMultiselect) {
      await formProps?.setFieldValue(name, selectedItem.value);
    }

    if (formProps?.errors?.[name]) {
      formProps?.validateField(name);
    }

    if (handleSelection && !isMultiselect) {
      handleSelection(selectedItem, name);
    } else if (handleSelection && isMultiselect) {
      handleSelection(valuesList, name);
    }
  };

  const handleBlur = () => {
    if (formProps?.values?.[name]?.length === 0) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (selectDataRedux) {
      setOptions(selectDataRedux);
    }
  }, [selectDataRedux]);

  useEffect(() => {
    setOptions(selectData);
  }, []);

  useEffect(() => {
    if (setMultiSelectRefs) {
      setMultiSelectRefs(prevRefs => {
        return {
          ...prevRefs,
          [name]: {
            ...selectRef,
            setFieldValue: formProps?.setFieldValue,
            setSelectedValue: setSelectedValue,
          },
        };
      });
    }
  }, [setMultiSelectRefs, name, selectRef]);

  useEffect(() => {
    if (
      !formProps?.values?.[name]?.length &&
      !selectedValue?.length &&
      !hasDefaultValue?.length
    ) {
      setIsLabelShown(false);
    } else {
      setIsLabelShown(true);
    }
  }, [
    formProps?.values?.[name]?.length,
    selectedValue?.length,
    hasDefaultValue?.length,
  ]);

  useEffect(() => {
    if (isResetClicked) {
      setIsLabelShown(false);
      setIsResetClicked(false);
    }
  }, [isResetClicked]);

  return (
    <>
      <div className="flex items-center w-full gap-3 multiselectInput">
        {label && isLabelShown && (
          <Label
            name={name}
            placeholder={placeholder}
            isLabelShown={isLabelShown}
          />
        )}

        <Multiselect
          ref={selectRef}
          displayValue="title"
          name={name}
          selectedValues={hasDefaultValue}
          groupBy={hasGroup}
          onKeyPressFn={function noRefCheck() {}}
          onRemove={handleRemove}
          onSearch={function noRefCheck() {}}
          onSelect={handleSelect}
          onBlur={handleBlur}
          onFocus={() => {}}
          placeholder={placeholder}
          options={options}
          showCheckbox={isMultiselect}
          singleSelect={!isMultiselect}
          showArrow
          customArrow={
            <ChevronDown
              size={14}
              color={colors.arrowColor}
            />
          }
          customCloseIcon={
            <X
              size={10}
              color={colors.arrowColor}
            />
          }
          style={{
            chips: {
              gap: '4px',
              background: colors.lightGrayColor,
              color: colors.blackColor,
            },
            multiSelectContainer: {
              marginTop: 0,
            },
            searchBox: {
              height: '37px',
              overflow: 'scroll',
              fontSize: '0.875rem',
              border: 'none',
              borderBottom:
                formProps.errors[name] &&
                Object.keys(formProps.errors[name]).length > 0
                  ? '1px solid rgb(232 72 85)'
                  : '1px solid rgb(229 231 235)',
              borderRadius: '0px',
            },
            optionContainer: {
              backgroundColor: '#fff',
            },
          }}
        />

        {isRequired && (
          <div className="absolute top-[30%] right-[11%] sm:right-[9%]">
            <span className="text-sm text-redColor">*</span>
          </div>
        )}

        {isDataLoading && (
          <div className="absolute top-[36%] right-[16%] sm:right-[13%]">
            <Loader />
          </div>
        )}

        {buttons && buttons.length > 0 && (
          <InputButtons
            buttons={buttons}
            formProps={formProps}
            handleRemove={handleRemove}
            selectedList={selectedValue}
            setSelectedValue={setSelectedValue}
            inputRef={selectRef}
            name={name}
            depedentValue={depedentValue}
            hasDepedentValue={hasDepedentValue}
          />
        )}
      </div>

      {hint && hint.length > 0 && (
        <div>
          <span className="text-[10px] text-gray-600">{hint}</span>
        </div>
      )}
    </>
  );
};
