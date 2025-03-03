import { Settings } from 'lucide-react';
import { urgencySelectData } from '../../data/cardRealty';

export const submissionTypes = {
  presetsNone: '0',
};

export const filtersNames = {
  status: 'status',
  urgency_type: 'urgency_type',
  budget_to: 'budget_to',
};

export const initialValues = {
  search: '',
  status: '',
  urgency_type: '',
  budget_to: '',
};

export const requestDealsValues = { requests: '0', deals: 1 };

export const requestDealsTitles = {
  All: 'All',
  Requests: 'Requests',
  Deals: 'Deals',
};

export const requestDealsToggleData = [
  { id: 1, value: '0', title: requestDealsTitles.All },
  { id: 2, value: 1, title: requestDealsTitles.Requests, counter: 0 },
  { id: 3, value: 2, title: requestDealsTitles.Deals, counter: 0 },
];

export const statusSelectData = [
  {
    value: '0',
    title: 'None',
    color: 'border-gray-300 bg-gray-300',
  },
  {
    value: 1,
    title: 'Active',
    color: 'border-bluePastelColor bg-bluePastelColor',
  },
  {
    value: 2,
    title: 'Unanswered call',
    color: 'border-purpleColor bg-purpleColor text-white',
  },
  {
    value: 3,
    title: 'Duplicate request',
    color: 'border-darkBlueColor bg-darkBlueColor text-white',
  },
  {
    value: 4,
    title: 'Phone is not valid',
    color: 'border-yellowColor bg-yellowColor',
  },
  {
    value: 5,
    title: 'On pause',
    color: 'border-gray-300 bg-gray-400 text-white',
  },
  {
    value: 6,
    title: 'Finalized project',
    color: 'border-redColor bg-redColor text-white',
  },
  {
    value: 7,
    title: 'Unsuitable request (under 800k)',
    color: 'border-orangeColor bg-orangeColor text-white',
  },
  {
    value: 8,
    title: 'Unwanted request (ads, etc.)',
    color: 'border-blueColor bg-blueColor',
  },
  {
    value: 9,
    title: 'Request by an agent',
    color: 'border-pinkColor bg-pinkColor text-white',
  },
  {
    value: 10,
    title: 'Deleted',
    color: 'border-gray-300 bg-gray-300',
  },
];

const presetsSelectData = [
  { value: '0', title: 'None' },
  { value: 1, title: 'Send offers ()' },
  { value: 2, title: 'My high budget requests (0)' },
  { value: 3, title: 'Active (43)' },
  { value: 4, title: 'Active Hot (4)' },
  { value: 5, title: 'Active Very Hot (0)' },
  { value: 6, title: 'Active Hot & Very Hot (4)' },
  { value: 7, title: 'Visited with me - 2 or more (1)' },
  { value: 8, title: 'One visit with me (0)' },
];

const relationshipsSelectData = [
  { value: '0', title: 'None' },
  { value: 1, title: 'Not met' },
  { value: 2, title: 'Met' },
  { value: 3, title: 'Negotiation processed' },
];

export const mock = [
  {
    id: 1,
    name: 'search',
    placeholder: 'Search',
    fieldType: 'defaultSearch',
    classNames: 'w-[48%] sm:w-[30%] md:w-[30%]',
  },
  {
    id: 2,
    placeholder: 'Status',
    fieldType: 'multiselect',
    name: filtersNames.status,
    selectData: statusSelectData,
    classNames: 'w-[48%] sm:w-[30%] md:w-[20%] xl:w-[14%]',
  },
  {
    id: 3,
    placeholder: 'Urgency',
    fieldType: 'multiselect',
    name: filtersNames.urgency_type,
    selectData: urgencySelectData,
    classNames: 'w-[48%] sm:w-[30%] md:w-[20%] xl:w-[14%] ',
  },
  {
    id: 4,
    name: filtersNames.budget_to,
    fieldType: 'text',
    placeholder: 'Max budget more than',
    classNames: 'w-[48%] sm:w-[30%] md:w-[20%] xl:w-[14%]',
    type: 'number',
  },
  /* {
    id: 3,
    fieldType: 'checkbox',
    name: 'strictly_assigned',
    checkboxText: 'Strictly assigned',
    classNames: 'order-1',
  },
  {
    id: 4,
    placeholder: 'Presets',
    fieldType: 'select',
    defaultValue: [{ value: '0', title: 'None' }],
    name: 'presets',
    hasAdditionalButton: true,
    additionalButtonIcon: Settings,
    selectData: presetsSelectData,
    classNames: 'w-[40%] md:w-3/12 mr-6 presets hidden',
  }, */
];
