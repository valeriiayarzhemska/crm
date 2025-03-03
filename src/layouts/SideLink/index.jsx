import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { colors } from '../../data/constants';

export const SideLink = ({ link, toggleSidebarClose }) => {
  const { to, title, icon } = link;
  const Icon = icon;

  return (
    <>
      <NavLink
        className={({ isActive }) => {
          return cn(
            {
              'bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700':
                isActive,
            },
            'flex items-center px-3 py-2 w-full text-black transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'
          );
        }}
        to={to}
        onClick={toggleSidebarClose}
      >
        <div className="flex items-center">
          <Icon
            color={colors.blackColor}
            size={16}
          />
        </div>

        <span className="mx-2 text-xs font-medium uppercase lg:text-sm">
          {title}
        </span>
      </NavLink>
    </>
  );
};
