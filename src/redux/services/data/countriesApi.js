import { api } from '../api';
import { links } from '../../../data/links';
import { changePropertyName } from '../../../utils/data';
import { dataTypes } from '../../../data/constants';

export const countriesApi = api.injectEndpoints({
  endpoints: build => ({
    getCountries: build.query({
      query: () => ({
        url: links.registerData,
      }),
      transformResponse: responseData => {
        const countriesData = responseData?.data;

        if (countriesData?.countries) {
          const newCountries = changePropertyName(countriesData.countries, dataTypes.countries);

          return newCountries;
        } else {
          return [];
        }
      },
    }),
  }),
});

/* export const getFormatedCountries = createSelector(
  api.endpoints.getCountries.select(),
  ({ data }) => {
    if (data && data.length > 0) {
      return data;
    } else {
      return [];
    }
  }
); */

export const { useGetCountriesQuery } = countriesApi;
