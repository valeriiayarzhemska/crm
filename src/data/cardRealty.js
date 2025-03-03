import {
  Check,
  AlarmClock,
  ExternalLink,
  CloudDownload,
  ThumbsUp,
  Mail,
  Phone,
  Menu,
  Info,
  Pencil,
  Copy,
  MoveDown,
  MousePointer2,
  Video,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/ui/icons';
import { DropdownDownload } from '../components/ui/realtyCard/DropdownDownload';

export const initialValuesCardInputs = {
  inputsNamesRealty: '',
  urgency_type: '',
};

export const realtyStatusMock = [
  {
    id: 1,
    value: '0',
    title: 'Normal',
    color: 'border-greenColor bg-greenColor',
    icon: Check,
    mapValue: 'N',
  },
  {
    id: 2,
    value: 1,
    title: 'Sold',
    color: 'border-redColor bg-redColor',
    mapValue: 'S',
  },
  {
    id: 3,
    value: 2,
    title: 'Under accepted offer',
    color: 'border-orangeColor bg-orangeColor',
    mapValue: 'A',
  },
  {
    id: 4,
    value: 3,
    title: 'Under compromise',
    color: 'border-yellowColor bg-yellowColor',
    mapValue: 'A',
  },
  {
    id: 5,
    value: 4,
    title: 'Prospecting',
    color: 'border-blueColor bg-blueColor',
    mapValue: 'P',
  },
  {
    id: 6,
    value: 5,
    title: 'Removed from market',
    color: 'border-darkBlueColor bg-darkBlueColor',
    mapValue: 'A',
  },
  {
    id: 7,
    value: 6,
    title: 'Deleted',
    color: 'border-purpleColor bg-purpleColor',
    mapValue: 'A',
  },
  {
    id: 8,
    value: 7,
    title: 'Future project',
    color: 'border-pinkColor bg-pinkColor',
    mapValue: 'F',
  },
  {
    id: 9,
    value: 8,
    title: 'All ads unpublished',
    color: 'border-grayColor bg-grayColor',
    mapValue: 'A',
  },
];

export const realtySquareButtonsType = {
  reminder: 'reminder',
  link: 'link',
  download: 'download',
};

export const realtySquareButtons = [
  {
    id: 1,
    type: realtySquareButtonsType.reminder,
    color: 'border-whiteColor bg-whiteColor',
    icon: AlarmClock,
    counter: 10,
    classes: 'col-span-full row-span-full h-[32px]',
  },
  {
    id: 2,
    type: realtySquareButtonsType.link,
    color: 'border-whiteColor bg-whiteColor',
    icon: ExternalLink,
    classes: 'col-start-2 col-end-2 row-start-2 row-end-2 h-[32px]',
  },
  {
    id: 3,
    type: realtySquareButtonsType.download,
    color: 'border-whiteColor bg-whiteColor',
    icon: CloudDownload,
    classes: 'row-start-2 row-end-2 h-[32px]',
    dropdown: DropdownDownload,
  },
];

export const realtyRoundedButtonsType = {
  mail: 'mail',
  matching: 'matching',
};

/* export const realtyRoundedButtons = [
  {
    id: 1,
    type: realtyRoundedButtonsType.mail,
    color: 'border-whiteColor bg-whiteColor',
    icon: Mail,
    isRounded: true,
    classes: 'opacity-70 hover:opacity-90',
  },
  {
    id: 2,
    type: realtyRoundedButtonsType.matching,
    color: 'border-whiteColor bg-whiteColor',
    icon: ThumbsUp,
    isRounded: true,
    classes: 'opacity-70 hover:opacity-90',
  },
]; */

export const realtyButtonsTitles = {
  whatsUp: 'whatsUp',
  assignedTo: 'assignedTo',
  tasksVisits: 'tasksVisits',
  info: 'info',
  edit: 'edit',
  copy: 'copy',
  editPrice: 'editPrice',
  copyAddress: 'copyAddress',
  map: 'map',
  openVideo: 'openVideo',
  copyLink: 'copyLink',
  phoneContact: 'phoneContact',
  emailContact: 'emailContact',
  whatsUpContact: 'whatsUpContact',
  //infoContact: 'infoContact',
};

export const realtyContactsButtons = [
  {
    id: 1,
    icon: Phone,
    title: realtyButtonsTitles.whatsUp,
    classes: 'border-white',
  },
  {
    id: 2,
    hasText: true,
    title: realtyButtonsTitles.assignedTo,
    classes: 'border-white',
    tooltipText: 'Assigned To',
  },
  {
    id: 3,
    icon: Menu,
    title: realtyButtonsTitles.tasksVisits,
    classes: 'border-white',
    tooltipText: 'Tasks and Visits',
  },
];

export const realtyInfoButtons = [
  {
    id: 1,
    icon: Info,
    title: realtyButtonsTitles.info,
    classes: 'border-white',
  },
  {
    id: 2,
    icon: Pencil,
    title: realtyButtonsTitles.edit,
    classes: 'border-white',
    tooltipText: 'Edit',
  },
  {
    id: 3,
    hasText: true,
    isIconText: true,
    icon: Copy,
    title: realtyButtonsTitles.copy,
    classes: 'border-white flex-row-reverse',
    tooltipText: 'Id | Copy search link',
  },
  {
    id: 4,
    hasText: true,
    title: realtyButtonsTitles.editPrice,
    icon: MoveDown,
    classes: 'border-gray-200 bg-gray-200 flex-row-reverse text-[10px]',
    tooltipText: 'Click to edit price',
  },
];

export const realtyLocationButtons = [
  {
    id: 1,
    icon: Copy,
    title: realtyButtonsTitles.copyAddress,
    classes: 'border-white',
    tooltipText: 'Copy address',
  },
  {
    id: 2,
    icon: MousePointer2,
    title: realtyButtonsTitles.map,
    classes: 'border-white',
    tooltipText: 'Open map',
  },
];

export const realtyDetailsButtons = [
  {
    id: 1,
    icon: Video,
    title: realtyButtonsTitles.openVideo,
    classes: 'border-gray-200',
  },
  {
    id: 2,
    hasText: true,
    text: 'Link',
    title: realtyButtonsTitles.copyLink,
    classes:
      'border-whiteColor bg-whiteColor text-xs text-darkBlueColor underline',
  },
];

export const realtyOwnersButtons = [
  {
    id: 1,
    icon: Phone,
    title: realtyButtonsTitles.phoneContact,
    classes: 'border-transparent',
    tooltipText: 'Click to see details',
  },
  {
    id: 2,
    icon: Mail,
    title: realtyButtonsTitles.emailContact,
    classes: 'border-transparent',
    tooltipText: 'Click to see details',
  },
  {
    id: 3,
    icon: WhatsAppIcon,
    size: 4,
    title: realtyButtonsTitles.whatsUpContact,
    classes: 'border-transparent',
  },
  /* {
    id: 4,
    hasText: true,
    title: realtyButtonsTitles.infoContact,
    classes: 'border-whiteColor bg-whiteColor flex-row-reverse',
    tooltipText: 'Click to edit',
  }, */
];

export const stageSelectDataMapValues = {
  urgent: 2,
  introducer: 4,
  contact: 5,
  visit: 16,
};

const stageSelectData = [
  { value: '0', title: 'Address found' },
  { value: 1, title: 'Address confirmed' },
  { value: stageSelectDataMapValues.urgent, title: 'Urgent owner research' },
  { value: 3, title: 'Contact research started' },
  { value: stageSelectDataMapValues.introducer, title: 'Introducer found' },
  { value: stageSelectDataMapValues.contact, title: 'Contact found' },
  { value: 6, title: 'Listing visited' },
  { value: 7, title: 'Photos taken' },
  { value: 8, title: 'Photos done' },
  { value: 9, title: 'Need to accept agreement' },
  { value: 10, title: 'Agreement in progress' },
  { value: 11, title: 'Agreement signed' },
  { value: 12, title: 'Published on website' },
  { value: 13, title: 'Ads published' },
  { value: 14, title: 'No action needed' },
  { value: 15, title: 'Co agency done' },
  { value: stageSelectDataMapValues.visit, title: 'Need to schedule visit' },
];

export const urgencySelectData = [
  { value: '0', title: 'None', color: 'border-gray-300 bg-gray-300' },
  {
    value: 1,
    title: 'Unknown',
    color: 'border-blueColor bg-blueColor',
  },
  {
    value: 2,
    title: 'Cold (>12m)',
    color: 'border-darkBlueColor bg-darkBlueColor text-white',
  },
  {
    value: 3,
    title: 'Warm (<12m)',
    color: 'border-yellowColor bg-yellowColor',
  },
  {
    value: 4,
    title: 'Hot (<6m)',
    color: 'border-orangeColor bg-orangeColor text-white',
  },
  {
    value: 5,
    title: 'Very Hot (<3m)',
    color: 'border-redColor bg-redColor text-white',
  },
];

export const cardRealtyInputs = [
  {
    id: 1,
    placeholder: 'Stage',
    fieldType: 'multiselect',
    selectData: stageSelectData,
    name: 'realty_stages',
    classNames: 'w-7/12 max-h-[500px] overwlow-scroll hide-scroll',
  },
  {
    id: 2,
    placeholder: 'Urgency',
    fieldType: 'select',
    selectData: urgencySelectData,
    name: 'urgency_type',
    classNames: 'w-5/12',
  },
];
