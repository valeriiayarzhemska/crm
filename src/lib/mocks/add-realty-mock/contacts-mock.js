import { Pencil, Plus, Trash } from 'lucide-react';
import {
  contactsInputsNames,
  inputButtonType,
  mockAccordionTitles,
} from '../../../data/constants';
import { AddContactForm } from '../../../components/form/forms/realtyForm/AddContactForm';

const mockTitle = mockAccordionTitles.Contacts;

export const contactsMockValues = {
  contacts: [],
};

export const contactsMock = [
  {
    title: mockTitle,
    id: 1,
    placeholder: 'Search contact',
    name: contactsInputsNames.contactInput,
    fieldType: 'select',
    buttons: [
      {
        type: inputButtonType.delete,
        icon: Trash,
      },
      {
        type: inputButtonType.edit,
        icon: Pencil,
        dialogContent: AddContactForm,
      },
      {
        type: inputButtonType.add,
        icon: Plus,
        dialogContent: AddContactForm,
      },
    ],
    classNames: 'w-full sm:w-[64.6%]',
  },
];
