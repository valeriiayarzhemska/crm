import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/services/user/userApi';
import {
  countriesData,
  countriesDataError,
  countriesDataLoading,
} from '../redux/features/dashboard/dashboardSelectors';
import {
  useGetCitiesForCountryQuery,
  useGetCitiesQuery,
} from '../redux/services/data/citiesApi';

import { FormTemplate } from '../components/form/forms/FormTemplate';
import { ErrorMsg } from '../components/ui/ErrorMsg';
import { InputsTemplate } from '../components/form/inputs/InputsTemplate';
import { Loader } from '../components/ui/Loader';
import { Dialog } from '../components/ui/Dialog';

import {
  initialValues,
  mock,
  validationSchemaRegistration,
} from '../lib/mocks/registration-mock';
import { addDataForDepedentSelects } from '../utils/data';
import { countryFranceDefault, errorMessages, selectsLocationNames } from '../data/constants';
import { handleResetSelectsRefs } from '../utils/ui';
import { selectsDependentNames } from '../lib/mocks/add-realty-mock';

export const Registration = () => {
  const [inputs, setInputs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegisterPopup, setIsRegisterPopup] = useState(false);

  const [selectedCountryId, setSelectedCountryId] = useState();
  const [selectedAgentCountryId, setSelectedAgentCountryId] = useState();
  const [activeSelect, setActiveSelect] = useState('');
  const [multiSelectRefs, setMultiSelectRefs] = useState({});

  const countries = useSelector(countriesData);
  const isCountriesLoading = useSelector(countriesDataLoading);
  const countriesError = useSelector(countriesDataError);

  const [register, { isLoading: isRegistrationLoading, error: registerError }] =
    useRegisterMutation();

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
  const {
    data: agentCities,
    isLoading: isAgentCitiesLoading,
    error: agentCitiesError,
  } = useGetCitiesQuery(
    {
      country_id: selectedAgentCountryId,
      isSettingRedux: true,
    },
    {
      skip: !selectedAgentCountryId,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleResetLocationSelects = name => {
    setActiveSelect(name);
  };

  const handleCountrySelect = async (selectedItem, name) => {
    const isAgentCountry = name === selectsLocationNames.agentCountryId;
    const depedentSelects = isAgentCountry
      ? selectsDependentNames.agentCountryId
      : selectsDependentNames.countryId;

    if (isAgentCountry) {
      await setSelectedAgentCountryId(selectedItem?.value);
    } else {
      await setSelectedCountryId(selectedItem?.value);
    }

    handleResetLocationSelects(depedentSelects);
  };

  const addDataForSelects = async props => {
    const updatedmock = await addDataForDepedentSelects({
      ...props,
      handleCountrySelect,
      mock,
    });

    setInputs(updatedmock);

    return;
  };

  const handleSubmit = async values => {
    setIsLoading(true);
    setError(null);

    const response = await register(values);

    if (registerError || response?.error) {
      setError(
        registerError
          ? `${registerError.originalStatus} ${registerError.status}`
          : errorMessages.wentWrong
      );
    } else {
      setIsRegisterPopup(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (activeSelect) {
      handleResetSelectsRefs(activeSelect, {
        ...multiSelectRefs,
      });
    }
  }, [activeSelect, selectedCountryId, selectedAgentCountryId]);

  useEffect(() => {
    if (!isCountriesLoading) {
      if (countries && countries.length > 0) {
        addDataForSelects({ countries });
      }

      if (countriesError) {
        setError(errorMessages.wentWrong);
      }

      setIsLoading(false);
    }
  }, [countries, isCountriesLoading]);

  return (
    <div className="flex flex-col items-center gap-5 pt-20 pb-12 pl-2 pr-2 w-full h-full bg-white md:pt-12 md:pr-5 md:pl-[11.5rem] lg:pl-[12.25rem]">
      <div>
        <h2 className="text-lg font-bold text-blackColor">Registration</h2>
      </div>

      {countries.length > 0 && inputs.length > 0 && !isLoading && (
        <FormTemplate
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchemaRegistration)}
          handleSubmitForm={handleSubmit}
          buttonText={'Register'}
          bgColor={'bg-purpleColor border-purpleColor'}
          classes={'items-center'}
        >
          {formProps => (
            <InputsTemplate
              formProps={formProps}
              inputsList={inputs}
              setMultiSelectRefs={setMultiSelectRefs}
            />
          )}
        </FormTemplate>
      )}

      {isLoading && !error && (
        <div className="pt-6">
          <Loader
            height={40}
            width={40}
          />
        </div>
      )}

      {isRegisterPopup && (
        <Dialog
          content={
            <span className="text-blackColor text-sm font-medium">
              Registration is successful
            </span>
          }
          classes={'flex justify-center items-center w-80 h-24'}
          isOpen={isRegisterPopup}
          onClose={() => setIsRegisterPopup(false)}
        />
      )}

      {error !== null && <ErrorMsg message={error} />}
    </div>
  );
};
