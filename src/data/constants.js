import {
  CircleHelp,
  Clock,
  Pencil,
  ThumbsDown,
  ThumbsUp,
  Trash,
} from 'lucide-react';

export const colors = {
  whiteColor: '#fff',
  blackColor: '#100C09',
  arrowColor: '#111926',
  lightestGrayColor: '#fcfcfc',
  lightGrayColor: '#f5f5f5',
  middleGrayColor: '#c8c8c8',
  grayColor: '#010B13',
  darkGrayColor: '#424242',
  redColor: '#e84855',
  orangeColor: '#fa913c',
  yellowColor: '#fabd23',
  lightYellowColor: '#fff2ab',
  greenColor: '#9bc53d',
  greenMintColor: '#66d48a',
  blueColor: '#52e3e1',
  bluePastelColor: '#bbe5fc',
  darkBlueColor: '#33a8c7',
  purpleColor: '#848cba',
  pinkColor: '#ed0e60',
  lightPinkColor: '#ffd6ed',
};

export const fieldTypes = {
  text: 'text',
  search: 'search',
  defaultSearch: 'defaultSearch',
  select: 'select',
  multiselect: 'multiselect',
  selectDepedent: 'selectDepedent',
  multiselectDepedent: 'multiselectDepedent',
  fromTo: 'fromTo',
  calendar: 'calendar',
  keywords: 'keywords',
  toggle: 'toggle',
  radio: 'radio',
  checkbox: 'checkbox',
  checkboxList: 'checkboxList',
  textarea: 'textarea',
  textareaDefaultValue: 'textareaDefaultValue',
  minMax: 'minMax',
};

export const dataTypes = {
  countries: 'countries',
  cities: 'cities',
  districts: 'districts',
  streets: 'streets',
  residences: 'residences',
};

export const inputButtonType = {
  delete: 'delete',
  edit: 'edit',
  add: 'add',
  insert: 'insert',
};

export const selectsLocationNames = {
  country: 'location_country_id',
  countryId: 'country_id',
  agentCountryId: 'agent_country_id',
  agentCityId: 'agent_city',
  city: 'location_city_id',
  cityId: 'city_id',
  cities: 'cities',
  district: 'location_district_id',
  street: 'location_street_id',
  streetNumber: 'location_street_number_id',
  residence_id: 'residence_id',
};

export const contactsInputsNames = {
  contacts: 'contacts',
  contactInput: 'contact_input',
};

export const countryFranceDefault = [
  { id: 73, lowercase: 'france', title: 'France', value: 73 },
];

export const errorMessages = {
  wentWrong: 'Something went wrong',
  sameCategory: 'It is the same category',
  data: 'An error occurred while fetching a data',
  agentResults: 'An error occurred while fetching my results',
  reminders: 'An error occurred while fetching reminders',
  remindersCounters: 'An error occurred while fetching reminders counters',
  videos: 'An error occurred while fetching videos',
  mandates: 'An error occurred while fetching mandates',
  photos: 'An error occurred while fetching photos',
  countriesOrCitites: 'An error occurred while fetching countries or cities',
  contacts: 'An error occurred while fetching contacts',
  notifications: 'An error occurred while fetching notifications',
  agents: 'An error occurred while fetching agents',
  downloadDoc: 'You can not download file before saving',
  renameDoc: 'You can not rename file before saving',
  filters: 'An error occurred while fetching filters for search',
  noClientEmail: 'This client doesn`t have an email',
  noCoords: 'This realty doesn`t have coordinates',
  fillEmailInputs: 'You need to fill empty fields',
  agentCollaboration:
    'You can not choose a buyer agent as a buyer assistant too',
};

export const successMessages = {
  copyPhone: 'Phone number was successfully coppied',
  copyEmail: 'Email was successfully coppied',
  copyLink: 'Search link was successfully coppied',
  copyAddress: 'The address was successfully coppied',
  copyVariable: 'The variable was successfully coppied',
  emailSent: 'The email was successfully sent',
};

