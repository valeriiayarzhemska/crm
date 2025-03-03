import { countryFranceDefault } from '../../data/constants';
import { citiesData, citiesDataLoading } from '../../redux/features/dashboard/dashboardSelectors';
import { validationSchema } from '../validationSchema';

export const initialValues = {
  country_id: '',
  name: '',
  postal_code: '',
  latitude: '',
  longitude: '',
  city_neighbors: '',
};

export const validationSchemaCity = {
  name: validationSchema.default,
  postal_code: validationSchema.default,
  latitude: validationSchema.default,
  longitude: validationSchema.default,
};

export const mock = [
  {
    id: 1,
    placeholder: 'Name',
    fieldType: 'text',
    name: 'name',
    classNames: 'w-full sm:w-2/4',
  },
  {
    id: 2,
    placeholder: 'Postal Code',
    fieldType: 'text',
    name: 'postal_code',
    classNames: 'w-full sm:w-2/4',
  },
  {
    inputsTitle: 'Coordinates',
    id: 3,
    listId: 'listId',
    placeholder: 'Latitude',
    name: 'latitude',
    fieldType: 'text',
    type: 'number',
    classNames: 'w-[47%]',
  },
  {
    id: 4,
    listId: 'listId',
    placeholder: 'Longitude',
    name: 'longitude',
    fieldType: 'text',
    type: 'number',
    classNames: 'w-[47%]',
  },
  {
    id: 5,
    placeholder: 'Related cities for the marketing emails',
    fieldType: 'multiselect',
    name: 'city_neighbors',
    classNames: 'w-full',
  },
];
