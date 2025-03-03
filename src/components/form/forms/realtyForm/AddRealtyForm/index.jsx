import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import {
  countriesData,
  countriesDataError,
} from '../../../../../redux/features/dashboard/dashboardSelectors';
import {
  useGetResidencesForCityQuery,
} from '../../../../../redux/services/data/residencesApi';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import { useGetCitiesForCountryQuery } from '../../../../../redux/services/data/citiesApi';
import { useGetDistrictsForCityQuery } from '../../../../../redux/services/data/districtsApi';
import { useGetStreetsForCityQuery } from '../../../../../redux/services/data/streetsApi';
import { useGetStreetsNumberForStreetQuery } from '../../../../../redux/services/data/streetsNumberApi';

import { AccordionInputs } from '../../../AccordionInputs';
import { Loader } from '../../../../ui/Loader';
import { FormTemplate } from '../../FormTemplate';

import {
  initialValues,
  mock,
  selectsDependentNames,
  validationSchemaRealty,
} from '../../../../../lib/mocks/add-realty-mock';
import {
  addDataForDepedentSelects,
  extractInputsFromRealty,
  getDefaultValues,
  getInitialValues,
  handleResponseError,
  transformRealtyValues,
} from '../../../../../utils/data';
import {
  countryFranceDefault,
  errorMessages,
  mockAccordionTitles,
  selectsLocationNames,
} from '../../../../../data/constants';
import { closeDialog, handleResetSelectsRefs, showError } from '../../../../../utils/ui';
import {
  useAddRealtyMutation,
  useDeleteRealtyMutation,
  useUpdateRealtyMutation,
} from '../../../../../redux/services/realties/realtiesApi';

