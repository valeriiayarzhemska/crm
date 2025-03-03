import { SearchListRealty } from '../../components/form/search/realties/SearchListRealty';
import { SearchListClients } from '../../components/form/search/clients/SearchListClients';
import {
  residencesSearchData,
  residencesSearchDataLoading,
  streetsSearchData,
  streetsSearchDataLoading,
} from '../../redux/features/dashboard/dashboardSelectors';
import {
  statusSelectData,
  urgentResearchSelectData,
  yesSelectData,
} from '../../data/constants';

export const initialSearchValuesNames = {
  search: 'search',
  properties: 'properties',
  find_deal: 'find_deal',
};

export const initialSearchValues = {
  [initialSearchValuesNames.search]: '',
  [initialSearchValuesNames.properties]: '',
  [initialSearchValuesNames.find_deal]: '',
};

export const searchValuesNames = {
  city: 'city',
  realty_status: 'realty_status',
  realty_type: 'realty_type',
  budget: 'budget',
  residence: 'residence',
  land: 'land',
  bedroom: 'bedroom',
  living_area: 'living_area',
  street: 'street',
  off_plan: 'off_plan',
  mandate: 'mandate',
  user: 'user',
  localisation: 'localisation',
  owner_contacts: 'owner_contacts',
  web_link: 'web_link',
  urgent_research: 'urgent_research',
  fix_visits: 'fix_visits',
  sold_realty: 'sold_realty',
  date_from: 'date_from',
  date_to: 'date_to',
  sort_by: 'sort_by',
};

export const initialAdditionalValues = {
  [searchValuesNames.city]: '',
  [searchValuesNames.realty_status]: '',
  [searchValuesNames.realty_type]: '',
  [searchValuesNames.budget]: '',
  [searchValuesNames.residence]: '',
  [searchValuesNames.land]: '',
  [searchValuesNames.bedroom]: '',
  [searchValuesNames.living_area]: '',
  [searchValuesNames.street]: '',
  [searchValuesNames.off_plan]: '',
  [searchValuesNames.mandate]: '',
  [searchValuesNames.user]: '',
  [searchValuesNames.localisation]: '',
  [searchValuesNames.owner_contacts]: '',
  [searchValuesNames.web_link]: '',
  [searchValuesNames.urgent_research]: '',
  [searchValuesNames.fix_visits]: '',
  [searchValuesNames.sold_realty]: '',
  [searchValuesNames.date_from]: '',
  [searchValuesNames.date_to]: '',
  //keywords: '',
};

export const initialSortValues = {
  [searchValuesNames.sort_by]: '',
};

export const initialValues = {
  ...initialSearchValues,
  ...initialAdditionalValues,
  ...initialSortValues,
};

const propertiesSelectData = [
  { value: '0', title: 'None' },
  { value: 1, title: 'Mandate in progress' },
  { value: 2, title: 'Mandates not published' },
  { value: 3, title: 'My opportunities mandate' },
  { value: 4, title: 'My signed mandates' },
  { value: 5, title: 'My new listings' },
  { value: 6, title: 'My network' },
];

const typeSelectData = [
  { value: '0', title: 'Apartment' },
  { value: 1, title: 'Villa' },
  { value: 2, title: 'Land' },
];

const yesNoSelectData = [
  { value: 1, title: 'Yes' },
  { value: '0', title: 'No' },
];

export const mandateSelectData = [
  { value: '0', title: 'None' },
  { value: 1, title: 'Co-exclusive' },
  { value: 2, title: 'Colleague' },
  { value: 3, title: 'Delegation' },
  { value: 4, title: 'Exclusive' },
  { value: 5, title: 'Simple' },
  { value: 6, title: 'Verbal' },
];

export const localisationSelectData = [
  { value: '0', title: 'Empty', titleBack: 'empty' },
  { value: 1, title: 'Not found', titleBack: 'not_found' },
  { value: 2, title: 'No address in cadastre', titleBack: 'no_in_cadastre' },
  { value: 3, title: 'Found', titleBack: 'found' },
  { value: 4, title: 'Checked', titleBack: 'checked' },
];

const contactsSelectData = [
  { value: 1, title: 'With email/phone' },
  { value: '0', title: 'Without email/phone' },
  { value: 2, title: 'No contacts' },
];

const linkValiditySelectData = [
  { value: '0', title: 'Changed' },
  { value: 1, title: 'Not changed' },
];

const sortSelectData = [
  { value: '0', title: 'Last modified properties first' },
  { value: 1, title: 'Last created properties first' },
  { value: 2, title: 'Cheapest properties first' },
  { value: 3, title: 'Most expensive properties first' },
  { value: 4, title: 'Mandate signed date' },
];

