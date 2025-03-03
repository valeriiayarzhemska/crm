import { Pencil, Plus, Trash } from 'lucide-react';
import {
  countryFranceDefault,
  inputButtonType,
  mockAccordionTitles,
  selectsLocationNames,
} from '../../../data/constants';

import { AddCityForm } from '../../../components/form/forms/realtyForm/AddCityForm';
import { AddStreetNumberForm } from '../../../components/form/forms/realtyForm/AddStreetNumberForm';
import { SearchListResidences } from '../../../components/form/forms/realtyForm/SearchListResidences';
import { AddResidenceForm } from '../../../components/form/forms/realtyForm/AddResidenceForm';
import { AddDistrictForm } from '../../../components/form/forms/realtyForm/AddDistrictForm';
import { AddStreetForm } from '../../../components/form/forms/realtyForm/AddStreetForm';
import {
  citiesData,
  citiesDataLoading,
  districtsData,
  districtsDataLoading,
  streetsData,
  streetsDataLoading,
  streetsNumbersData,
  streetsNumbersDataLoading,
} from '../../../redux/features/dashboard/dashboardSelectors';

const locationPrecisionSelectData = [
  { value: 100, title: '100' },
  { value: 300, title: '300' },
  { value: 500, title: '500' },
  { value: 1000, title: '1000' },
  { value: 2000, title: '2000' },
];

const mockTitle = mockAccordionTitles.Location;

export const locationMockValues = {
  location_country_id: 73,
  location_district_id: '',
  location_city_id: '',
  location_street_id: '',
  location_street_number_id: '',
  location_no_in_cadastre: '',
  location_address_checked: '',
  location_address_not_found: '',
  location_precision: '',
  location_cadastre: '',
  residence_id: '',
};

export const locationMock = [
  {
    title: mockTitle,
    id: 1,
    placeholder: 'Country',
    name: selectsLocationNames.country,
    defaultValue: countryFranceDefault,
    fieldType: 'select',
    classNames: 'w-full sm:w-2/4',
  },
  {
    title: mockTitle,
    id: 2,
    placeholder: 'City',
    name: selectsLocationNames.city,
    fieldType: 'selectDepedent',
    selectDepedentData: citiesData,
    selectDepedentDataLoading: citiesDataLoading,
    buttons: [
      {
        type: inputButtonType.delete,
        icon: Trash,
      },
      {
        type: inputButtonType.edit,
        icon: Pencil,
        dialogContent: AddCityForm,
      },
      {
        type: inputButtonType.add,
        icon: Plus,
        dialogContent: AddCityForm,
      },
    ],
    classNames: 'w-full sm:w-[64.6%]',
  },
  {
    title: mockTitle,
    id: 3,
    placeholder: 'District',
    name: selectsLocationNames.district,
    fieldType: 'selectDepedent',
    selectDepedentData: districtsData,
    selectDepedentDataLoading: districtsDataLoading,
    buttons: [
      {
        type: inputButtonType.delete,
        icon: Trash,
      },
      {
        type: inputButtonType.edit,
        icon: Pencil,
        dialogContent: AddDistrictForm,
      },
      {
        type: inputButtonType.add,
        icon: Plus,
        dialogContent: AddDistrictForm,
      },
    ],
    classNames: 'w-full sm:w-[64.6%]',
  },
  {
    title: mockTitle,
    id: 4,
    placeholder: 'Street',
    name: selectsLocationNames.street,
    fieldType: 'selectDepedent',
    selectDepedentData: streetsData,
    selectDepedentDataLoading: streetsDataLoading,
    buttons: [
      {
        type: inputButtonType.delete,
        icon: Trash,
      },
      {
        type: inputButtonType.edit,
        icon: Pencil,
        dialogContent: AddStreetForm,
      },
      {
        type: inputButtonType.add,
        icon: Plus,
        dialogContent: AddStreetForm,
      },
    ],
    classNames: 'w-full sm:w-[64.6%]',
  },
  {
    title: mockTitle,
    id: 5,
    placeholder: 'Street number',
    name: selectsLocationNames.streetNumber,
    fieldType: 'selectDepedent',
    depedentValue: selectsLocationNames.street,
    hasDepedentValue: true,
    selectDepedentData: streetsNumbersData,
    selectDepedentDataLoading: streetsNumbersDataLoading,
    buttons: [
      {
        type: inputButtonType.delete,
        icon: Trash,
      },
      {
        type: inputButtonType.edit,
        icon: Pencil,
        dialogContent: AddStreetNumberForm,
      },
      {
        type: inputButtonType.add,
        icon: Plus,
        dialogContent: AddStreetNumberForm,
      },
    ],
    classNames: 'w-full sm:w-2/4',
  },
  {
    title: mockTitle,
    id: 6,
    checkboxText: 'Address Checked',
    name: 'location_address_checked',
    fieldType: 'checkbox',
    classNames: 'w-60 sm:w-80',
  },
  {
    title: mockTitle,
    id: 7,
    checkboxText: 'Address Not Found',
    name: 'location_address_not_found',
    fieldType: 'checkbox',
    classNames: 'w-60 sm:w-80',
  },
  {
    title: mockTitle,
    id: 8,
    checkboxText: 'No address in cadastre',
    name: 'location_no_in_cadastre',
    fieldType: 'checkbox',
    classNames: 'w-60 sm:w-80',
  },
  {
    title: mockTitle,
    id: 9,
    placeholder: 'Location precision',
    name: 'location_precision',
    fieldType: 'select',
    selectData: locationPrecisionSelectData,
    hint: 'The distance from real location (m)',
    classNames: 'w-full sm:w-2/4',
  },
  {
    title: mockTitle,
    id: 10,
    placeholder: 'Cadastre',
    name: 'location_cadastre',
    fieldType: 'text',
    classNames: 'w-full sm:w-2/4',
  },
  {
    title: mockTitle,
    id: 11,
    placeholder: 'Residences',
    name: 'residence_id',
    fieldType: 'search',
    depedentValue: selectsLocationNames.street,
    hasDepedentValue: true,
    buttons: [
      {
        type: inputButtonType.delete,
        icon: Trash,
      },
      {
        type: inputButtonType.edit,
        icon: Pencil,
        dialogContent: AddResidenceForm,
      },
      {
        type: inputButtonType.add,
        icon: Plus,
        dialogContent: AddResidenceForm,
      },
    ],
    searchComponent: SearchListResidences,
    classNames: 'w-full sm:w-[64.6%]',
    hint: 'To add or edit residence you must choose a street',
  },
];
