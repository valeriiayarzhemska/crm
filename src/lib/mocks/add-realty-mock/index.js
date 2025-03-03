import { ALargeSmall, Download, Trash2 } from 'lucide-react';
import { selectsLocationNames } from '../../../data/constants';
import { validationSchema } from '../../validationSchema';
import { videoMock } from '../add-video-mock';
import { commentMock, commentMockValues } from './comment-mock';
import { contactsMock, contactsMockValues } from './contacts-mock';
import { distancesMock, distancesMockValues } from './distances-mock';
import { equipmentInitialValues, equipmentMock } from './equipment-mock';
import { locationMock, locationMockValues } from './location-mock';
import { mainMock, mainMockValues } from './main-mock';
import { mandateMock, mandateMockValues } from './mandate-mock';
import { tarifsMock, tarifsMockValues } from './tarifs-mock';
import { textDescriptionMock, textDescriptionValues } from './text-description-mock';

export const selectsDependentNames = {
  country: [
    selectsLocationNames.city,
    selectsLocationNames.district,
    selectsLocationNames.street,
    selectsLocationNames.streetNumber,
    selectsLocationNames.residence_id,
  ],
  countryId: [selectsLocationNames.cityId, selectsLocationNames.cities],
  agentCountryId: [selectsLocationNames.agentCityId],
  city: [
    selectsLocationNames.district,
    selectsLocationNames.street,
    selectsLocationNames.streetNumber,
    selectsLocationNames.residence_id,
  ],
  street: [selectsLocationNames.streetNumber],
};

export const validationSchemaRealty = {
  location_country_id: validationSchema.default,
  location_city_id: validationSchema.default,
  realty_status: validationSchema.default,
  living_area: validationSchema.default,
  full_area: validationSchema.default,
  tariff_commission: validationSchema.percentage,
  description_title_ru: validationSchema.titleRealty,
  description_title_en: validationSchema.titleRealty,
  description_title_fr: validationSchema.titleRealty,
};

export const initialValues = {
  ...locationMockValues,
  ...mandateMockValues,
  ...mainMockValues,
  ...equipmentInitialValues,
  ...distancesMockValues,
  ...contactsMockValues,
  ...commentMockValues,
  ...tarifsMockValues,
  video: '',
  youtube_link: '',
  colleagues_can_see: '',
  external_link: '',
  ...textDescriptionValues,
};


export const photosInputsTitles = {
  Living: { inputTitle: 'living_room', title: 'Living1' },
  Kitchen: { inputTitle: 'kitchen', title: 'Kitchen1' },
  Bathroom: { inputTitle: 'bathroom', title: 'Bathroom1' },
  Bedroom: { inputTitle: 'bedroom', title: 'Bedroom1' },
};

export const titlesForPhotos = [
  'Unsorted',
  'Master',
  'Exterior',
  'Living1',
  'Kitchen1',
  'Bathroom1',
  'Bedroom1',
  'Plans',
];

export const titlesForDocuments = [
  'Unsorted',
  'Property details',
  'Diagnostics',
  'Sellers details',
  'Plans',
  'Co ownership',
  'Mandate',
  'Сontracts',
  'Building permit',
  'Estimation',
  'Parts for sale in progress',
  'Parts sale 2 in progress',
  'Email',
];

export const documentButtonsName = {
  download: 'download',
  rename: 'rename',
  delete: 'delete',
};

export const documentButtons = [
  {
    icon: Download,
    tooltipText: 'Download file',
    handlerKeyname: documentButtonsName.download,
    disabledOnEdit: true,
  },
  {
    icon: ALargeSmall,
    tooltipText: 'Rename file',
    handlerKeyname: documentButtonsName.rename,
    disabledOnEdit: true,
  },
  {
    icon: Trash2,
    tooltipText: 'Delete file',
    handlerKeyname: documentButtonsName.delete,
  },
];

export const documentClientsButtons = [
  {
    icon: Download,
    type: 'submit',
    tooltipText: 'Download file',
    handlerKeyname: documentButtonsName.download,
    disabledOnEdit: true,
  },
  {
    icon: Trash2,
    tooltipText: 'Delete file',
    handlerKeyname: documentButtonsName.delete,
  },
];

export const mock = [
  ...locationMock,
  ...mandateMock,
  ...mainMock,
  ...equipmentMock,
  ...distancesMock,
  ...tarifsMock,
  ...contactsMock,
  ...textDescriptionMock,
  ...commentMock,
  ...videoMock,
];