/* export const multiSelectStyles = {
  chips: {
    gap: '4px',
    background: colors.lightGrayColor,
    color: colors.blackColor,
  },
  multiSelectContainer: {
    marginTop: 0,
  },
  searchBox: {
    height: '37px',
    overflow: 'scroll',
    fontSize: '0.875rem',
    border: 'none',
    borderBottom: '1px solid rgb(229 231 235)',
    borderRadius: '0px',
  },
  optionContainer: {
    backgroundColor: '#fff',
  },
}; */

export const tabsTitles = {
  Deals: 'Deals',
  Listings: 'Listings',
  Mandates: 'Mandates',
};

export const tabs = [
  {
    id: 1,
    title: tabsTitles.Deals,
    value: '0',
  },
  {
    id: 2,
    title: tabsTitles.Listings,
    value: 1,
  },
  {
    id: 3,
    title: tabsTitles.Mandates,
    value: 2,
  },
];

export const reminderTypeReschedule = {
  tomorrow: 'tomorrow',
  threeDays: 'three-days',
  nextWeek: 'next-week',
  twoWeek: 'two-week',
  month: 'month',
};

export const reminderTypes = [
  {
    id: 1,
    value: reminderTypeReschedule.tomorrow,
  },
  {
    id: 2,
    value: reminderTypeReschedule.threeDays,
  },
  {
    id: 3,
    value: reminderTypeReschedule.nextWeek,
  },
  {
    id: 4,
    value: reminderTypeReschedule.twoWeek,
  },
  {
    id: 5,
    value: reminderTypeReschedule.month,
  },
];

export const editSelectReminders = [
  {
    id: 1,
    title: 'Edit',
    icon: Pencil,
  },
  {
    id: 2,
    title: 'Reschedule',
    icon: Clock,
  },
  {
    id: 3,
    title: 'Delete',
    icon: Trash,
  },
];

export const myResultsFieldTitles = {
  buyer_visit_done: 'buyer_visit_done',
  client_requests: 'client_requests',
  owners: 'owners',
  signed_mandate: 'signed_mandate',
};

export const myResults = [
  {
    id: 1,
    title: 'Buyer visits done',
    fieldTitle: myResultsFieldTitles.buyer_visit_done,
  },
  {
    id: 2,
    title: 'Request / Deals',
    fieldTitle: myResultsFieldTitles.client_requests,
  },
  {
    id: 3,
    title: 'Owners Found',
    fieldTitle: myResultsFieldTitles.owners,
  },
  { id: 4, title: 'Listings visited' },
  {
    id: 5,
    title: 'Agreements signed',
    fieldTitle: myResultsFieldTitles.signed_mandate,
  },
  { id: 6, title: 'Ads published' },
];

export const toggleAndOrList = [
  { id: 1, value: '0', title: 'AND' },
  { id: 2, value: 1, title: 'OR' },
];

export const mapButtonText = {
  show: 'Show map',
  hide: 'Hide map',
};

