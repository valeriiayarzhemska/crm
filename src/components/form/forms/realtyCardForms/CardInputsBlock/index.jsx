import { useEffect, useState } from 'react';

import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { FormTemplate } from '../../FormTemplate';

import {
  cardRealtyInputs,
  initialValuesCardInputs,
} from '../../../../../data/cardRealty';
import { getDefaultValues, getInitialValues } from '../../../../../utils/data';

export const CardInputsBlock = ({
  updateRealtyData = () => {},
  urgencyType = {},
  realtyStages = [],
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValuesCardInputs,
  });
  const [inputs, setInputs] = useState([]);

  const handleSelection = (values, inputName) => {
    if (
      typeof values === 'object' &&
      values !== null &&
      !Array.isArray(values)
    ) {
      updateRealtyData({ [inputName]: values?.value });
    } else if (values !== null && Array.isArray(values)) {
      updateRealtyData({ [inputName]: values });
    }
  };

  const updateMock = () => {
    const data = { realty_stages: realtyStages, urgency_type: urgencyType };
    const newMock = getDefaultValues(data, cardRealtyInputs);
    const updatedMock = newMock.map(input => ({ ...input, handleSelection }));
   
    setNewInitialValues(prevValues => getInitialValues(data, prevValues));
    setInputs(updatedMock);
  };

  useEffect(() => {
    updateMock();
  }, []);

  return (
    <FormTemplate
      initialValues={newInitialValues}
      isWithoutButton={true}
    >
      {formProps => (
        <div className="flex justify-between gap-2 w-full">
          <InputsTemplate
            formProps={formProps}
            inputsList={inputs}
            isWithoutButton={true}
          />
        </div>
      )}
    </FormTemplate>
  );
};
