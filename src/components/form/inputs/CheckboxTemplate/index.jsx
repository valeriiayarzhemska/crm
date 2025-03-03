import cn from 'classnames';
import { Checkbox } from '../../../ui/shadcn/checkbox';

export function CheckboxTemplate({
  formProps = { errors: {} },
  id,
  label,
  value = false,
  name,
  defaultChecked = false,
  checkboxText,
  isRequired = false,
  setCheckboxesRefs = () => {},
  handleSelectedValue = false,
  handleSelectedValues = false,
}) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={name}
        defaultChecked={defaultChecked || formProps?.values?.[name]}
        value={value}
        setFieldValue={
          formProps && formProps?.setFieldValue
            ? formProps?.setFieldValue
            : null
        }
        setCheckboxesRefs={setCheckboxesRefs}
        handleSelectedValue={handleSelectedValue}
        handleSelectedValues={handleSelectedValues}
      />
      <label
        htmlFor={name}
        className={cn(
          'relative text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          {
            'text-redColor':
              formProps.errors[name] &&
              Object.keys(formProps.errors[name]).length > 0,
          }
        )}
      >
        {checkboxText}

        {isRequired && (
          <div className="absolute top-[-2px] right-[-10%]">
            <span className="text-sm text-redColor">*</span>
          </div>
        )}
      </label>
    </div>
  );
}
