export const calendarInputs = state =>
  state.dashboard.mainPage.addedRequestCalendars;
export const selectIsSearch = state => state.dashboard.mainPage.isSearch;
export const selectSearchType = state => state.dashboard.mainPage.searchType;
export const selectSearchQuery = state => state.dashboard.mainPage.searchQuery;
export const selectSearchQueryRequest = state => state.dashboard.mainPage.searchQueryRequest;
export const selectSearchFilters = state => state.dashboard.mainPage.searchFilters;
export const selectSearchPage = state => state.dashboard.mainPage.searchPage;
export const selectTotalCount = state => state.dashboard.mainPage.totalSearchResults;
export const selectSortBy = state => state.dashboard.mainPage.searchSortBy;
export const selectShowMap = state => state.dashboard.mainPage.showMap;
export const selectFavsRealties = state => state.dashboard.mainPage.favsRealties;

export const selectMockAdditional = state => state.dashboard.mainPage.searchMockAdditional;
export const selectMockMore = state => state.dashboard.mainPage.searchMockMore;
export const selectMockSort = state => state.dashboard.mainPage.searchMockSort;
export const selectSearchInitialValues = state => state.dashboard.mainPage.searchInitialValues;
export const selectSearchRequestInfo = state => state.dashboard.mainPage.searchRequestInfo;
export const selectSearchClientInfo = state => state.dashboard.mainPage.searchClientInfo;
export const selectSearchLoading = state => state.dashboard.mainPage.isSearchLoading;
export const selectSearchRequestId = state => state.dashboard.mainPage.searchRequestId;

export const selectClientsToggleList = state => state.dashboard.clientsPage.toggleList;

export const countriesData = state => state.dashboard.countries;
export const countriesDataLoading = state => state.dashboard.countriesLoading;
export const countriesDataError = state => state.dashboard.countriesError;
export const selectedCountryId = state => state.dashboard.selectedCountryId;

export const citiesData = state => state.dashboard.cities;
export const citiesDataLoading = state => state.dashboard.citiesLoading;
export const citiesDataError = state => state.dashboard.citiesError;
export const citiesSelectsData = state => state.dashboard.citiesSelect;
export const citiesSelectsDataLoading = state =>
  state.dashboard.citiesSelectLoading;
export const citiesSelectsDataError = state =>
  state.dashboard.citiesSelectError;

export const districtsData = state => state.dashboard.districts;
export const districtsDataLoading = state => state.dashboard.districtsLoading;
export const districtsDataError = state => state.dashboard.districtsError;

export const streetsSearchData = state => state.dashboard.streetsSearch;
export const streetsSearchDataLoading = state => state.dashboard.streetsSearchLoading;
export const streetsData = state => state.dashboard.streets;
export const streetsDataLoading = state => state.dashboard.streetsLoading;
export const streetsDataError = state => state.dashboard.streetsError;

export const streetsNumbersData = state => state.dashboard.streetsNumbers;
export const streetsNumbersDataLoading = state =>
  state.dashboard.streetsNumbersLoading;
export const streetsNumbersDataError = state =>
  state.dashboard.streetsNumbersError;

export const residencesSearchData = state => state.dashboard.residencesSearch;
export const residencesSearchDataLoading = state => state.dashboard.residencesSearchLoading;
export const residencesData = state => state.dashboard.residences;
export const residencesDataLoading = state => state.dashboard.residencesLoading;
export const residencesDataError = state => state.dashboard.residencesError;

export const agentsData = state => state.dashboard.agents;
export const agentsDataLoading = state => state.dashboard.agentsLoading;
export const agentsDataError = state => state.dashboard.agentsError;
export const agentsDataWithUser = state => state.dashboard.agentsWithUser;
export const agentsDataWithUserLoading = state =>
  state.dashboard.agentsWithUserLoading;
export const agentsDataWithUserError = state =>
  state.dashboard.agentsWithUserError;

export const selectNotificationsDataUnread = state =>
  state.dashboard.notificationsUnread;
export const selectNotificationsDataLoading = state =>
  state.dashboard.notificationsLoading;
export const selectNotificationsDataError = state =>
  state.dashboard.notificationsError;