export const mapInfoMarkers = [
  {
    id: 1,
    title: '',
    markers: [
      {
        id: 1,
        colors: {
          markerColor: colors.redColor,
          leftColor: colors.whiteColor,
          rightColor: colors.whiteColor,
          letter: 'N',
        },
        subtitle: 'Regular object icon with a status letter inside',
        description: [
          'N - Normal',
          'S - Sold or Under compromise',
          'F - Future project',
          'P - Prospecting',
          'A - Other statuses',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Stroke color:',
    markers: [
      {
        id: 1,
        colors: {
          markerColor: colors.greenColor,
          leftColor: colors.whiteColor,
          rightColor: colors.whiteColor,
        },
        subtitle: 'Has "Contact Found" stage',
      },
      {
        id: 2,
        colors: {
          markerColor: colors.yellowColor,
          leftColor: colors.whiteColor,
          rightColor: colors.whiteColor,
        },
        subtitle: 'Has "Introducer Found" stage',
      },
      {
        id: 3,
        colors: {
          markerColor: colors.redColor,
          leftColor: colors.whiteColor,
          rightColor: colors.whiteColor,
        },
        subtitle: 'Nothing (just a default color)',
      },
    ],
  },
  {
    id: 3,
    title: 'Inner background color:',
    markers: [
      {
        id: 1,
        colors: {
          markerColor: colors.redColor,
          leftColor: colors.lightYellowColor,
          rightColor: colors.lightYellowColor,
        },
        subtitle: 'Need urgent research',
      },
      {
        id: 2,
        colors: {
          markerColor: colors.redColor,
          leftColor: colors.lightPinkColor,
          rightColor: colors.lightPinkColor,
        },
        subtitle: 'Need to schedule a visit',
      },
      {
        id: 3,
        colors: {
          markerColor: colors.redColor,
          leftColor: colors.lightYellowColor,
          rightColor: colors.lightPinkColor,
        },
        subtitle: 'Both statuses above',
      },
    ],
  },
];

export const matchingValues = [
  {
    id: 1,
    value: 0,
    icon: CircleHelp,
    color: colors.grayColor,
  },
  {
    id: 2,
    value: 1,
    icon: ThumbsUp,
    color: colors.greenColor,
  },
  {
    id: 3,
    value: 2,
    icon: ThumbsDown,
    color: colors.redColor,
  },
];

export const mockAccordionTitles = {
  Location: 'Location',
  Mandate: 'Mandate',
  Main: 'Main',
  Equipment: 'Equipment',
  Distance: 'Distance',
  Tariff: 'Tariff',
  Contacts: 'Contacts',
  TextDescription: 'Text Description',
  Comment: 'Comment',
  /* Activity: 'Activity',
  Requests: 'Requests', */
  Documents: 'Documents',
  Videos: 'Videos',
  Photos: 'Photos',
};

export const disabledOnAdding = {
  [mockAccordionTitles.Mandate]: true,
  [mockAccordionTitles.Contacts]: true,
  [mockAccordionTitles.Activity]: true,
  [mockAccordionTitles.Requests]: true,
  [mockAccordionTitles.Documents]: true,
  [mockAccordionTitles.Videos]: true,
  [mockAccordionTitles.Photos]: true,
};

export const imagesDownloadButtons = [320, 768, 960];

export const variablesValues = {
  firstName: '{firstName}',
  lastName: '{lastName}',
  listingAgentFirstName: '{listingAgentFirstName}',
  listingAgentPhone: '{listingAgentPhone}',
  listingAgentEmail: '{listingAgentEmail}',
};

export const variablesEmail = [
  {
    id: 1,
    value: variablesValues.firstName,
    text: variablesValues.firstName,
  },
  {
    id: 2,
    value: variablesValues.lastName,
    text: variablesValues.lastName,
  },
  {
    id: 3,
    value: variablesValues.listingAgentFirstName,
    text: variablesValues.listingAgentFirstName,
  },
  {
    id: 4,
    value: variablesValues.listingAgentPhone,
    text: variablesValues.listingAgentPhone,
  },
  {
    id: 5,
    value: variablesValues.listingAgentEmail,
    text: variablesValues.listingAgentEmail,
  },
];

export const searchRequestSortButtons = {
  all: 'all',
  like: 'like',
  dislike: 'dislike',
};

export const urgentResearchSelectData = [
  { value: 1, title: 'Needed' },
  { value: '0', title: 'Not nedeed' },
];

export const yesSelectData = [{ value: 1, title: 'Yes' }];

export const statusSelectData = [
  { value: '0', title: 'Normal' },
  { value: 1, title: 'Sold' },
  { value: 2, title: 'Under accepted offer' },
  { value: 3, title: 'Under compromise' },
  { value: 4, title: 'Prospecting' },
  { value: 5, title: 'Removed from market' },
  { value: 6, title: 'Deleted' },
  { value: 7, title: 'Future project' },
  { value: 8, title: 'All ads unpublished' },
];

export const realtyListToggleTitles = {
  Team: 'Team',
  Me: 'Me',
};

export const realtyListToggleData = [
  { id: 1, value: '0', title: realtyListToggleTitles.Team },
  { id: 2, value: 1, title: realtyListToggleTitles.Me },
];
