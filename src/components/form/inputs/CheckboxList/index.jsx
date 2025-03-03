import { useEffect, useState } from 'react';

import { CheckboxTemplate } from '../CheckboxTemplate';

export const CheckboxList = ({
  formProps,
  name,
  checkboxes = [],
  defaultValue = [],
}) => {
  const [selectedValues, setSelectedValues] = useState(
    defaultValue && defaultValue.length > 0 ? defaultValue : []
  );

  const handleSelectedValues = async value => {
    let updatedValues = [];
    const numericSelectedValues = selectedValues.map(selectedvVal =>
      Number(selectedvVal)
    );
    const valueNum = Number(value);

    if (numericSelectedValues.includes(valueNum)) {
      updatedValues = await numericSelectedValues.filter(
        item => item !== valueNum
      );
    } else {
      updatedValues = [...selectedValues];
      updatedValues.push(valueNum);
    }

    setSelectedValues(updatedValues);

    if (formProps && formProps?.setFieldValue) {
      await formProps.setFieldValue(name, updatedValues);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 w-full md:gap-5">
      {checkboxes.map((checkbox, index) => {
        const { name, checkboxText, isRequired, value } = checkbox;

        const numeriSelectedValues = selectedValues.map(selectedvVal =>
          Number(selectedvVal)
        );

        return (
          <CheckboxTemplate
            key={index}
            defaultChecked={numeriSelectedValues?.includes(Number(value))}
            value={value}
            formProps={formProps}
            name={name}
            handleSelectedValues={handleSelectedValues}
            checkboxText={checkboxText}
            isRequired={isRequired}
          />
        );
      })}
    </div>
  );
};
