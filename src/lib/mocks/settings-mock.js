export const initialValues = { language: '' };

const langSelectData = [{ title: 'EN' }, { title: 'FR' }];

export const mock = [
  {
    id: 1,
    placeholder: 'Language',
    fieldType: 'select',
    selectData: langSelectData,
    defaultValue: [{ title: 'EN' }],
    name: 'language',
    classNames: 'w-2/6',
  },
];
