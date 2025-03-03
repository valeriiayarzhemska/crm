import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import { FormTemplate } from '../FormTemplate';
import { ButtonTemplate } from '../../../ui/buttons/ButtonTemplate';
import { IconButtonTemplate } from '../../../ui/buttons/IconButtonTemplate';
import { InputsTemplate } from '../../inputs/InputsTemplate';

import { initialValues, mock } from '../../../../lib/mocks/filters-search-mock';
import { generateSearchQueriesRealty } from '../../../../utils/utils';
import { showError } from '../../../../utils/ui';

export const FiltersMapForm = ({
  setSearchQueryFilters = () => {},
  handleCancel = () => {},
  setIsResetFilters = () => {},
  isResetClicked = false,
  setIsResetClicked = () => {},
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [multiSelectRefs, setMultiSelectRefs] = useState({});
  const [inputs, setInputs] = useState(mock);
  const [error, setError] = useState('');

  const handleSubmit = async values => {
    const query = await generateSearchQueriesRealty(
      newInitialValues,
      [],
      {},
      values
    );

    setSearchQueryFilters(query);
    setIsResetFilters(true);
    handleCancel();
  };

  const handleResetClick = () => {
    Object.entries(multiSelectRefs).forEach(([refName, ref]) => {
      if (ref && ref.current && ref.current.resetSelectedValues) {
        ref.current.resetSelectedValues();
        ref.current.state.searchValue = '';
        ref.setFieldValue(refName, '');
      }
    });

    setIsResetFilters(false);
  };

  useEffect(() => {
    if (isResetClicked) {
      handleResetClick();
    }
  }, [isResetClicked]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <div className="relative flex flex-wrap gap-4 pt-2 pb-4 px-4 w-full exclude-click dialog-with-click bg-whiteColor rounded">
      <div className="flex justify-end w-full">
        <IconButtonTemplate
          bgColor="border-whiteColor bg-whiteColor"
          handleClick={handleCancel}
          icon={X}
          size={20}
        />
      </div>

      <FormTemplate
        initialValues={newInitialValues}
        handleSubmitForm={handleSubmit}
        buttonText={'Search'}
        bgColor={'bg-purpleColor border-purpleColor'}
      >
        {formProps => (
          <>
            <InputsTemplate
              formProps={formProps}
              inputsList={inputs}
              setMultiSelectRefs={setMultiSelectRefs}
              isResetClicked={isResetClicked}
              setIsResetClicked={setIsResetClicked}
            />
          </>
        )}
      </FormTemplate>

      <div className="absolute left-24 bottom-4">
        <ButtonTemplate
          handleClick={handleResetClick}
          text={'Reset filters'}
          size={20}
        />
      </div>
    </div>
  );
};
