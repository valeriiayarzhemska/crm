import {
  contactsInputsNames,
  dataTypes,
  errorMessages,
  fieldTypes,
  mockAccordionTitles,
} from '../data/constants';
import { roleSelectData } from '../lib/mocks/add-contact-mock';
import { titlesForDocuments } from '../lib/mocks/add-realty-mock';
import { initialValues, requestValues } from '../lib/mocks/add-request-mock';
import {
  initialAdditionalValues,
  searchValuesNames,
} from '../lib/mocks/search-mock';
import { transformStringToDate } from './utils';

export function getInitialValues(data, initialValues) {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
      const newValue =
        data[key] &&
        (data[key]?.value ||
          data[key]?.value === 0 ||
          data[key]?.id ||
          data[key]?.id === 0)
          ? data[key]?.value?.toString() || data[key]?.id?.toString()
          : '';

      if (
        typeof data[key] === 'object' &&
        data[key] !== null &&
        !Array.isArray(data[key])
      ) {
        initialValues[key] = newValue;
      }

      if (data[key] !== null && Array.isArray(data[key])) {
        const value = data[key][0];

        if (typeof value === 'object' && value !== null) {
          let transformedData = [];

          data[key].map(item => transformedData.push(item?.id || item?.value));

          initialValues[key] = transformedData;
        } else {
          initialValues[key] = data[key];
        }
      }

      /* if (
        data[key] !== null &&
        Array.isArray(data[key]) &&
        key !== 'assistants' &&
        key !== 'visit_members' &&
        key !== 'city_neighbors' &&
        key !== 'cities'
      ) {
        initialValues[key] = data[key];
      } */

      if (
        !Array.isArray(data[key]) &&
        typeof data[key] !== 'object' &&
        !newValue &&
        data[key] !== null
      ) {
        initialValues[key] = data[key];
      }
    }
  }

  return initialValues;
}

export function getDefaultValueByValue(value, data) {
  let defaultValue = {};

  data.map(item => {
    if (item?.value === value || item?.id === value) {
      defaultValue = item;
    }
  });

  return defaultValue;
}

