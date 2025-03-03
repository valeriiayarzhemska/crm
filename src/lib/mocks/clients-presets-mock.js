export const initialValues = { max_budget: '' };

const presetsParametersSelectData = [
  { title: 'None' },
  { title: 'My high budget requests' },
];

export const mock = [
  {
    id: 1,
    placeholder: 'Presets parameters',
    isSelect: true,
    name: 'presets_parameters',
    selectData: presetsParametersSelectData,
    classNames: 'w-3/12',
  },
];

export const mockMore = [
  {
    id: 1,
    name: 'max_budget',
    classNames: 'w-1/5',
    type: 'number',
  },
];
