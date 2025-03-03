import { toast } from 'sonner';
import { filterDataByKey } from './utils';
import { matchingValues } from '../data/constants';

export const removeKeywordTags = () => {
  const tags = document.querySelectorAll('.ReactTags__tag');

  tags.forEach(tag => tag.remove());
};

export const handleOverflowHiddenToBody = disable => {
  if (disable) {
    document.body.classList.add('disable-body-scroll');
  } else {
    document.body.classList.remove('disable-body-scroll');
  }
};

export const disableBodyScroll = isDisabled => {
  if (isDisabled) {
    document.body.classList.add('disable-scroll');
  } else {
    document.body.classList.remove('disable-scroll');
  }
};

export function transformAssistantsDataInputs(assistants) {
  const newAssistants = assistants.map(assistant => {
    const modifiedAssistant = { ...assistant };

    modifiedAssistant.title =
      modifiedAssistant.agent_name || modifiedAssistant.name;
    modifiedAssistant.value = modifiedAssistant.id;

    delete modifiedAssistant.agent_name;
    delete modifiedAssistant.name;
    delete modifiedAssistant.id;

    return modifiedAssistant;
  });

  return newAssistants;
}

export function hideInput(className) {
  const element = document.querySelector('.' + className);

  if (element) {
    element.style.display = 'none';
  }
}

export function showInput(className) {
  const element = document.querySelector('.' + className);

  if (element) {
    element.style.display = 'block';
  }
}

export function createInfoBadges(badges) {
  const newBadges = [];

  badges.forEach(badge => {
    if (badge && Array.isArray(badge)) {
      newBadges.push(badge.join(', '));
    } else if (badge && badge.length > 0) {
      newBadges.push(badge);
    }
  });

  return newBadges;
}

export const getColorBadge = (staticData, data) => {
  if (data && (data?.value || data?.value === 0)) {
    let color = staticData.at(data.value)?.color;

    return color ? color : 'border-lightestGrayColor bg-lightestGrayColor';
  } else {
    return 'border-lightestGrayColor bg-lightestGrayColor';
  }
};

export function closeDialog({ handleClose, setState }) {
  if (handleClose) {
    handleClose();
  }

  if (setState) {
    setState(false);
  }

  disableBodyScroll();
}

export function handleResetSelectsRefs(inputKeys, refs) {
  inputKeys.map(inputKey => {
    return Object.keys(refs).forEach(key => {
      const ref = refs[key];

      if (ref && key === inputKey && ref.current) {
        if (ref.current.resetSelectedValues) {
          ref.current.resetSelectedValues();
          ref.setSelectedValue('');
        }

        ref.setFieldValue(key, '');
      }
    });
  });
}

export const transformTitles = async (titles, setSelectDataTitles, color) => {
  const transormedTitles = await titles.map(title => {
    return {
      title,
      value: title,
      color: color ? color : 'text-whiteColor bg-redColor border-redColor',
    };
  });

  setSelectDataTitles(transormedTitles);
};

export const handleMovingFiles = ({
  titleToAdd,
  titleToDelete,
  setState,
  selectedFiles,
  files,
  filterKey,
}) => {
  setState(prevFiles => {
    const filesToMove = selectedFiles?.[titleToDelete];
    const filesToLeave = prevFiles?.[titleToAdd];
    const filesToLeaveInSelected = filterDataByKey(
      files?.[titleToDelete],
      selectedFiles?.[titleToDelete],
      filterKey
    );

    return {
      ...prevFiles,
      [titleToAdd]: filesToLeave
        ? [...filesToLeave, ...filesToMove]
        : [...filesToMove],
      [titleToDelete]: filesToLeaveInSelected,
    };
  });
};

export function showError(error, errorMessage) {
  if (error && error.length > 0) {
    toast.error(errorMessage ? errorMessage : error, {
      error: true,
      action: {},
    });
  }
}

export function scrollToElement(className) {
  const element = document.querySelector(`.${className}`);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export const generateDetailsInfo = (details) => {
  let string = '';

  details.map(detail => {
    if (detail && detail.length > 0) {
      string += `• ${detail}`;
    }
  });

  return string;
}; 

export const generateCharacteristics = (characs) => {
  const stringArray = [];
  let realtyType = '';

  for (const [key, value] of Object.entries(characs)) {
    if (value || value === 0) {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');

      switch (key) {
      case 'realty_type':
        realtyType += value?.title;
        break;
      case 'living_area':
        realtyType += ` ${value} m²`;
        stringArray.push(realtyType);
        break;
      case 'terrace':
        stringArray.push(`${formattedKey} ${value} m²`);
        break;
      case 'land_area':
        stringArray.push(`Garden ${value} m²`);
        break;
      case 'parking_garage_space':
        stringArray.push(`Garages: ${value}`);
        break;
      case 'parking_parking_space':
        stringArray.push(`Parking spaces: ${value}`);
        break;
      case 'parking_storage_space':
        stringArray.push(`Storages: ${value}`);
        break;
      default:
        stringArray.push(`${formattedKey}: ${value}`);
        break;
      }
    }
  }

  return stringArray.join(' • ');
};

export const loadLikeData = (likes, id, setLikeStatus) => {
  if (likes?.like && likes?.like?.includes(id)) {
    return setLikeStatus(matchingValues[1]);
  } else if (likes?.dislike && likes?.dislike?.includes(id)) {
    return setLikeStatus(matchingValues[2]);
  } else {
    return setLikeStatus(matchingValues[0]);
  }
};

export const handleLikeChange = (likeStatus, setLikeStatus) => {
  switch (likeStatus.value) {
  case matchingValues[0].value:
    setLikeStatus(matchingValues[1]);

    return matchingValues[1].value;
  case matchingValues[1].value:
    setLikeStatus(matchingValues[2]);

    return matchingValues[2].value;
  case matchingValues[2].value:
    setLikeStatus(matchingValues[0]);

    return matchingValues[0].value;
  default:
    setLikeStatus(matchingValues[0]);

    return matchingValues[0].value;
  }
};
