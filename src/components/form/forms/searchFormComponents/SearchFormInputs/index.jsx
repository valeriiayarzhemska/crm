import { useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';

import { useSelector } from 'react-redux';
import { selectSearchQuery } from '../../../../../redux/features/dashboard/dashboardSelectors';

import { IconButtonTemplate } from '../../../../ui/buttons/IconButtonTemplate';
import { InputsTemplate } from '../../../inputs/InputsTemplate';

import {
  initialSearchValuesNames,
  mock,
} from '../../../../../lib/mocks/search-mock';

export const SearchFormInputs = ({
  formProps = {},
  handleSettingsClick = () => {},
  setMultiSelectRefs = () => {},
  isResetClicked = false,
  setIsResetClicked = () => {},
  setInputsRefs = () => {},
}) => {
  const searchQueryData = useSelector(selectSearchQuery);

  useEffect(() => {
    if (
      searchQueryData?.toString() &&
      searchQueryData?.toString()?.length > 0 &&
      formProps?.values?.[initialSearchValuesNames.search]?.toString()?.length <
        1
    ) {
      formProps?.setFieldValue(
        initialSearchValuesNames.search,
        searchQueryData.toString()
      );
    }
  }, [searchQueryData]);

  return (
    <div className="flex gap-2 flex-wrap pl-8 w-full md:pl-11 md:gap-3.5">
      <div className="absolute top-[0.5rem] right-0 md:top-[0.3rem]">
        <IconButtonTemplate
          bgColor={'border-[1px] border-gray-400'}
          isTextHiddenMobile={true}
          handleClick={handleSettingsClick}
          isLoadingData={formProps.isSubmiting}
          icon={SlidersHorizontal}
          isIconText={true}
        />
      </div>

      <InputsTemplate
        formProps={formProps}
        inputsList={mock}
        setMultiSelectRefs={setMultiSelectRefs}
        isResetClicked={isResetClicked}
        setIsResetClicked={setIsResetClicked}
        setInputsRefs={setInputsRefs}
      />
    </div>
  );
};