export function getDefaultValues(data, mockArray, selectData = {}) {
  return mockArray.map(item => {
    const { name, fieldType, toggleType } = item;
    const { countries, cities, districts, streets, streetsNumbers, agents } =
      selectData;

    if (!data?.[name] || !Object.prototype.hasOwnProperty.call(data, name) || !data?.[name]) {
      return item;
    }

    if (countries && name.includes('countr') && data[name]) {
      let defaultValue = getDefaultValueByValue(data[name], countries);

      return { ...item, defaultValue: [defaultValue] };
    }

    if (cities && name.includes('cit') && data[name] && fieldType !== fieldTypes.multiselect) {
      let defaultValue = getDefaultValueByValue(
        data[name]?.value || data[name]?.id,
        cities
      );

      return { ...item, defaultValue: [defaultValue] };
    }

    if (cities && name.includes('cit') && data[name] && fieldType === fieldTypes.multiselect) {
      let defaultValue = [];

      data[name].forEach(input => {
        const value = getDefaultValueByValue(
          input?.value || input?.id,
          cities
        );

        return defaultValue.push(value);
      });

      return { ...item, defaultValue };
    }

    if (districts && name.includes('district') && data[name]) {
      let defaultValue = getDefaultValueByValue(
        data[name]?.value || data[name]?.id,
        districts
      );

      return { ...item, defaultValue: [defaultValue] };
    }

    if (
      streets &&
      name.includes('street') &&
      !name.includes('number') &&
      data[name]
    ) {
      let defaultValue = getDefaultValueByValue(
        data[name]?.value || data[name]?.id,
        streets
      );

      return { ...item, defaultValue: [defaultValue] };
    }

    if (
      streetsNumbers &&
      name.includes('street') &&
      name.includes('number') &&
      data[name]
    ) {
      let defaultValue = getDefaultValueByValue(
        data[name]?.value || data[name]?.id,
        streetsNumbers
      );

      return { ...item, defaultValue: [defaultValue] };
    }

    if (agents && (name.includes('assistant') || name === 'user') && data[name]) {
      let defaultValue = getDefaultValueByValue(
        data[name]?.value || data[name]?.id,
        agents
      );

      return { ...item, defaultValue: [defaultValue] };
    }

    if (
      typeof data[name] === 'object' &&
      data[name] !== null &&
      (data[name]?.value !== null || data[name]?.id !== null) &&
      !Array.isArray(data[name])
    ) {
      const initialValue = data[name]?.value || data[name]?.id;
      let newValue = '';

      if (initialValue === 0) {
        newValue = '0';
      } else if (initialValue && initialValue !== 0) {
        newValue = initialValue;
      }

      const defaultValue =
        fieldType === fieldTypes.select || fieldType === fieldTypes.multiselect
          ? [{ value: newValue, ...data[name] }]
          : { value: newValue, ...data[name] };

      return { ...item, defaultValue };
    }

    if (Array.isArray(data[name]) && name === 'city') {
      const transformedData = data[name].map(city => ({
        value: city,
        title: city,
      }));

      return { ...item, defaultValue: transformedData };
    }

    if (Array.isArray(data[name]) && name === 'assistants') {
      const transformedData = data[name].map(assistant => ({
        value: assistant.id,
        title: assistant.name,
      }));

      return { ...item, defaultValue: transformedData };
    }

    if (
      Array.isArray(data[name]) &&
      fieldType === fieldTypes.toggle &&
      toggleType === 'multiple'
    ) {
      const transformedData = data[name].map(item => {
        if (item?.value === 0 || item?.value === '0') {
          return '0';
        } else {
          return Number(item.value);
        }
      });

      return { ...item, defaultValue: transformedData };
    }

    if (
      Array.isArray(data[name]) &&
      fieldType === fieldTypes.checkboxList &&
      (data[name][0]?.value || data[name][0]?.value === 0)
    ) {
      const transformedData = data[name].map(item => {
        if (item.value === 0) {
          return '0';
        } else {
          return item.value;
        }
      });

      return { ...item, defaultValue: transformedData };
    }

    if (Array.isArray(data[name]) && name !== 'city' && name !== 'assistants') {
      const transformedData = data[name].map(item => {
        if (item === 0) {
          return '0';
        } else if (item?.id || item?.name) {
          return { ...item, value: item.id, title: item.name };
        } else {
          return item;
        }
      });

      return { ...item, defaultValue: transformedData };
    }

    if (typeof data[name] === 'string' && fieldType === 'calendar') {
      const date = transformStringToDate(data[name]);

      return { ...item, defaultValue: date };
    }

    if (typeof data[name] === 'string' && fieldType !== 'calendar') {
      return { ...item, defaultValue: data[name] };
    }

    return item;
  });
}

export function getDefaultValuesForEditing(data) {
  const request = { ...data };

  for (const key in request) {
    if (
      typeof request[key] === 'object' &&
      (request[key]?.value ||
        request[key]?.value === 0 ||
        request[key]?.id ||
        request[key]?.id === 0) &&
      !Array.isArray(request[key])
    ) {
      const newValue =
        request[key]?.value ||
        request[key]?.value === 0 ||
        request[key]?.id ||
        request[key]?.id === 0;

      request[key] = newValue;
    }

    if (
      request[key] !== null &&
      Array.isArray(request[key]) &&
      (key === 'assistants' || key === 'cities')
    ) {
      let transformedRequest = [];
      request[key].map(item => transformedRequest.push(item.id));

      request[key] = transformedRequest;
    }

    if (
      request[key] !== null &&
      Array.isArray(request[key]) &&
      key !== 'assistants' &&
      key !== 'cities'
    ) {
      if (request[key][0]?.value || request[key][0]?.value === 0) {
        let transformedRequest = request[key].map(item => item.value);

        request[key] = transformedRequest;
      }
    }

    /* if (
      request[key] !== null &&
      Array.isArray(request[key]) &&
      !key === 'assistants'
    ) {
      request[key] = request[key];
    }

    if (typeof request[key] === 'string' || typeof request[key] === 'number') {
      request[key] = request[key];
    } */
  }

  return request;
}

