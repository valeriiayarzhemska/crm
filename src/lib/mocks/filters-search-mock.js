import {
  statusSelectData,
  urgentResearchSelectData,
  yesSelectData,
} from '../../data/constants';

const searchValuesNames = {
  realty_status: 'realty_status',
  urgent_research: 'urgent_research',
  fix_visits: 'fix_visits',
};

export const initialValues = {
  [searchValuesNames.realty_status]: '',
  [searchValuesNames.urgent_research]: '',
  [searchValuesNames.fix_visits]: '',
};

export const mock = [
  {
    id: 1,
    placeholder: 'Status',
    fieldType: 'multiselect',
    selectData: statusSelectData,
    name: searchValuesNames.realty_status,
    classNames: 'w-full',
  },
  {
    id: 2,
    placeholder: 'Urgent research',
    fieldType: 'select',
    selectData: urgentResearchSelectData,
    name: searchValuesNames.urgent_research,
    classNames: 'w-full',
  },
  {
    id: 3,
    placeholder: '"Fix visit" status pending',
    fieldType: 'select',
    selectData: yesSelectData,
    name: searchValuesNames.fix_visits,
    classNames: 'w-full',
  },
];
