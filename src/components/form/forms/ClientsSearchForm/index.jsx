import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectClientsToggleList } from '../../../../redux/features/dashboard/dashboardSelectors';

import { InputsTemplate } from '../../inputs/InputsTemplate';
import { ToggleGroupTemplate } from '../../inputs/ToggleGroupTemplate';

import { filtersNames } from '../../../../lib/mocks/clients-mock';

export const ClientsSearchForm = ({
  formProps = {},
  inputs = [],
  setSearchValues = () => {},
  setStatus = () => {},
  setBudgetTo = () => {},
  setUrgencyType = () => {},
}) => {
  const toggleList = useSelector(selectClientsToggleList);

  useEffect(() => {
    const { values = {} } = formProps;

    setUrgencyType(values[filtersNames.urgency_type] || '');
    setStatus(values[filtersNames.status] || '');
    setBudgetTo(values[filtersNames.budget_to] || '');
  }, [
    formProps?.values?.[filtersNames.urgency_type],
    formProps?.values?.[filtersNames.status],
    formProps?.values?.[filtersNames.budget_to],
  ]);

  return (
    <div className="flex items-center flex-row flex-wrap w-full">
      <div className="flex items-center gap-3 flex-row flex-wrap mb-6 w-full">
        <ToggleGroupTemplate
          toggleType={'single'}
          defaultValue={'all'}
          toggleList={toggleList}
          className={'justify-start gap-0'}
        />

        <InputsTemplate
          formProps={formProps}
          inputsList={inputs}
          isWithoutButton={true}
          setSearchValues={setSearchValues}
        />
      </div>
    </div>
  );
};
