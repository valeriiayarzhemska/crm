import { useState } from 'react';

export const InputMinMax = ({
  formProps,
  classNames,
  title,
  inputs = [],
  setStatesInputsMinMax,
}) => {
  const [minValue, setMinValue] = useState(
    formProps?.values[inputs[0]?.name] ? formProps?.values[inputs[0]?.name] : ''
  );
  const [maxValue, setMaxValue] = useState(
    formProps?.values[inputs[1]?.name] ? formProps?.values[inputs[1]?.name] : ''
  );

  const inputClasses =
    'py-1.5 px-1 w-2/6 text-sm text-gray-900 border-b-[1px] border-b-gray-200 focus:ring-0 focus:outline-none sm:w-2/5 md:w-1/2';

  const handleMinValueChange = async event => {
    const value = parseInt(event.target.value);

    if (value) {
      setMinValue(value);
      await formProps.setFieldValue(inputs[0]?.name, value);
    } else {
      setMinValue('');
      await formProps.setFieldValue(inputs[0]?.name, '');
    }
    if (minValue && value <= minValue) {
      await formProps.setFieldError([inputs[1]?.name], 'Error');
    } else {
      await formProps.setErrors(errors => {
        const newErrors = { ...errors };
        delete newErrors[inputs[1]?.name];

        return newErrors;
      });
    }

    if (maxValue && value >= maxValue) {
      await formProps.setFieldError([inputs[0]?.name], 'Error');
    } else {
      await formProps.setErrors(errors => {
        const newErrors = { ...errors };
        delete newErrors[inputs[0]?.name];

        return newErrors;
      });
    }
    // setStatesInputsMinMax({ min: value, max: maxValue });
  };

  const handleMaxValueChange = async event => {
    const value = parseInt(event.target.value);

    if (value) {
      setMaxValue(value);
      await formProps.setFieldValue(inputs[1]?.name, value);
    } else {
      setMaxValue('');
      await formProps.setFieldValue(inputs[1]?.name, '');
    }

    if (minValue && value <= minValue) {
      await formProps.setFieldError([inputs[1]?.name], 'Error');
    } else {
      await formProps.setErrors(errors => {
        const newErrors = { ...errors };
        delete newErrors[inputs[1]?.name];

        return newErrors;
      });
    }
    // setStatesInputsMinMax({ min: minValue, max: value });
  };

  return (
    <div className={classNames}>
      <div className="min-w-[60px] w-[30%] sm:w-[40%] md:w-[16%] md:min-w-[72px] lg:-[14%]">
        <span className="text-xs color-blackColor md:text-sm">{title}</span>
      </div>

      <div className="flex gap-2 md:gap-5">
        <input
          type="number"
          className={
            formProps.errors[inputs[0]?.name] &&
            Object.keys(formProps.errors[inputs[0]?.name]).length > 0
              ? `${inputClasses} border-b-redColor`
              : inputClasses
          }
          value={minValue}
          placeholder={inputs[0]?.placeholder}
          name={inputs[0]?.name}
          onChange={handleMinValueChange}
        />

        <input
          type="number"
          className={
            formProps.errors[inputs[1]?.name] &&
            Object.keys(formProps.errors[inputs[1]?.name]).length > 0
              ? `${inputClasses} border-b-redColor`
              : inputClasses
          }
          value={maxValue}
          placeholder={inputs[1]?.placeholder}
          name={inputs[1]?.name}
          onChange={handleMaxValueChange}
        />
      </div>
    </div>
  );
};