export const mock = [
  {
    id: 1,
    placeholder: 'Search',
    fieldType: 'search',
    name: 'search',
    tip: 'Search the property by seller name, house/residence name or property reference number',
    searchComponent: SearchListRealty,
    classNames: 'w-[88%] md:w-[94%] xl:w-[96%]',
  },
  /* {
    id: 2,
    placeholder: 'My properties',
    fieldType: 'select',
    selectData: propertiesSelectData,
    name: 'properties',
    classNames: 'w-2/5 lg:w-1/4',
  }, */
  {
    id: 3,
    placeholder: 'Find a deal',
    fieldType: 'search',
    name: 'find_deal',
    classNames: 'w-full',
    searchComponent: SearchListClients,
  },
];

export const mockAdditional = [
  {
    id: 4,
    placeholder: 'City',
    fieldType: 'multiselect',
    name: searchValuesNames.city,
    classNames: 'w-full',
  },
  {
    id: 5,
    placeholder: 'Status',
    fieldType: 'multiselect',
    selectData: statusSelectData,
    name: searchValuesNames.realty_status,
    classNames: 'w-full',
  },
  {
    id: 6,
    placeholder: 'Type',
    fieldType: 'multiselect',
    selectData: typeSelectData,
    name: searchValuesNames.realty_type,
    classNames: 'w-full',
  },
  {
    id: 7,
    placeholder: 'Budget',
    fieldType: 'fromTo',
    type: '$',
    name: searchValuesNames.budget,
    classNames: 'w-full',
  },
];

export const mockMore = [
  {
    id: 8,
    placeholder: 'Residence',
    fieldType: 'multiselectDepedent',
    selectDepedentData: residencesSearchData,
    selectDepedentDataLoading: residencesSearchDataLoading,
    name: searchValuesNames.residence,
    classNames: 'w-full',
  },
  {
    id: 9,
    placeholder: 'Land',
    fieldType: 'fromTo',
    type: 'm²',
    name: searchValuesNames.land,
    classNames: 'w-full',
  },
  {
    id: 10,
    placeholder: 'Bedrooms',
    fieldType: 'fromTo',
    type: '',
    name: searchValuesNames.bedroom,
    classNames: 'w-full',
  },
  {
    id: 11,
    placeholder: 'Surface',
    fieldType: 'fromTo',
    type: 'm²',
    name: searchValuesNames.living_area,
    classNames: 'w-full',
  },
  {
    id: 14,
    placeholder: 'Streets',
    fieldType: 'multiselectDepedent',
    selectDepedentData: streetsSearchData,
    selectDepedentDataLoading: streetsSearchDataLoading,
    name: searchValuesNames.street,
    classNames: 'w-full',
  },
  {
    id: 15,
    placeholder: 'Off-Plan',
    fieldType: 'select',
    selectData: yesNoSelectData,
    name: searchValuesNames.off_plan,
    classNames: 'w-full',
  },
  {
    id: 16,
    placeholder: 'Mandate',
    fieldType: 'multiselect',
    selectData: mandateSelectData,
    name: searchValuesNames.mandate,
    classNames: 'w-full',
  },
  {
    id: 19,
    placeholder: 'User',
    fieldType: 'select',
    name: searchValuesNames.user,
    classNames: 'w-full',
  },
  {
    id: 20,
    placeholder: 'Localisation',
    fieldType: 'multiselect',
    name: searchValuesNames.localisation,
    classNames: 'w-full',
  },
  {
    id: 21,
    placeholder: 'Contacts',
    fieldType: 'select',
    selectData: contactsSelectData,
    name: searchValuesNames.owner_contacts,
    classNames: 'w-full',
  },
  {
    id: 25,
    placeholder: 'Link validity',
    fieldType: 'select',
    selectData: linkValiditySelectData,
    name: searchValuesNames.web_link,
    classNames: 'w-full',
  },
  {
    id: 26,
    placeholder: 'Urgent research',
    fieldType: 'select',
    selectData: urgentResearchSelectData,
    name: searchValuesNames.urgent_research,
    classNames: 'w-full',
  },
  {
    id: 27,
    placeholder: '"Fix visit" status pending',
    fieldType: 'select',
    selectData: yesSelectData,
    name: searchValuesNames.fix_visits,
    classNames: 'w-full',
  },
  {
    id: 28,
    placeholder: 'Sold more than 60 days ago',
    fieldType: 'select',
    selectData: yesNoSelectData,
    name: searchValuesNames.sold_realty,
    classNames: 'w-full',
  },
  {
    id: 29,
    placeholder: 'Date Created From',
    fieldType: 'calendar',
    name: searchValuesNames.date_from,
    classNames: 'w-full',
  },
  {
    id: 30,
    placeholder: 'Date Created To',
    fieldType: 'calendar',
    name: searchValuesNames.date_to,
    classNames: 'w-full',
  },
  /* {
    id: 31,
    placeholder: 'Keywords',
    fieldType: 'keywords',
    name: searchValuesNames.keywords',
    classNames: 'relative col-auto md:col-[1/3] xl:col-[4/6]',
  }, */
];

export const mockSort = [
  {
    id: 1,
    placeholder: 'Sort',
    fieldType: 'select',
    selectData: sortSelectData,
    defaultValue: [{ title: 'Last modified properties first' }],
    name: searchValuesNames.sort_by,
    classNames: 'mt-4 w-full sm:w-2/6',
  },
];
