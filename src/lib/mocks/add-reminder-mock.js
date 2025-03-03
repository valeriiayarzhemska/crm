import { colors, tabs } from '../../data/constants';
import { validationSchema } from '../validationSchema';

export const reminderValues = {
  reminder_subtype: 'reminder_subtype',
  subject: 'subject',
  date: 'date',
  reminder_type: 'reminder_type',
};

export const initialValues = {
  [reminderValues.reminder_subtype]: '',
  [reminderValues.subject]: '',
  [reminderValues.date]: '',
  [reminderValues.reminder_type]: '',
};

export const validationSchemaReminder = {
  [reminderValues.reminder_subtype]: validationSchema.default,
  [reminderValues.subject]: validationSchema.default,
  [reminderValues.date]: validationSchema.default,
  [reminderValues.reminder_type]: validationSchema.default,
};

export const reminderTypeTogleData = [
  { value: '0', title: 'None', color: 'gray-200' },
  { value: 1, title: 'Urgent', color: 'redColor' },
  { value: 2, title: 'Important', color: 'orangeColor' },
];

export const mock = [
  {
    id: 1,
    name: reminderValues.reminder_subtype,
    fieldType: 'toggle',
    toggleList: tabs,
    className: 'justify-start gap-0 flex-wrap',
    classNames: 'w-full',
  },
  {
    id: 2,
    placeholder: 'Subject',
    fieldType: 'textarea',
    name: reminderValues.subject,
    classNames: 'w-full',
  },
  {
    id: 3,
    placeholder: 'Date',
    fieldType: 'calendar',
    name: reminderValues.date,
    classNames: 'w-full',
  },
  {
    id: 4,
    name: reminderValues.reminder_type,
    fieldType: 'toggle',
    toggleList: reminderTypeTogleData,
    className: 'justify-start gap-0 flex-wrap',
    classNames: 'w-full',
  },
];
