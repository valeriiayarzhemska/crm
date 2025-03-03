import { UsersRound, PhoneOutgoing, Computer, Check } from 'lucide-react';

export const searchItemClientsButtons = [
  {
    id: 1,
    value: 'visitRequests',
    tooltipText: 'Visit Requests',
    title: 5,
    icon: UsersRound,
  },
  {
    id: 2,
    value: 'preparationVessnart',
    tooltipText: 'Offer in preparation by Vessnart',
    title: 2,
    icon: PhoneOutgoing,
  },
  {
    id: 3,
    value: 'offerVessnart',
    tooltipText: 'Under offer with Vessnart',
    title: 1,
    icon: Computer,
  },
  {
    id: 4,
    value: 'compromiseVessnart',
    tooltipText: 'Under compromise with Vessnart',
    title: 0,
    icon: Check,
  },
];

export const textareaClientDefaultValue = `• Possible visits (dates):
• Location:
• Property criteria:
• Urgency of purchase:
• Personal Info:
• Financing:
• Already visited:
• What's more:
• Agencies:`;

export const clientTextarea = [
  {
    id: 1,
    name: 'note',
    fieldType: 'textareaDefaultValue',
    defaultValue: textareaClientDefaultValue,
    classNames: 'w-full',
  },
];
