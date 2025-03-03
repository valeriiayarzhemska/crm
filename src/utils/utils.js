import { toast } from 'sonner';
import { dataTypes, errorMessages, fieldTypes, successMessages } from '../data/constants';
import {
  documentButtonsName,
  photosInputsTitles,
  titlesForPhotos,
} from '../lib/mocks/add-realty-mock';

export const formatNumericValue = value => {
  const floatValue = parseFloat(value);

  if (!isNaN(floatValue)) {
    const formattedValue = (floatValue / 1000000).toFixed(7);

    const truncatedValue = formattedValue.slice(0, 8);

    return truncatedValue + 'M';
  }

  return '';
};

export const handleCopy = (valueToCopy, message) => {
  navigator.clipboard
    .writeText(valueToCopy)
    .then(() => {
      console.log('Text copied to clipboard:', valueToCopy);

      toast.success(message, {
        action: {},
      });
    })
    .catch(err => {
      console.error('Unable to copy text to clipboard:', err);

      toast.error(errorMessages.wentWrong, {
        action: {},
      });
    });
};

export function copyImage(imageSrc) {
  const img = new Image();

  img.src = imageSrc;

  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);

    canvas.toBlob(function (blob) {
      const clipboardItem = new ClipboardItem({ 'image/png': blob });

      navigator.clipboard.write([clipboardItem]).then(
        function () {
          console.log('Image copied to clipboard');
        },
        function (error) {
          console.error('Unable to copy image: ', error);
        }
      );
    }, 'image/png');
  };
}

export const handleRedirect = () => {};

export function setCookie(name, value, expiresIn) {
  let expires = '';

  if (expiresIn) {
    const date = new Date();
    date.setTime(date.getTime() + expiresIn * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function deleteCookie(name) {
  let expires = '';

  const date = new Date();
  date.setTime(date.getTime() - 30 * 24 * 60 * 60 * 1000);
  expires = '; expires=' + date.toUTCString();

  document.cookie = name + '=' + '' + expires + '; path=/';
}

export function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';').map(cookie => cookie.trim());

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return undefined;
}

export function getMinMaxStringValue(min, max, unit) {
  let value = '';

  if (min && max) {
    value = `${min} - ${max} ${unit}`;
  } else if (min && !max) {
    value = `${min} ${unit}`;
  } else if (!min && max) {
    value = `${max} ${unit}`;
  } else if (!min && !max) {
    value = '';
  }

  return value;
}

export function formatDate(dateString) {
  return dateString.replace(/-/g, '/');
}

export function transformDateToString(date) {
  const dateObject = new Date(date);
  const formattedDate = `${dateObject.getDate().toString().padStart(2, '0')}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getFullYear()}`;

  return formattedDate;
}

export function transformStringToDate(dateString) {
  const parts = dateString.split('-');
  const year = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[0], 10);

  return new Date(year, month, day);
}

export const formatDateToString = date => {
  if (date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  }
};

export function calculateNettoPrice(marketPrice, commissionPercentage) {
  const nettoPrice =
    Number(marketPrice) * (1 - Number(commissionPercentage) / 100);

  return nettoPrice;
}

export function filterValue(data, value) {
  return data.filter(item => item.value !== value);
}

export function generatePhotosBadges(titles, formProps) {
  let updatedTitles = [...titles];

  const titlesMap = {};

  Object.keys(photosInputsTitles).forEach(photoKey => {
    const photoTitleObj = photosInputsTitles[photoKey];
    const photoInputValue = formProps?.values?.[photoTitleObj.inputTitle];
    const baseTitle = photoTitleObj.title.slice(0, -1); // Get the base title without the "1"

    titlesMap[baseTitle] = [];

    if (photoInputValue && Number(photoInputValue) > 0) {
      for (let i = 1; i <= Number(photoInputValue); i++) {
        titlesMap[baseTitle].push(`${baseTitle}${i}`);
      }
    } else {
      titlesMap[baseTitle].push(`${baseTitle}1`);
    }
  });

  const newTitles = titlesForPhotos.reduce((acc, title) => {
    const baseTitle = title.slice(0, -1);
    if (titlesMap[baseTitle]) {
      acc.push(...titlesMap[baseTitle]);
      delete titlesMap[baseTitle];
    } else {
      acc.push(title);
    }
    return acc;
  }, []);

  return newTitles;
}

export function createFormData({ values, keyArrayValues, keyBooleanValues }) {
  const formData = new FormData();

  for (let key in values) {
    if (Object.prototype.hasOwnProperty.call(keyArrayValues, key)) {
      values[key].forEach(item => {
        formData.append(`${key}[]`, item);
      });
    } else if (Object.prototype.hasOwnProperty.call(keyBooleanValues, key)) {
      const newValue = values[key] ? 1 : 0;
      formData.append(key, newValue);
    } else {
      formData.append(key, values[key]);
    }
  }

  return formData;
}

export function filterDataByKey(array1, array2, key) {
  const dataUrlSet = new Set(array2.map(item => item[key]));

  const filteredArray = array1.filter(item => !dataUrlSet.has(item[key]));

  return filteredArray;
}

export const bytesToMegabytes = bytes => {
  const megabytes = bytes / (1024 * 1024);

  return megabytes.toFixed(2);
};

export function generateId() {
  const id = 'id' + Math.random().toString(16).slice(2);

  return id;
}

