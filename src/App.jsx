import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUserToken } from './redux/features/user/userSelectors';
import { useGetCountriesQuery } from './redux/services/data/countriesApi';
import {
  useGetAgentsAssistantsQuery,
  useGetAgentsAssistantsWithUserQuery,
} from './redux/services/agents/agentsApi';
import { useGetUserInfoMutation } from './redux/services/user/userApi';
import { useGetNotificationsQuery } from './redux/services/notifications/notificationsApi';

import { SideBar } from './layouts/SideBar';
import { Loader } from './components/ui/Loader';
import { NotFound } from './pages/NotFound';
import { NavMobile } from './layouts/NavMobile';
import { ToasterComponent } from './components/ui/ToasterComponent';

import { routesAuthorised, routesNonAuthorised } from './routes';
import { sideLinksAuthorised, sideLinksNonAuthorised } from './data/sidebar';
import { errorMessages } from './data/constants';
import { handleOverflowHiddenToBody, showError } from './utils/ui';

import './index.css';
import { MapPage } from './pages/MapPage';

function App() {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sideLinks, setSideLinks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userToken = useSelector(selectUserToken);
  const {
    data: countries = [],
    isLoading: isCountriesLoading,
    error: countriesError,
  } = useGetCountriesQuery();
  const {
    data,
    isLoading: isAssistantsLoading,
    error: assistantsError,
  } = useGetAgentsAssistantsQuery(userToken, { skip: !userToken });
  const {
    data: assistantsWithUser,
    isLoading: isAssistantsUserLoading,
    error: assistantsUserError,
  } = useGetAgentsAssistantsWithUserQuery(userToken, { skip: !userToken });
  const [getUserInfo, { isLoading: isUserInfoLoading, error: userInfoError }] =
    useGetUserInfoMutation();
  const {
    data: notificationsData = [],
    isLoading: isNotificationsLoading,
    error: notificationsError,
  } = useGetNotificationsQuery(
    { token: userToken },
    {
      pollingInterval: 1800000,
      skipPollingIfUnfocused: true,
      skip: !userToken,
    }
  );

  const isPWA = () => {
    return window.matchMedia('(display-mode: standalone)').matches;
  };
  const isPwa = isPWA();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    handleOverflowHiddenToBody(!isSidebarOpen);
  };

  const toggleSidebarClose = () => {
    setIsSidebarOpen(false);
    handleOverflowHiddenToBody(false);
  };

  const setRouting = async () => {
    setIsLoading(true);

    if (userToken) {
      await setSideLinks(sideLinksAuthorised);
      await setRoutes(routesAuthorised);
    } else {
      await setSideLinks(sideLinksNonAuthorised);
      await setRoutes(routesNonAuthorised);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (userToken) {
      getUserInfo(userToken);
    }
  }, [userToken]);

  useEffect(() => {
    setRouting();
  }, [userToken]);

  useEffect(() => {
    showError(notificationsError, errorMessages.notifications);
  }, [notificationsError]);

  return (
    <>
      <ToasterComponent />

      <SideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebarClose={toggleSidebarClose}
        sideLinks={sideLinks}
        isPwa={isPwa}
      />

      <div className="flex flex-col md:flex-row">
        <NavMobile
          toggleSidebarClose={toggleSidebarClose}
          toggleSidebar={toggleSidebar}
        />

        {isLoading ? (
          <div className="flex flex-col justify-center items-center gap-5 pt-[4.4rem] pb-6 pl-2 pr-2 w-full h-screen bg-white md:pt-6 md:pr-5 md:pl-[11.5rem] lg:pl-[12.25rem]">
            <Loader
              height={40}
              width={40}
            />
          </div>
        ) : (
          <Routes>
            {routes.map(route => {
              const { id, path, element, isAuthorised } = route;

              if (
                (userToken && isAuthorised) ||
                (!userToken && !isAuthorised)
              ) {
                return (
                  <Route
                    key={id}
                    path={path}
                    element={element}
                  />
                );
              }
            })}

            {isPwa && userToken && (
              <Route
                path={'/map'}
                element={<MapPage />}
              />
            )}

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
