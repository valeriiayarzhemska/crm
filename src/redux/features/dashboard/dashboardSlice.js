import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { calendarsName } from '../../../lib/mocks/add-request-mock';
import { countriesApi } from '../../services/data/countriesApi';
import { agentsApi } from '../../services/agents/agentsApi';
import { notificationsApi } from '../../services/notifications/notificationsApi';
import { initialValues } from '../../../lib/mocks/search-mock';
import { requestDealsToggleData } from '../../../lib/mocks/clients-mock';

const initialState = {
  mainPage: {
    addedRequestCalendars: calendarsName,
    isSearch: false,
    searchType: '',
    searchQuery: '',
    searchQueryRequest: '',
    totalSearchResults: 0,
    searchFilters: '',
    searchPage: '',
    searchSortBy: '',
    searchMockAdditional: [],
    searchMockMore: [],
    searchMockSort: [],
    searchInitialValues: initialValues,
    searchRequestInfo: null,
    searchClientInfo: null,
    isSearchLoading: false,
    searchRequestId: null,
    showMap: false,
    favsRealties: [],
  },

  clientsPage: {
    toggleList: requestDealsToggleData,
  },

  agents: [],
  agentsLoading: false,
  agentsError: null,
  agentsWithUser: [],
  agentsWithUserLoading: false,
  agentsWithUserError: null,

  countries: [],
  countriesLoading: false,
  countriesError: null,
  selectedCountryId: 73,
  cities: [],
  citiesLoading: false,
  citiesError: null,
  citiesSelect: [],
  citiesSelectLoading: false,
  citiesSelectError: null,
  districts: [],
  districtsLoading: false,
  districtsError: null,

  streetsSearch: [],
  streetsSearchLoading: false,
  streets: [],
  streetsLoading: false,
  streetsError: null,
  streetsNumbers: [],
  streetsNumbersLoading: false,
  streetsNumbersError: null,

  residences: [],
  residencesLoading: false,
  residencesSearch: [],
  residencesSearchLoading: false,
  residencesError: null,

  notificationsUnread: null,
};

export const setAgents = createAsyncThunk(
  'dashboard/setAgents',
  async payload => payload
);

// setSelectCities is the same as setCities, needed when we have 2 selects
// in one form, cuz data must be in redux
export const setCities = createAsyncThunk(
  'dashboard/setCities',
  async payload => payload
);

export const setSelectCities = createAsyncThunk(
  'dashboard/setSelectCities',
  async payload => payload
);

export const setDistricts = createAsyncThunk(
  'dashboard/setDistricts',
  async payload => payload
);

export const setStreets = createAsyncThunk(
  'dashboard/setStreets',
  async payload => payload
);

export const setStreetsSearch = createAsyncThunk(
  'dashboard/setStreetsSearch',
  async payload => payload
);

export const filterStreetsSearch = createAsyncThunk(
  'dashboard/filterStreetsSearch',
  async payload => payload
);

export const setStreetsNumbers = createAsyncThunk(
  'dashboard/setStreetsNumbers',
  async payload => payload
);

export const setResidences = createAsyncThunk(
  'dashboard/setResidences',
  async payload => payload
);

export const setResidencesSearch = createAsyncThunk(
  'dashboard/setResidencesSearch',
  async payload => payload
);

export const filterResidencesSearch = createAsyncThunk(
  'dashboard/filterResidencesSearch',
  async payload => payload
);

export const setSearchMockAdditional = createAsyncThunk(
  'dashboard/setSearchMockAdditional',
  async payload => payload
);

export const setSearchInitialValues = createAsyncThunk(
  'dashboard/setSearchInitialValues',
  async payload => payload
);

export const setSearchMockMore = createAsyncThunk(
  'dashboard/setSearchMockMore',
  async payload => payload
);