export const getInputValueWithColor = (staticData, data, name) => {
  if (data && (data?.value || data?.value === 0)) {
    const newValue = staticData.at(data.value);

    return { ...newValue, selectData: staticData, name };
  } else {
    return { ...data, selectData: staticData, name };
  }
};

export async function changePropertyName(data, dataType) {
  let newData = [];

  switch (dataType) {
  case dataTypes.countries:
    newData = await data.map(country => {
      country['title'] = country['official_name'];
      country['value'] = country['id'];
      delete country['official_name'];

      return country;
    });
    break;

  case dataTypes.cities:
  case dataTypes.districts:
  case dataTypes.streets:
  case dataTypes.residences:
    newData = await data.map(item => {
      const title = item['name'];
      const value = item['id'];

      return { ...item, title, value };
    });
    break;

  default:
    newData = data;
  }

  return newData;
}

export const transformArrayToObject = array => {
  const result = {};
  let currentKey = 'inputs';
  let currentInputsId = 0;

  array.forEach(item => {
    if (Object.prototype.hasOwnProperty.call(item, 'listId')) {
      if (
        currentKey.includes('inputs') &&
        Object.prototype.hasOwnProperty.call(result, 'inputs')
      ) {
        currentInputsId++;
      }

      currentKey = item.listId;

      if (!Object.prototype.hasOwnProperty.call(result, currentKey)) {
        result[currentKey] = [];
      }

      result[currentKey].push(item);
    } else {
      if (currentKey !== 'inputs') {
        currentKey = `inputs${currentInputsId ? currentInputsId : ''}`;
      }

      if (!Object.prototype.hasOwnProperty.call(result, currentKey)) {
        result[currentKey] = [];
      }

      result[currentKey].push(item);
    }
  });

  return result;
}; /* 

export const addCountriesData = async (newCountries, mock) => {
  const newInputs = await mock.map(item => {
    if (item.name.includes('countr') && !item.selectData) {
      const selectData = newCountries;

      return { ...item, selectData: selectData };
    }

    return item;
  });

  return newInputs;
}; */

export const addDataForDepedentSelects = ({
  mock,
  countries,
  residences,
  cities,
  districts,
  streetsNumbers,
  streets,
  contacts,
  assistants,
  handleCountrySelect,
  handleCitySelect,
  handleStreetSelect,
}) => {
  const newInputs = mock.map(item => {
    if (item.name.includes('countr')) {
      const handleSelection = handleCountrySelect ? handleCountrySelect : false;

      return {
        ...item,
        selectData: countries,
        handleSelection: handleSelection,
      };
    }

    if (item.name.includes('cit')) {
      const handleSelection = handleCitySelect ? handleCitySelect : false;

      return { ...item, selectData: cities, handleSelection: handleSelection };
    }

    if (item.name.includes('district')) {
      return { ...item, selectData: districts };
    }

    if (item.name.includes('street') && !item.name.includes('number')) {
      const handleSelection = handleStreetSelect ? handleStreetSelect : false;

      return { ...item, selectData: streets, handleSelection: handleSelection };
    }

    if (item.name.includes('street') && item.name.includes('number')) {
      return { ...item, selectData: streetsNumbers };
    }

    if (item.name.includes('residences')) {
      return { ...item, selectData: residences };
    }

    if (item.name.includes(contactsInputsNames.contactInput)) {
      return { ...item, selectData: contacts };
    }

    if (item.name.includes('assistant') || item.name.includes('buyer_')) {
      return { ...item, selectData: assistants };
    }

    return item;
  });

  return newInputs;
};

export function handleResponseError(responseError, specificError, closeDialog) {
  if (responseError) {
    const error = specificError;

    return error
      ? `${error.originalStatus} ${error.status}`
      : errorMessages.wentWrong;
  } else {
    closeDialog();
  }
}

