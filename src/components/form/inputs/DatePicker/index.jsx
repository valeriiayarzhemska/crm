'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '../../../../lib/utils';
import { Button } from '../../../ui/shadcn/button';
import { Calendar } from '../../../ui/shadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../ui/shadcn/popover';
import { transformDateToString } from '../../../../utils/utils';

export function DatePicker({
  dateRef,
  defaultValue = '',
  formProps = { setFieldValue: () => {} },
  setDateValue = () => {},
  name = '',
  placeholder = '',
  classes = '',
}) {
  const [date, setDate] = React.useState(defaultValue ? defaultValue : '');

  const clearDate = () => {
    setDate(null);
  };

  React.useImperativeHandle(dateRef, () => ({
    clearDate: () => {
      clearDate();
    },
  }));

  React.useEffect(() => {
    if (date) {
      const formattedDate = transformDateToString(date);

      setDateValue(formattedDate);

      if (formProps?.setFieldValue) {
        formProps.setFieldValue(name, formattedDate);
      }
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'flex-row w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            classes,
            'flex border-t-0 border-l-0 border-r-0 rounded-none',
            {
              'border-b-redColor':
                formProps?.errors[name] &&
                Object.keys(formProps?.errors[name]).length > 0,
            }
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP')
          ) : (
            <span className="font-normal text-gray-400 text-sm leading-6">
              {placeholder}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
