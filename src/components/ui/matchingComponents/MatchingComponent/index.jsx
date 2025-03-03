import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { MatchingList } from '../MatchingList';
import { FormTemplate } from '../../../form/forms/FormTemplate';
import { InputsTemplate } from '../../../form/inputs/InputsTemplate';

import { initialValues, mock } from '../../../../lib/mocks/matching-mock';
import { addHandlerForSearch } from '../../../../utils/utils';

export const MatchingComponent = ({ realtyId, handleCancel = () => {} }) => {
  const [inputs, setInputs] = useState([]);
  const [page, setPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDebounceSearch = useCallback(
    debounce(value => {
      setSearchQuery(value);
    }, 1000),
    []
  );

  const handleSearch = value => {
    handleDebounceSearch(value);
  };

  const addHandlers = async () => {
    const newMock = await addHandlerForSearch(mock, handleSearch);

    setInputs(newMock);
  };

  useEffect(() => {
    addHandlers();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <FormTemplate
        initialValues={initialValues}
        buttonText={'Save'}
        isWithoutButton={true}
        bgColor={'bg-purpleColor border-purpleColor'}
      >
        {formProps => (
          <InputsTemplate
            formProps={formProps}
            inputsList={inputs}
            isWithoutButton={true}
          />
        )}
      </FormTemplate>

      <MatchingList
        realtyId={realtyId}
        page={page}
        setPage={setPage}
        searchQuery={searchQuery}
      />
    </div>
  );
};
