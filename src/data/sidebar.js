import {
  Home,
  AlarmClock,
  SquareUser,
  Mail,
  Bell,
  User,
  MapPin,
} from 'lucide-react';
import { selectNotificationsDataUnread } from '../redux/features/dashboard/dashboardSelectors';

import { NotificationBar } from '../components/ui/NotificationBar';

export const sideLinksAuthorised = [
  {
    id: 1,
    to: '/',
    title: 'My page',
    icon: Home,
  },
  {
    id: 2,
    to: '/map',
    title: 'Map',
    icon: MapPin,
    isForPwa: true,
  },
  {
    id: 3,
    to: '/reminders',
    title: 'Reminders',
    icon: AlarmClock,
  },
  {
    id: 4,
    to: '/clients',
    title: 'Clients',
    icon: SquareUser,
  },
  {
    id: 5,
    to: '/emails',
    title: 'Emails',
    icon: Mail,
  },
  {
    id: 6,
    title: 'Notifications',
    icon: Bell,
    classes: 'mt-4',
    component: NotificationBar,
    counterTipRedux: selectNotificationsDataUnread,
  },
  {
    id: 7,
    to: '/settings',
    title: 'Settings',
    icon: User,
    subtitle: 'username',
  },
];

export const sideLinksNonAuthorised = [
  {
    id: 1,
    to: '/login',
    title: 'Login',
    icon: User,
  },
  {
    id: 2,
    to: '/registration',
    title: 'Registration',
    icon: SquareUser,
  },
];