export const setSearchMockSort = createAsyncThunk(
  'dashboard/setSearchMockSort',
  async payload => payload
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,

  reducers: {
    addRequestCalendar: state =>
      void (state.mainPage.addedRequestCalendars = [
        ...state.mainPage.addedRequestCalendars.slice(1),
      ]),
    deleteRequestCalendar: (state, action) =>
      void (state.mainPage.addedRequestCalendars = [
        ...state.mainPage.addedRequestCalendars,
        action.payload,
      ]),
    showSearch: (state, action) => {
      state.mainPage.isSearch = action.payload.isSearchVisible;
      state.mainPage.searchType = action.payload.searchType;
      state.mainPage.searchQuery = action.payload.searchQuery;
      state.mainPage.searchQueryRequest = action.payload.searchQueryRequest;
      state.mainPage.searchFilters = action.payload.searchFilters;
      state.mainPage.searchPage = action.payload.searchPage;
    },
    setSearchPage: (state, action) => {
      state.mainPage.searchPage = action.payload;
    },
    setTotalSearchResults: (state, action) => {
      state.mainPage.totalSearchResults = action.payload;
    },
    setSortBy: (state, action) => {
      state.mainPage.searchSortBy = action.payload;
    },
    setSearchRequestInfo: (state, action) => {
      state.mainPage.searchRequestInfo = action.payload;
    },
    setSearchClientInfo: (state, action) => {
      state.mainPage.searchClientInfo = action.payload;
    },
    setSearchLoading: (state, action) => {
      state.mainPage.isSearchLoading = action.payload;
    },
    setSearchRequestId: (state, action) => {
      state.mainPage.searchRequestId = action.payload;
    },
    setShowMap: (state, action) => {
      state.mainPage.showMap = action.payload;
    },
    setFavsRealties: (state, action) => {
      state.mainPage.favsRealties = action.payload;
    },
    setClientsToggleList: (state, action) => {
      state.clientsPage.toggleList = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(setCities.pending, (state, action) => {
      state.citiesLoading = true;
    });
    builder.addCase(setCities.fulfilled, (state, action) => {
      state.cities = action.payload;
      state.citiesLoading = false;
    });
    builder.addCase(setSelectCities.pending, (state, action) => {
      state.citiesSelectLoading = true;
    });
    builder.addCase(setSelectCities.fulfilled, (state, action) => {
      state.citiesSelect = action.payload;
      state.citiesSelectLoading = false;
    });

    builder.addCase(setDistricts.pending, (state, action) => {
      state.districtsLoading = true;
    });
    builder.addCase(setDistricts.fulfilled, (state, action) => {
      state.districts = action.payload;
      state.districtsLoading = false;
    });

    builder.addCase(setStreets.pending, (state, action) => {
      state.streetsLoading = true;
    });
    builder.addCase(setStreets.fulfilled, (state, action) => {
      state.streets = action.payload;
      state.streetsLoading = false;
    });
    builder.addCase(setStreetsSearch.pending, (state, action) => {
      state.streetsSearchLoading = true;
    });
    builder.addCase(setStreetsSearch.fulfilled, (state, action) => {
      const newStreets = action.payload;

      const hasCurrentCity = state.streetsSearch.some(
        street => street.city_id.id === newStreets[0]?.city_id.id
      );

      if (!hasCurrentCity) {
        state.streetsSearch = [...state.streetsSearch, ...action.payload];
      }

      state.streetsSearchLoading = false;
    });
    builder.addCase(filterStreetsSearch.fulfilled, (state, action) => {
      const id = action.payload;

      if (!id || id?.length < 1) {
        state.streetsSearch = [];
      } else {
        state.streetsSearch = state.streetsSearch.filter(
          street => street.city_id.id !== id
        );
      }
    });

    builder.addCase(setStreetsNumbers.pending, (state, action) => {
      state.streetsNumbersLoading = true;
    });
    builder.addCase(setStreetsNumbers.fulfilled, (state, action) => {
      state.streetsNumbers = action.payload;
      state.streetsNumbersLoading = false;
    });

    builder.addCase(setResidences.pending, (state, action) => {
      state.residencesLoading = true;
    });
    builder.addCase(setResidences.fulfilled, (state, action) => {
      state.residences = action.payload;
      state.residencesLoading = false;
    });
    builder.addCase(setResidencesSearch.pending, (state, action) => {
      state.residencesSearchLoading = true;
    });
    builder.addCase(setResidencesSearch.fulfilled, (state, action) => {
      const newResidences = action.payload;
      const hasCurrentCity = state.residencesSearch.some(
        residence => residence.city_id.id === newResidences[0]?.city_id.id
      );

      if (!hasCurrentCity) {
        state.residencesSearch = [...state.residencesSearch, ...action.payload];
      }

      state.residencesSearchLoading = false;
    });
    builder.addCase(filterResidencesSearch.fulfilled, (state, action) => {
      const id = action.payload;
      if (!id || id?.length < 1) {
        state.residencesSearch = [];
      } else {
        state.residencesSearch = state.residencesSearch.filter(
          residence => residence.city_id.id !== id
        );
      }
    });

    builder.addCase(setSearchMockAdditional.fulfilled, (state, action) => {
      state.mainPage.searchMockAdditional = action.payload;
    });
    builder.addCase(setSearchMockMore.fulfilled, (state, action) => {
      state.mainPage.searchMockMore = action.payload;
    });
    builder.addCase(setSearchMockSort.fulfilled, (state, action) => {
      state.mainPage.searchMockSort = action.payload;
    });
    builder.addCase(setSearchInitialValues.fulfilled, (state, action) => {
      state.mainPage.searchInitialValues = action.payload;
    });

    builder.addMatcher(
      agentsApi.endpoints.getAgentsAssistants.matchPending,
      (state, action) => {
        state.agentsLoading = true;
      }
    );
    builder.addMatcher(
      agentsApi.endpoints.getAgentsAssistants.matchFulfilled,
      (state, action) => {
        state.agentsError = null;
        state.agents = action.payload;
        state.agentsLoading = false;
      }
    );
    builder.addMatcher(
      agentsApi.endpoints.getAgentsAssistants.matchRejected,
      (state, action) => {
        console.log('Error in fetching agentsWithUser');
        state.agentsWithUserError = 'Error in fetching agentsWithUser';
        state.agentsWithUserLoading = false;
      }
    );

    builder.addMatcher(
      agentsApi.endpoints.getAgentsAssistantsWithUser.matchPending,
      (state, action) => {
        state.agentsWithUserLoading = true;
      }
    );
    builder.addMatcher(
      agentsApi.endpoints.getAgentsAssistantsWithUser.matchFulfilled,
      (state, action) => {
        state.agentsWithUserError = null;
        state.agentsWithUser = action.payload;
        state.agentsWithUserLoading = false;
      }
    );
    builder.addMatcher(
      agentsApi.endpoints.getAgentsAssistantsWithUser.matchRejected,
      (state, action) => {
        console.log('Error in fetching agentsWithUser');
        state.agentsWithUserError = 'Error in fetching agentsWithUser';
        state.agentsWithUserLoading = false;
      }
    );

    builder.addMatcher(
      countriesApi.endpoints.getCountries.matchPending,
      (state, action) => {
        state.countriesLoading = true;
      }
    );
    builder.addMatcher(
      countriesApi.endpoints.getCountries.matchFulfilled,
      (state, action) => {
        state.countriesError = null;
        state.countries = action.payload;
        state.countriesLoading = false;
      }
    );
    builder.addMatcher(
      countriesApi.endpoints.getCountries.matchRejected,
      (state, action) => {
        console.log('Error in fetching countries: ', action);
        state.countriesError = 'Error in fetching countries';
        state.countriesLoading = false;
      }
    );

    builder.addMatcher(
      notificationsApi.endpoints.getNotifications.matchPending,
      (state, action) => {
        state.notificationsLoading = true;
      }
    );
    builder.addMatcher(
      notificationsApi.endpoints.getNotifications.matchFulfilled,
      (state, action) => {
        state.notificationsError = null;

        if (action.payload?.meta?.unread_count) {
          const unreadCount = action.payload.meta.unread_count;

          state.notificationsUnread = unreadCount;
        } else {
          state.notificationsUnread = null;
        }

        state.notificationsLoading = false;
      }
    );
    builder.addMatcher(
      notificationsApi.endpoints.getNotifications.matchRejected,
      (state, action) => {
        console.log('Error in fetching notifications: ', action);
        state.notificationsError = 'Error in fetching notifications';
        state.notificationsLoading = false;
      }
    );

    builder.addMatcher(
      notificationsApi.endpoints.readAllNotifications.matchFulfilled,
      (state, action) => {
        state.notificationsUnread = null;
      }
    );

    /* builder.addMatcher(
      citiesApi.endpoints.getCitiesForCountry.matchFulfilled,
      (state, action) => {
        state.citiesError = null;
        state.cities = action.payload;
      }
    );
    builder.addMatcher(
      citiesApi.endpoints.getCitiesForCountry.matchRejected,
      (state, action) => {
        console.log('Error in fetching cities: ', action);
        state.citiesError = 'Error in fetching cities';
      }
    );

    builder.addMatcher(
      districtsApi.endpoints.getDistrictsForCity.matchFulfilled,
      (state, action) => {
        state.districtsError = null;
        state.districts = action.payload;
      }
    );
    builder.addMatcher(
      districtsApi.endpoints.getDistrictsForCity.matchRejected,
      (state, action) => {
        console.log('Error in fetching districts: ', action);
        state.districtsError = 'Error in fetching districts';
      }
    );

    builder.addMatcher(
      streetsApi.endpoints.getStreetsForCity.matchFulfilled,
      (state, action) => {
        state.streetsError = null;
        state.streets = action.payload;
      }
    );
    builder.addMatcher(
      streetsApi.endpoints.getStreetsForCity.matchRejected,
      (state, action) => {
        console.log('Error in fetching streets: ', action);
        state.streetsError = 'Error in fetching streets';
      }
    );

    builder.addMatcher(
      streetsNumberApi.endpoints.getStreetsNumberForStreet.matchFulfilled,
      (state, action) => {
        state.streetsNumbersError = null;
        state.streetsNumbers = action.payload;
      }
    );
    builder.addMatcher(
      streetsNumberApi.endpoints.getStreetsNumberForStreet.matchRejected,
      (state, action) => {
        console.log('Error in fetching streetsNumbers: ', action);
        state.streetsNumbersError = 'Error in fetching streetsNumbers';
      }
    );

    builder.addMatcher(
      residencesApi.endpoints.getResidencesForCity.matchFulfilled,
      (state, action) => {
        state.residencesError = null;
        state.residences = action.payload;
      }
    );
    builder.addMatcher(
      residencesApi.endpoints.getResidencesForCity.matchRejected,
      (state, action) => {
        console.log('Error in fetching residences: ', action);
        state.residencesError = 'Error in fetching residences';
      }
    ); */
  },
});

export const {
  addRequestCalendar,
  deleteRequestCalendar,
  addAgents,
  showSearch,
  setTotalSearchResults,
  setSortBy,
  setSearchRequestInfo,
  setSearchClientInfo,
  setSearchLoading,
  setSearchPage,
  setSearchRequestId,
  setShowMap,
  setClientsToggleList,
  setFavsRealties,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
