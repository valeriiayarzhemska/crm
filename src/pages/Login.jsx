import { useState } from 'react';
import { useNavigate } from 'react-router';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/services/user/userApi';

import { FormTemplate } from '../components/form/forms/FormTemplate';
import { ErrorMsg } from '../components/ui/ErrorMsg';
import { InputsTemplate } from '../components/form/inputs/InputsTemplate';
import { LoaderProgress } from '../components/ui/LoaderProgress';

import {
  initialValues,
  mock,
  validationSchemaLogin,
} from '../lib/mocks/login-mock';
import { setCookie } from '../utils/utils';
import { errorMessages } from '../data/constants';

export const Login = () => {
  const [login, { isLoading, error: loginError }] = useLoginMutation();
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    setError(null);

    const response = await login(values);

    if ((loginError || response?.error) && !response?.data?.access_token) {
      setError(
        loginError
          ? `${loginError.originalStatus} ${loginError.status}`
          : errorMessages.wentWrong
      );
    } else {
      setCookie('token', response.data.access_token, response.data.expires_in);
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 pt-32 pb-6 pl-2 pr-2 w-full h-full bg-white md:pt-60 md:pr-5 md:pl-[11.5rem] lg:pl-[12.25rem]">
      <div>
        <h2 className="text-lg font-bold text-blackColor">Login</h2>
      </div>

      <FormTemplate
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchemaLogin)}
        handleSubmitForm={handleSubmit}
        buttonText={'Login'}
        bgColor={'bg-purpleColor border-purpleColor'}
        classes={'items-center'}
      >
        {formProps => (
          <InputsTemplate
            formProps={formProps}
            inputsList={mock}
          />
        )}
      </FormTemplate>

      {isLoading && <LoaderProgress />}

      {error !== null && <ErrorMsg message={error} />}
    </div>
  );
};
