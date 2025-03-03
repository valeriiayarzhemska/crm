import { Clients } from '../pages/Clients';
import { Emails } from '../pages/Emails';
import { Login } from '../pages/Login';
import { Main } from '../pages/Main';
import { Registration } from '../pages/Registration';
import { Reminders } from '../pages/Reminders';
import { Settings } from '../pages/Settings';

export const routesNonAuthorised = [
  {
    id: 1,
    path: '/',
    isAuthorised: false,
    element: <Login />,
  },
  {
    id: 2,
    path: '/login',
    isAuthorised: false,
    element: <Login />,
  },
  {
    id: 3,
    path: '/registration',
    isAuthorised: false,
    element: <Registration />,
  },
];

export const routesAuthorised = [
  {
    id: 1,
    path: '/',
    isAuthorised: true,
    element: <Main />,
  },
  {
    id: 2,
    path: '/settings',
    isAuthorised: true,
    element: <Settings />,
  },
  {
    id: 3,
    path: '/clients',
    isAuthorised: true,
    element: <Clients />,
  },
  {
    id: 4,
    path: '/reminders',
    isAuthorised: true,
    element: <Reminders />,
  },
  {
    id: 5,
    path: '/emails',
    isAuthorised: true,
    element: <Emails />,
  },
];
