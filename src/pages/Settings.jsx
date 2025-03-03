import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux/services/user/userApi';
import {
  selectUserInfo,
  selectUserInfoError,
  selectUserToken,
} from '../redux/features/user/userSelectors';

import { FormTemplate } from '../components/form/forms/FormTemplate';
import { ButtonTemplate } from '../components/ui/buttons/ButtonTemplate';
import { Sonner } from '../components/ui/Sonner';
import { InputsTemplate } from '../components/form/inputs/InputsTemplate';
import { ErrorMsg } from '../components/ui/ErrorMsg';
import { Toaster } from 'sonner';
import { LoaderProgress } from '../components/ui/LoaderProgress';

import { copyImage, deleteCookie } from '../utils/utils';
import { initialValues, mock } from '../lib/mocks/settings-mock';
import { Container } from '../layouts/Container';
import { errorMessages } from '../data/constants';
import { Loader } from '../components/ui/Loader';

export const Settings = () => {
  const [isUserLoading, setIsUserLoading] = useState(true);

  const [logout, { isLoading, error: logoutError }] = useLogoutMutation();
  const userToken = useSelector(selectUserToken);
  const userInfo = useSelector(selectUserInfo);
  const userInfoError = useSelector(selectUserInfoError);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout(userToken);

    if (logoutError || response?.error) {
      setError(
        logoutError
          ? `${logoutError.originalStatus} ${logoutError.status}`
          : errorMessages.wentWrong
      );
    } else {
      deleteCookie('token');
      navigate('/login');
    }
  };

  const handleLangChange = selectedItem => {
    console.log(selectedItem);
  };

  useEffect(() => {
    if (userInfo) {
      setIsUserLoading(false);
    }
  }, [userInfo]);

  return (
    <Container>
      <div className="flex flex-col items-start gap-5 w-full h-full bg-white">
        {!userInfoError && (
          <div className="flex items-center gap-1">
            <span className="text-sm color-blackColor">Authenticated as</span>
            <span className="text-sm font-bold color-blackColor">
              {isUserLoading ? <Loader /> : userInfo?.email}
            </span>
          </div>
        )}

        <ButtonTemplate
          text={'Log out'}
          handleClick={handleLogout}
        />

        {/* <div className="flex flex-col gap-4 w-full">
          <span className="text-lg font-bold color-blackColor">Language</span>

          <FormTemplate
            initialValues={initialValues}
            isWithoutButton={true}
            handleSubmitForm={handleLangChange}
          >
            {formProps => (
              <InputsTemplate
                formProps={formProps}
                inputsList={mock}
                isWithoutButton={true}
              />
            )}
          </FormTemplate>

          {isLoading && <LoaderProgress />}

          {error && error.length > 0 && <ErrorMsg message={error} />}
        </div> */}

        {/* <div className="flex flex-col gap-1">
        <span className="text-sm font-bold color-blackColor">vCard QR</span>

        <span className="text-sm color-blackColor">
          contains your contact details
        </span>
      </div>

      <div>
        <img
          src={qrCode}
          alt="qr"
        />
      </div>

      <Sonner
        title="Image was copied"
        buttonText="Copy"
        handleClick={() => copyImage(qrCode)}
      />
      <Toaster /> */}
      </div>
    </Container>
  );
};
