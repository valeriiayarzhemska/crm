import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '../../../lib/utils';

const Checkbox = React.forwardRef(
  (
    {
      className,
      id,
      value = false,
      defaultChecked = false,
      onChange,
      setCheckboxesRefs = () => {},
      setFieldValue = () => {},
      handleSelectedValue = false,
      handleSelectedValues = false,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);

    const handleChange = async (isChecked, isFirstRender) => {
      setIsChecked(isChecked);

      if (handleSelectedValue) {
        await handleSelectedValue(value);
      } else if (handleSelectedValues && !isFirstRender) {
        await handleSelectedValues(value);
      } else {
        if (onChange) {
          await onChange(isChecked);
        }

        if (setFieldValue) {
          await setFieldValue(id, isChecked);
        }
      }
    };

    React.useEffect(() => {
      if (setCheckboxesRefs) {
        setCheckboxesRefs(prevRefs => {
          return {
            ...prevRefs,
            [id]: {
              setCheckboxValue: handleChange,
            },
          };
        });
      }
    }, [setCheckboxesRefs, id]);

    React.useEffect(() => {
      if (defaultChecked) {
        const isDefaultChecked = true;
        const isFirstRender = true;

        handleChange(isDefaultChecked, isFirstRender);
      }
    }, []);

    return (
      <CheckboxPrimitive.Root
        id={id}
        ref={ref}
        name={id}
        className={cn(
          'peer h-4 w-4 shrink-0 rounded-sm border border-gray-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-greenColor data-[state=checked]:text-gray-200-foreground',
          className
        )}
        checked={isChecked}
        onCheckedChange={handleChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
