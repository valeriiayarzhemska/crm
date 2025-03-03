import { SearchListClients } from '../../components/form/search/clients/SearchListClients';
import { validationSchema } from '../validationSchema';

const textareaVisit = `Sector/Situation: ⭐️⭐️⭐️⭐️⭐️
Interior: ⭐️⭐️⭐️⭐️⭐️
Exterior: ⭐️⭐️⭐️⭐️⭐️
Quality / Price: ⭐️⭐️⭐️⭐️⭐️
Make an Offer: ⭐️⭐️⭐️⭐️⭐️`;

export const initialValues = {
  client_id: '',
  visit_type: '',
  date: '',
  time: '',
  feedback: textareaVisit,
  duration: '',
  visit_members: [],
};

export const validationSchemaVisit = {
  client_id: validationSchema.default,
  visit_type: validationSchema.default,
  date: validationSchema.default,
  time: validationSchema.default,
};

export const visitTogleData = [
  { value: '0', title: 'Need to schedule a visit' },
  { value: 1, title: 'Visit fixed' },
  { value: 2, title: 'Visit done by another agency' },
  { value: 3, title: 'Canceled' },
  { value: 4, title: 'Visit done' },
];

export const mock = [
  {
    id: 1,
    placeholder: 'Deal',
    fieldType: 'search',
    name: 'client_id',
    classNames: 'w-full',
    searchComponent: SearchListClients,
  },
  {
    id: 2,
    name: 'visit_type',
    fieldType: 'toggle',
    toggleList: visitTogleData,
    className: 'justify-start gap-0 flex-wrap',
    classNames: 'w-full',
  },
  {
    id: 3,
    placeholder: 'Date',
    fieldType: 'calendar',
    name: 'date',
    classNames: 'w-[47%] sm:w-[30%]',
  },
  {
    id: 4,
    placeholder: 'Time',
    name: 'time',
    type: 'time',
    fieldType: 'text',
    classNames: 'w-[47%] sm:w-[30%]',
  },
  {
    id: 5,
    placeholder: 'Event duration (hours)',
    name: 'duration',
    fieldType: 'text',
    type: 'number',
    classNames: 'w-[47%] sm:w-[30%]',
  },
  {
    id: 6,
    name: 'feedback',
    textareaLabel: 'Feedback of the buyer for the seller',
    fieldType: 'textareaDefaultValue',
    defaultValue: textareaVisit,
    classes: 'h-28',
    classNames: 'w-full sm:w-1/2',
  },
];
