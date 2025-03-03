import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useGetContactsQuery } from '../../../../../redux/services/contacts/contactsApi';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';

import { ContactsList } from '../ContactsList';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { ErrorMsg } from '../../../../ui/ErrorMsg';

import {
  addDataForDepedentSelects,
  transformContactsData,
} from '../../../../../utils/data';
import { errorMessages } from '../../../../../data/constants';

export const ContactsBlockForm = ({
  contactsList = [],
  formProps = {},
  inputsList = [],
}) => {
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = useSelector(selectUserToken);

  const {
    data: contacts,
    isFetching: isContactsLoading,
    error: contactsError,
  } = useGetContactsQuery(userToken, {
    skip: !userToken,
    refetchOnMountOrArgChange: true,
  });

  const updateMock = async () => {
    const newContacts = await transformContactsData(contacts);
    const newMock = await addDataForDepedentSelects({
      contacts: newContacts,
      mock: inputsList,
    });

    setInputs(newMock);
  };

  useEffect(() => {
    if (!isContactsLoading && inputsList && inputsList.length > 0) {
      if (contacts && contacts.length > 0) {
        updateMock();
      }

      setIsLoading(false);
    }

    if (contactsError) {
      setError(errorMessages.contacts);

      setIsLoading(false);
    }
  }, [contacts, contactsError, isContactsLoading, inputsList?.length]);

  return (
    <>
      {!isLoading ? (
        <InputsTemplate
          formProps={formProps}
          inputsList={inputs}
        />
      ) : (
        <div className="pt-1.5 pl-[5px] h-[42px] border-b border-gray-200 w-full sm:w-6/12">
          <span className="text-sm leading-6 text-gray-400">
            {inputsList[0]?.placeholder}
          </span>
        </div>
      )}

      <ContactsList
        contactsList={contactsList}
        formProps={formProps}
        contacts={contacts}
      />

      {error && error.length > 0 && <ErrorMsg message={error} />}
    </>
  );
};