export function findCityByCountry(cities, countryId) {
  let newCities = [];

  cities.map(city => {
    if (city?.country?.id === countryId) {
      return newCities.push({
        title: city.name,
        id: city.id,
        value: city.id,
      });
    }
  });

  return newCities;
}

export function transformContactsData(data) {
  return data.map(item => {
    const title = `${item?.first_name ? `${item.first_name} ` : ''}${item?.last_name || ''}`;

    return { title, value: item.id };
  });
}

export async function compareContactsInfo(contactInfo, values) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    contactRole,
    setContactRole,
  } = contactInfo;

  for (const key in values) {
    if (
      key === 'first_name' &&
      values[key] !== firstName &&
      typeof setLastName === 'function'
    ) {
      setFirstName(values[key]);
    }

    if (
      key === 'last_name' &&
      values[key] !== lastName &&
      typeof setLastName === 'function'
    ) {
      setLastName(values[key]);
    }

    if (
      key === 'role' &&
      Number(values[key]) !== Number(contactRole?.value) &&
      typeof setContactRole === 'function'
    ) {
      let newRole = contactRole;

      roleSelectData.forEach(item => {
        if (Number(item.value) === Number(values[key])) {
          newRole = item;
        }
      });

      setContactRole(newRole);
    }
  }
}

export function transformDocumentsData(files, formData) {
  const newFormData = formData || new FormData();

  for (const [key, documents] of Object.entries(files)) {
    if (documents && documents.length > 0) {
      const assign_categories = titlesForDocuments.findIndex(
        title => title === key
      );

      for (const document of documents) {
        newFormData.append('documents[]', document.file);
        newFormData.append('assign_categories[]', assign_categories);
      }
    }
  }

  return newFormData;
}

export const transformVideoData = videos => {
  const formData = new FormData();

  videos.forEach(video => {
    return formData.append('video[]', video.file);
  });

  return formData;
};

export const extractInputsFromRealty = realty => {
  let newRealty = { ...realty };

  for (const [key, inputs] of Object.entries(realty)) {
    switch (key) {
    case mockAccordionTitles.Location.toLowerCase():
      newRealty = { ...newRealty, ...inputs };
      break;
    case mockAccordionTitles.Mandate.toLowerCase():
      newRealty = { ...newRealty, ...inputs };
      break;
    case mockAccordionTitles.Main.toLowerCase():
      newRealty = { ...newRealty, ...inputs };
      break;
    case mockAccordionTitles.Equipment.toLowerCase():
      newRealty = { ...newRealty, ...inputs };
      break;
    case mockAccordionTitles.Distance.toLowerCase():
      newRealty = { ...newRealty, ...inputs };
      break;
    case mockAccordionTitles.Tariff.toLowerCase():
      newRealty = { ...newRealty, ...inputs };
      break;
    case mockAccordionTitles.TextDescription.toLowerCase().replace(/ /g, '_'):
      newRealty = { ...newRealty, ...inputs };
      break;
    case mockAccordionTitles.Comment.toLowerCase():
      newRealty = { ...newRealty, ...inputs };
      break;
    default:
      newRealty[key] = inputs;
    }
  }

  return newRealty;
};

export const transformRealtyValues = realty => {
  let newRealty = { ...realty };

  for (const [key, value] of Object.entries(realty)) {
    if (key === 'location_precision' && value) {
      newRealty[key] = { title: value, value };
    }

    if (key === 'residences' && value) {
      newRealty['residence_id'] = { title: value.name, value: value.id };
    }
  }

  return newRealty;
};

