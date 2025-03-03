import { mockAccordionTitles } from '../../../data/constants';

const mockTitle = mockAccordionTitles.Comment;

export const commentMockValues = {
  comment_comment: '',
  comment_web_link: '',
  comment_isExclusive: '',
};

export const commentMock = [
  {
    title: mockTitle,
    subtitle: 'Comment',
    id: 1,
    placeholder: 'Comment',
    fieldType: 'textarea',
    name: 'comment_comment',
    classes: 'h-32',
    classNames: 'w-full',
  },
  {
    title: mockTitle,
    subtitle: 'Web Link *',
    id: 2,
    placeholder: 'Web Link',
    fieldType: 'textarea',
    name: 'comment_web_link',
    classes: 'h-20',
    classNames: 'w-full',
  },
  {
    title: mockTitle,
    id: 3,
    checkboxText: 'Exclusive mandate of colleague',
    name: 'comment_isExclusive',
    fieldType: 'checkbox',
    classNames: 'w-max',
  },
];