export const AddRealtyForm = ({
  realty = {},
  classes = false,
  accordionToOpen = '',
  isEdit = false,
  handleClose = () => {},
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [inputs, setInputs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeSelect, setActiveSelect] = useState('');
  const [multiSelectRefs, setMultiSelectRefs] = useState({});
  const [inputsRefs, setInputsRefs] = useState({});

  const [selectedCountryId, setSelectedCountryId] = useState(
    countryFranceDefault[0]?.id
  );
  const [selectedCityId, setSelectedCityId] = useState();
  const [selectedStreetId, setSelectedStreetId] = useState();

  const userToken = useSelector(selectUserToken);
  const countries = useSelector(countriesData);
  const countriesError = useSelector(countriesDataError);

  const {
    data: cities,
    isLoading: isCitiesLoading,
    error: citiesError,
  } = useGetCitiesForCountryQuery(
    {
      country_id: selectedCountryId,
      isSettingRedux: true,
    },
    {
      skip: !selectedCountryId,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: districts, error: districtsError } =
    useGetDistrictsForCityQuery(
      { token: userToken, city_id: selectedCityId, isSettingRedux: true },
      {
        skip: !selectedCityId || !userToken,
        refetchOnMountOrArgChange: true,
      }
    );
  const { data: streets, error: streetsError } = useGetStreetsForCityQuery(
    { token: userToken, city_id: selectedCityId, isSettingRedux: true },
    {
      skip: !selectedCityId || !userToken,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: streetsNumbers, error: streetsNumbersError } =
    useGetStreetsNumberForStreetQuery(
      { token: userToken, street_id: selectedStreetId, isSettingRedux: true },
      {
        skip: !selectedStreetId || !userToken,
        refetchOnMountOrArgChange: true,
      }
    );
  const {
    data: residences,
    isLoading: isResidencesLoading,
    error: residencesError,
  } = useGetResidencesForCityQuery(
    {
      token: userToken,
      city_id: selectedCityId,
      isSettingRedux: true,
    },
    {
      skip: !selectedCityId || !userToken,
      refetchOnMountOrArgChange: true,
    }
  );

  const [addNewRealty, { isLoading: isAddingLoading, error: addingError }] =
    useAddRealtyMutation();
  const [editRealty, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateRealtyMutation();
  const [deleteRealty, { isLoading: isDeletingLoading, error: deletingError }] =
    useDeleteRealtyMutation();

  const hasClasses = classes && classes.length > 0;

  const handleSubmit = async values => {
    setError(null);

    let response;
    let errorStatus;

    if (isEdit) {
      response = await editRealty({
        token: userToken,
        id: realty?.id,
        data: values,
      });

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ handleClose })
      );
    } else {
      response = await addNewRealty({ token: userToken, data: values });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose })
      );
    }

    setError(errorStatus);
  };

  const handleResetLocationSelects = name => {
    setActiveSelect(name);
  };

  const handleCountrySelect = async selectedItem => {
    await setSelectedCountryId(selectedItem?.value);
    handleResetLocationSelects(selectsDependentNames.country);
    //await dispatch(addData(cities, setCities));
  };

  const handleCitySelect = async selectedItem => {
    await setSelectedCityId(selectedItem?.value);
    handleResetLocationSelects(selectsDependentNames.city);
    //await dispatch(addData(districts, setDistricts));
    //await dispatch(addData(streets, setStreets));
  };

  const handleStreetSelect = async selectedItem => {
    await setSelectedStreetId(selectedItem?.value);
    handleResetLocationSelects(selectsDependentNames.street);

    //await dispatch(addData(streetsNumbers, setStreetsNumbers));
  };

  const addDataForSelects = async props => {
    const updatedmock = await addDataForDepedentSelects({
      ...props,
      handleCountrySelect,
      handleCitySelect,
      handleStreetSelect,
      mock,
    });

    return updatedmock;
  };

  const updateDepedentSelects = async newRealty => {
    let selectsData = {};
    const countryRealty = newRealty?.[selectsLocationNames.country];
    const cityRealty = newRealty?.[selectsLocationNames.city]?.id;
    const streetRealty = newRealty?.[selectsLocationNames.street]?.id;

    if (countryRealty || countryRealty === 0) {
      await setSelectedCountryId(countryRealty);
      selectsData = { countries, cities };
    }

    if (cityRealty || cityRealty === 0) {
      await setSelectedCityId(cityRealty);
      selectsData = { ...selectsData, districts, streets };
    }

    if (streetRealty || streetRealty === 0) {
      await setSelectedStreetId(streetRealty);
      selectsData = { ...selectsData, streetsNumbers };
    }

    return selectsData;
  };

  const updateMock = async props => {
    const valuesRealty = await extractInputsFromRealty(realty);
    const newRealty = await transformRealtyValues(valuesRealty);

    let selectsData = { ...props };
    let mockWithSelectData = [];

    mockWithSelectData = await addDataForSelects(selectsData);

    if (isEdit) {
      setNewInitialValues(prevValues =>
        getInitialValues(newRealty, prevValues)
      );

      selectsData = await updateDepedentSelects(newRealty);

      const updatedMock = await getDefaultValues(
        newRealty,
        mockWithSelectData,
        selectsData
      );

      setInputs(updatedMock);
    } else {
      setNewInitialValues({ ...initialValues });
      setInputs(mockWithSelectData);
    }
  };

  useEffect(() => {
    if (activeSelect) {
      handleResetSelectsRefs(activeSelect, {
        ...multiSelectRefs,
        ...inputsRefs,
      });
    }
  }, [activeSelect]);

  useEffect(() => {
    if (isFirstLoading) {
      const errors = countriesError || citiesError;

      if (countries && cities) {
        updateMock({ countries, cities });
        setIsFirstLoading(false);
      }

      if (errors) {
        setError(errorMessages.data);
        setInputs(mock);
      }

      setIsLoading(false);
    }

  }, [countries, cities]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <>
      <div
        className={cn(
          'flex flex-col gap-3 flex-row flex-wrap w-full min-h-[556px] dialog-with-click',
          {
            [classes]: hasClasses,
          }
        )}
      >
        <div className="flex items-center gap-5">
          <span className="text-sm text-blackColor">New property</span>
        </div>

        {!isLoading && inputs && inputs.length > 0 && (
          <FormTemplate
            initialValues={newInitialValues}
            validationSchema={Yup.object(validationSchemaRealty)}
            handleSubmitForm={handleSubmit}
            buttonText={'Save'}
            bgColor={'bg-purpleColor border-purpleColor'}
            classes={'items-start w-full'}
            formClasses={'gap-3 w-full'}
          >
            {formProps => (
              <div>
                {Object.entries(mockAccordionTitles).map(([key, title]) => {
                  return (
                    <AccordionInputs
                      realtyId={realty.id}
                      contactsList={realty?.contacts}
                      isEdit={isEdit}
                      title={title}
                      mock={inputs}
                      formProps={formProps}
                      key={key}
                      setMultiSelectRefs={setMultiSelectRefs}
                      setInputsRefs={setInputsRefs}
                      accordionToOpen={accordionToOpen}
                    />
                  );
                })}
              </div>
            )}
          </FormTemplate>
        )}

        {!error && (!inputs || inputs.length < 1) && (
          <div className="flex items-center justify-center pt-6 h-[526px]">
            <Loader
              height={40}
              width={40}
            />
          </div>
        )}
      </div>
    </>
  );
};
