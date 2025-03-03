import { Label } from '../../../ui/shadcn/label';
import { RadioGroup, RadioGroupItem } from '../../../ui/shadcn/radio-group';

export const RadioGroupTemplate = ({
  formProps,
  name,
  defaultValue = {},
  radioList = [],
  isRequired = false,
  className = false,
}) => {
  const hasDefaultValue =
    defaultValue &&
    Object.keys(defaultValue).length > 0 &&
    defaultValue?.value === 0
      ? '0'
      : defaultValue?.value;

  const handleChange = event => {
    const selectedGender = event.target.value;

    formProps.setFieldValue(name, selectedGender);
  };

  return (
    <RadioGroup
      name={name}
      defaultValue={hasDefaultValue ? hasDefaultValue : false}
      onChange={handleChange}
    >
      {radioList.map((item, index) => {
        return (
          <div
            key={item.id}
            className="relative flex items-center space-x-2"
          >
            <RadioGroupItem
              value={item.value}
              id={item.value}
            />
            <Label
              className={`font-normal text-sm ${
                formProps.errors[name] &&
                Object.keys(formProps.errors[name]).length > 0
                  ? 'text-redColor'
                  : 'text-blackColor'
              }`}
              htmlFor={item.value}
            >
              {item.title}
            </Label>

            {isRequired && index === radioList.length - 1 && (
              <div className="absolute top-0 right-[-18%]">
                <span className="text-sm text-redColor">*</span>
              </div>
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
};