export const generateUrlClients = ({
  baseUrl,
  page,
  perPage,
  activeSeachType,
  searchQuery,
  status,
  budgetTo,
  urgencyType,
}) => {
  let newUrl = `${baseUrl}?page=${page || 1}`;
  const perPageQuery = perPage ? `&per_page=${perPage}` : '';
  const activeSeachTypeQuery = activeSeachType
    ? `&request_type=${activeSeachType}`
    : '';
  const searchTypeQuery = searchQuery
    ? `&search_query=${searchQuery}`
    : '&search_query=';
  const maxBudgetToQuery = budgetTo ? `&budget_to=${budgetTo}` : '';
  let statusTypeQuery = '';
  let urgencyTypeQuery = '';

  if (status && status?.length > 0) {
    statusTypeQuery = `&status=${status.join(',')}`;
  }

  if (urgencyType && urgencyType?.length > 0) {
    urgencyTypeQuery = `&urgency_type=${urgencyType.join(',')}`;
  }

  return `${newUrl}${perPageQuery}${activeSeachTypeQuery}${searchTypeQuery}${maxBudgetToQuery}${statusTypeQuery}${urgencyTypeQuery}`;
};

export const generateFormData = values => {
  const formData = new FormData();

  Object.keys(values).forEach(key => {
    formData.append(key, values[key]);
  });

  return formData;
};

export const createFormDataEmailForm = async (values, emailsValuesTitles) => {
  const formData = await generateFormData(values);
  const attachments = values?.[emailsValuesTitles.attachments];

  formData.delete(emailsValuesTitles.attachments);

  if (attachments && attachments?.length > 0) {
    await attachments.map(attachment => {
      return formData.append(`${emailsValuesTitles.attachments}[]`, attachment);
    });
  }

  return formData;
};

export const addHandlersForButtons = (buttons, buttonsHandlers) => {
  return buttons.map(button => {
    switch (button.handlerKeyname) {
    case documentButtonsName.download:
      return {
        ...button,
        handleClick: buttonsHandlers[button.handlerKeyname],
      };

    case documentButtonsName.rename:
      return {
        ...button,
        handleClick: buttonsHandlers[button.handlerKeyname],
      };

    case documentButtonsName.delete:
      return {
        ...button,
        handleClick: buttonsHandlers[button.handlerKeyname],
      };

    default:
      return button;
    }
  });
};

export const createFormDataClientRequest = async (values, documents) => {
  const formData = await generateFormData(values);

  formData.delete('documents');

  if (documents && documents.length > 0) {
    await documents.map(doc => {
      return formData.append('documents[]', doc);
    });
  }

  for (const key in values) {
    if (
      Array.isArray(values[key]) &&
      values[key]?.length > 0 &&
      !key.includes('documents')
    ) {
      values[key].map(item => {
        return formData.append(`${key}[]`, item);
      });

      formData.delete(key);
    }
  }

  return formData;
};

export const generateSearchQueriesRealty = (
  initialSearchValuesNames,
  localisationSelectData,
  searchValuesNames,
  values
) => {
  const newValues = { ...values };

  delete newValues[initialSearchValuesNames.search];
  delete newValues[initialSearchValuesNames.properties];
  delete newValues[initialSearchValuesNames.find_deal];

  const queryParts = [];

  for (let key in newValues) {
    const value = newValues[key];

    if (!value || value === '' || (Array.isArray(value) && value.length === 0)) {
      delete newValues[key];
    } else if (key === searchValuesNames.localisation && value && value?.length !== 0) {
      localisationSelectData.forEach(item => {
        const numericItemValue = Number(item.value);
        const numericValues = value.map(val => Number(val));

        if (numericValues.includes(numericItemValue)) {
          return queryParts.push(`${key}[${item.titleBack}]=1`);
        }
      });
    } else if (Array.isArray(value) && key !== searchValuesNames.localisation) {
      value.map((item => {
        return queryParts.push(`${key}[]=${item}`);
      }));

      delete newValues[key];
    } else {
      queryParts.push(`${key}=${value}`);
    }
  }

  const query = queryParts.length > 0 ? `?search_type=1&${queryParts.join('&')}` : '?search_type=1';

  return query;
};

export const handlePageClick = (link, setPage) => {
  if (link) {
    setPage(link.slice(-1));
  }
};

export const generateStringValue = (values) => {
  let newValue = '';

  values.forEach((item, index) => {
    const isItem = item && item?.toString()?.length > 0;

    if (isItem && index === values.length - 1) {
      return newValue += `${item}`;
    } else if (isItem && index !== values.length - 1) {
      return newValue += `${item}, `;
    };
  });

  return newValue;
};

export const addVariablesInText = (values, client, user, variablesValues) => {
  const newValues = { ...values };
  
  for (const [key, value] of Object.entries(values)) {
    if (typeof value === 'string') {
      let newValue = value
        .replace(variablesValues.firstName, client?.first_name || '')
        .replace(variablesValues.lastName, client?.last_name || '')
        .replace(variablesValues.listingAgentFirstName, user?.first_name || '')
        .replace(variablesValues.listingAgentPhone, user?.phone || '')
        .replace(variablesValues.listingAgentEmail, user?.email || '');

      newValues[key] = newValue;
    };
  };

  return newValues;
};

export const handleWhatsUpClick = (phone) => {
  if (phone) {
    const formatedPhone = phone.replace(/[+\-\s]/g, '');

    window.open(
      `https://api.whatsapp.com/send/?phone=${formatedPhone}&text&type=phone_number&app_absent=0`
    );
  }
};

export const addHandlerForSearch = (mock, handleSearch, searchRequest = '') => {
  return mock.map(input => {
    if (input.fieldType === fieldTypes.defaultSearch) {
      return {
        ...input,
        handleSearch,
        defaultValue: searchRequest,
      };
    } else {
      return input;
    }
  });
};