export const transformSearchMock = ({
  mockAdditional,
  mockMore,
  filters,
  cities,
  agents,
  handleCityIdRemove,
}) => {
  const transformedFilters = {};

  for (const [key, data] of Object.entries(filters)) {
    transformedFilters[key] = data.map(item => {
      const newItem = { ...item, value: item?.id };

      delete newItem?.id;

      return newItem;
    });
  }

  const newMockAdditional = mockAdditional.map(input => {
    if (Object.prototype.hasOwnProperty.call(transformedFilters, input?.name)) {
      return { ...input, selectData: transformedFilters[input.name] };
    } else if (input.name ===searchValuesNames.city) {
      const transformedData = cities.map(city => ({
        value: city?.id,
        title: city?.name || city?.title,
      }));

      return {
        ...input,
        selectData: transformedData,
        handleSelection: handleCityIdRemove,
      };
    } else {
      return input;
    }
  });

  const newMockMore = mockMore.map(input => {
    if (Object.prototype.hasOwnProperty.call(transformedFilters, input?.name)) {
      return { ...input, selectData: transformedFilters[input.name] };
    } else if (input.name === searchValuesNames.user) {
      const transformedData = agents.map(agent => ({
        value: agent?.id,
        title: agent?.agent_name,
      }));

      return {
        ...input,
        selectData: transformedData,
      };
    } else {
      return input;
    }
  });

  return { newMockAdditional, newMockMore };
};

export const transformSortMock = (mock, handleSelection) => {
  return mock.map(input => {
    if (input.name === 'sort_by') {
      return { ...input, handleSelection: handleSelection };
    } else {
      return input;
    }
  });
};

export const generateImagesArrayToUpdate = (
  titleToAdd,
  titleToDelete,
  images
) => {
  let imagesToUpdate = [];

  for (const [key, value] of Object.entries(images)) {
    if (key === titleToDelete) {
      imagesToUpdate = value.map(photo => ({
        id: photo.id,
        category: titleToAdd,
      }));
    }
  }

  return imagesToUpdate;
};

export const generatePhotosFormData = images => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(images)) {
    if (value && value.length > 0) {
      value.forEach(item => {
        formData.append('images[]', item.file);
        formData.append('categories[]', key);
      });
    }
  }

  return formData;
};

const checkValueFromTo = (valueFrom, valueTo) => {
  if (!valueFrom || !valueTo) {
    return [];
  } else {
    return [valueFrom, valueTo];
  }
};

export const transformRequestToSearch = (request, searchRequestInitialValues) => {
  const newSearchInitialValues = { ...initialAdditionalValues };
  const newSearchValues = { ...initialAdditionalValues };

  const requestInitialValues = getInitialValues(request, searchRequestInitialValues);

  newSearchInitialValues[searchValuesNames.city] =
    requestInitialValues[requestValues.cities];
  newSearchInitialValues[searchValuesNames.realty_type] =
    requestInitialValues[requestValues.realty_types];
  newSearchInitialValues[searchValuesNames.bedroom] = [
    requestInitialValues[requestValues.bedroom_from],
    requestInitialValues[requestValues.bedroom_to],
  ];
  newSearchInitialValues[searchValuesNames.land] = [
    requestInitialValues[requestValues.land_from],
    requestInitialValues[requestValues.land_to],
  ];
  newSearchInitialValues[searchValuesNames.budget] = [
    requestInitialValues[requestValues.budget_from],
    requestInitialValues[requestValues.budget_to],
  ];
  newSearchInitialValues[searchValuesNames.living_area] = [
    requestInitialValues[requestValues.living_area_from],
    requestInitialValues[requestValues.living_area_to],
  ];

  newSearchValues[searchValuesNames.city] =
    request[requestValues.cities];
  newSearchValues[searchValuesNames.realty_type] =
    [{ value: '0', title: 'Normal' }];
  newSearchValues[searchValuesNames.bedroom] = checkValueFromTo(
    request[requestValues.bedroom_from],
    request[requestValues.bedroom_to],
  );
  newSearchValues[searchValuesNames.land] = checkValueFromTo(
    request[requestValues.land_from],
    request[requestValues.land_to],
  );
  newSearchValues[searchValuesNames.budget] = checkValueFromTo(
    request[requestValues.budget_from],
    request[requestValues.budget_to],
  );
  newSearchValues[searchValuesNames.living_area] = checkValueFromTo(
    request[requestValues.living_area_from],
    request[requestValues.living_area_to],
  );

  return { initialValues: newSearchInitialValues, values: newSearchValues };
};
