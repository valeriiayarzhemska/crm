import cn from 'classnames';

import { SideLink } from '../SideLink';
import { SideItem } from '../SideItem';

export const SideBar = ({ sideLinks, isSidebarOpen, toggleSidebarClose, isPwa }) => {
  return (
    <>
      <div
        className={cn(
          'block fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity md:hidden',
          { 'opacity-100 block': isSidebarOpen },
          { 'opacity-0 pointer-events-none hidden': !isSidebarOpen }
        )}
        onClick={toggleSidebarClose}
      ></div>

      <aside
        className={cn(
          'sidebar fixed inset-y-0 left-0 z-10 flex flex-col w-[10.2rem] min-w-[10.2rem] h-screen px-5 py-8 overflow-y-auto bg-white border-r-8 rtl:border-r-0 border-white rtl:border-l transition-transform transform dark:bg-gray-900 dark:border-gray-700 md:border-gray-100 lg:w-44 lg:min-w-44 md:z-0',
          { 'translate-x-0': isSidebarOpen },
          { '-translate-x-full md:translate-x-0': !isSidebarOpen }
        )}
      >
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-6 ">
            <div className="flex flex-col gap-3">
              {sideLinks.map((link, index) => {
                if (!isPwa && link?.isForPwa) {
                  return;
                } else if (link?.to) {
                  return (
                    <SideLink
                      key={link.id}
                      link={link}
                      toggleSidebarClose={toggleSidebarClose}
                    />
                  );
                } else {
                  return (
                    <SideItem
                      key={link.id}
                      link={link}
                      toggleSidebarClose={toggleSidebarClose}
                    />
                  );
                }
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};
